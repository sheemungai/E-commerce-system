import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [UserModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
