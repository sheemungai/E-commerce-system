import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({})
export class UserModule {
    controller:[UserController],
    
}
