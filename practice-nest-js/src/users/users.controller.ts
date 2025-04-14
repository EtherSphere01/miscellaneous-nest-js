import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() body: createUserDto) {
    return this.usersService.createUser(body);
  }
  @Patch()
  patchUser(@Body() body: PatchUserDto) {
    return body;
  }

  @Get('all')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get(['', '/:id'])
  public getUsers(
    @Param('id', new ParseIntPipe({ optional: true })) id?: number,
  ) {
    return typeof id;
  }
}
// git push
