

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, VerifyCallback} from 'passport-google-oauth20'


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: '966973764337-v677qu1n44paq9eihja65imv334qqka2.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:5000/auth/google/callback',
            scope: ['email', 'profile'],
        })
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        done(null, profile);
    }
}