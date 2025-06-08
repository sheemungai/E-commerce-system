import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt, StrategyOptionsWithRequest } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

type JWTPayload = {
  SUB: number;
  email: string;
};

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(private readonly configService: ConfigService) {
    const options: StrategyOptionsWithRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    };
    super(options);
  }
  validate(req: Request, payload: JWTPayload): unknown {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      throw new UnauthorizedException('No refresh token provider');
    }
    const refreshToken = authHeader.replace('Bearer', '').trim();

    if (!refreshToken) {
      throw new UnauthorizedException('invalid refresh token format');
    }
    return {
      ...payload,
      refreshToken,
    };
  }
}
