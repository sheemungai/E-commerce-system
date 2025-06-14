import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators';
import { Role } from './enums/user-role.enum';
import { AtGuard, RolesGuard } from 'src/auth/guards';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserD } from 'src/auth/decorators/users.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
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
  @ApiQuery({
    name: 'details',
    required: false,
    type: 'boolean',
    default: false,
    description: 'Get user details with more info',
  })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @UserD('sub') token_id: number,
    @UserD('role') token_role: Role,
    @Query('details', new DefaultValuePipe(false), ParseBoolPipe)
    details?: boolean,
  ) {
    if (token_id !== id && token_role !== Role.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to access this user',
      );
    }
    try {
      return await this.usersService.findOne(id, details);
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UserD('sub') token_id: number,
    @UserD('role') token_role: Role,
  ) {
    if (token_id !== id && token_role !== Role.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to delete this user',
      );
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @UserD('sub') token_id: number,
    @UserD('role') token_role: Role,
  ) {
    if (token_id !== id && token_role !== Role.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to delete this user',
      );
    }
    return this.usersService.remove(id);
  }
}
