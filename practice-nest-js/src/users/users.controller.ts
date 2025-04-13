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

@Controller('users')
export class UsersController {
  @Get(['', '/:id'])
  public getUsers(
    @Param('id', new ParseIntPipe({ optional: true })) id?: number,
  ) {
    return typeof id;
  }

  @Post()
  createUser(@Body() body: createUserDto) {
    return body;
  }
  @Patch()
  patchUser(@Body() body: PatchUserDto) {
    return body;
  }
}
// git push