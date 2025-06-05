import { Injectable } from '@nestjs/common';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';


@Injectable()
export class AuthorizationService {
  refreshTokens() {}

  signIn(createAuthorizationDto: CreateAuthorizationDto) {}

  signOut(id: number) {}
}
