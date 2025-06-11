import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators/public.decorator';
import { AtGuard, RtGuard } from './guards';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    refreshToken: string;
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @UseGuards(AtGuard)
  @Get('signout/:id')
  signOut(@Param('id', ParseIntPipe) id: number) {
    return this.authService.signOut(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  refreshTokens(
    @Query('id', ParseIntPipe) user_id: number,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    if (user.sub !== user_id) {
      throw new UnauthorizedException('User ID mismatch');
    }
    return this.authService.refreshTokens(user_id, user.refreshToken);
  }
}
