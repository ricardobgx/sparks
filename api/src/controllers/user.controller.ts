import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from '../services/user.service';

import { Credentials, UserInsertParams, UserUpdateParams } from '../types/User';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async create(@Res() res: Response, @Body() insertParams: UserInsertParams) {
    const user = await this.userService.create(insertParams);

    return res.json({ user });
  }

  @Get()
  async get(@Res() res: Response) {
    const users = await this.userService.get();

    return res.json({ users });
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param('id') id: string) {
    const user = await this.userService.getById(id);

    return res.json({ user });
  }

  @Put(':id')
  async updateById(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateParams: UserUpdateParams,
  ) {
    const user = await this.userService.updateById(id, updateParams);

    return res.json({ user });
  }

  @Delete(':id')
  async deleteById(@Res() res: Response, @Param('id') id: string) {
    await this.userService.deleteById(id);

    return res.json({ message: 'User deleted' });
  }

  @Post('login')
  async login(@Res() res: Response, @Body() credentials: Credentials) {
    const token = await this.userService.login(credentials);

    return res.json({ token });
  }
}
