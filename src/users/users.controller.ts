import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators';
import { Role } from './enums/user-role.enum';
import { User } from './entities/user.entity';


interface RequestWithUser extends Request {
  user: User;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

 
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    const user = req.user;
    if (user.user_id === id || user.role === Role.ADMIN) {
      return this.usersService.findOne(id);
    }
    throw new ForbiddenException(
      'You do not have permission to access this resource.',
    );
  }

  @Roles(Role.USER, Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const update = await this.usersService.update(id, updateUserDto);

    return {
      success: true,
      message: `User with ID ${id} updated successfully`,
      data: update,
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Delete, 'User'))
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    const user = req.user;
    if (user.role === Role.ADMIN) {
      return this.usersService.remove(id);
    }
    throw new ForbiddenException('Unauthorized to delete users');
  }
}
