import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post()
  signInLocally(@Body() createAuthorizationDto: CreateAuthorizationDto) {
    return this.authorizationService.signIn(createAuthorizationDto);
  }

  @Get('signOut/:id')
  signOut(@Param('id', ParseIntPipe) id: number) {
    return this.authorizationService.signOut(id);
  }

  @Get('refresh')
  refreshTokens(@Query('id', ParseIntPipe) id: number) {
    return this.authorizationService.refreshTokens();
  }
}
