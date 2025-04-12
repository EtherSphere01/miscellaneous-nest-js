import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  public getUsers(@Param('id') id: string) {
    return `getUsers(${id})`;
  }

  @Post()
  createUser(@Body() query: any) {
    return query;
  }
}
