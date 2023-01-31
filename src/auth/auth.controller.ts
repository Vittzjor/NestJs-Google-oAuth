import {Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @UseGuards(AuthGuard('google'))
    @Get('/google/callback')
    async googleCallback(@Req() req, @Res() res: Response) {
        const jwt = await this.authService.login(req.user);
        res.set('authorization', jwt.tokens.access_token);
        res.status(200);
        return res.json(jwt)
    }

    @Get('user/:id')
    async getUser(@Param('id') id: number){
        return this.authService.getUser(id)
    }



    @UseGuards(AuthGuard('google'))
    @Get('google/login')
    async getHome(@Req() req: Request, @Res() res: Response) {
        res.json({data: {}})
    }

// need more research





    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async callback(@Req() req, @Res() res) {
        console.log('done')
        res.json(req.user);
    }
}
