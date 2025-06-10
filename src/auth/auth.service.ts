/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/users/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async getTokens(user_id: number, email: string, role: Role) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user_id, email: email, role: role },
        {
          secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRES_IN',
          ),
        },
      ),
      this.jwtService.signAsync(
        { sub: user_id, email: email, role: role },
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRES_IN',
          ),
        },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  //helper method
  private async hashData(data: string): Promise<string> {
    const salts = await Bcrypt.genSalt(10);
    return Bcrypt.hash(data, salts);
  }

  //helper method to update refresh token in the database
  private async saveRefreshToken(user_id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(user_id, {
      hashedRefreshToken: hashedRefreshToken,
    });
  }

  async signIn(createAuthDto: CreateAuthDto) {
    //check if the user exist
    const foundUser = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['user_id', 'email', 'password', 'role'],
    });
    if (!foundUser) {
      throw new NotFoundException(
        `User with email ${createAuthDto.email} not found`,
      );
    }
    //compare password
    const foundPassword = await Bcrypt.compare(
      createAuthDto.password,
      foundUser.password,
    );

    if (!foundPassword) {
      throw new NotFoundException(
        `Invalid credentials for user with email ${createAuthDto.email}`,
      );
    }
    //if password is correct, get tokens
    const { accessToken, refreshToken } = await this.getTokens(
      foundUser.user_id,
      foundUser.email,
      foundUser.role,
    );

    await this.saveRefreshToken(foundUser.user_id, refreshToken);

    //return tokens
    return {
      accessToken,
      refreshToken,
      user: {
        username: foundUser?.username,
        email: foundUser?.email,
        password: foundUser?.password,
        role: foundUser.role,
      },
    };
  }

  async signOut(user_id: number) {
    //find user
    const foundUser = this.userRepository.findOne({
      where: { user_id: user_id },
      select: ['user_id', 'email', 'role', 'hashedRefreshToken'],
    });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }
    await this.userRepository.update(user_id, { hashedRefreshToken: null });

    return { message: `User with id:${user_id} signed out successfully` };
  }

  //refresh tokens
  async refreshTokens(user_id: number, refreshToken: string) {
    const foundUser = await this.userRepository.findOne({
      where: { user_id },
      select: ['user_id', 'email', 'role', 'hashedRefreshToken'],
    });

    if (!foundUser) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }
    //check if the user has a refresh token
    if (!foundUser.hashedRefreshToken) {
      throw new NotFoundException(
        `User with id ${user_id} does not have a refresh token`,
      );
    }

    //check if the refresh token is valid
    const isRefreshTokenValid = await Bcrypt.compare(
      refreshToken,
      foundUser.hashedRefreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new NotFoundException(
        `Invalid refresh token for user with id ${user_id}`,
      );
    }
    //generate new token
    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      foundUser.user_id,
      foundUser.email,
      foundUser.role,
    );

    //update the refresh token in the database
    await this.saveRefreshToken(foundUser.user_id, newRefreshToken);

    //return the new tokens
    return { accessToken, refreshToken: newRefreshToken };
  }
}
