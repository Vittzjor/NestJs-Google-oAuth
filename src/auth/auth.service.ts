import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as argon2 from 'argon2';
import {PrismaService} from "./prisma.service";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private prisma: PrismaService) {

    }
    async login(user: any):Promise<any> {
        let NewUser
        const candidate = await this.prisma.user.findFirst({where:{email: user.emails[0].value}})
        if (candidate){
            NewUser = candidate
        } else {
            NewUser = await this.prisma.user.create({
                data: {email: user.emails[0].value, name: user.name.givenName, avatar: user.photos[0].value}
            })
        }
        const tokens = {access_token: '', refresh_token: ''}
        tokens.access_token = this.jwtService.sign({
            user: NewUser.id, email: NewUser.email
        })
        tokens.refresh_token = this.jwtService.sign({
            user: NewUser.id, email: NewUser.email
        }, {expiresIn: '1h'})
        const hashed = await argon2.hash(tokens.refresh_token)
        NewUser = await this.prisma.user.update({data: {rt_token: hashed}, where: {
            id: NewUser.id,
        },})
        return {tokens, NewUser}
    }

    async getUser(id: number):Promise<any>{
        return this.prisma.user.findUnique({where: {id}})
    }
}
