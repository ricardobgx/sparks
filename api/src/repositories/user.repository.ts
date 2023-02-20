import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

import {
  UserFindParams,
  UserInsertParams,
  UserUpdateParams,
} from 'src/types/User';

import AppError from '../errors/app.error';

const prisma = new PrismaClient();

@Injectable()
export default class UserRepository {
  constructor() {}

  public async create(insertParams: UserInsertParams): Promise<User> {
    return await prisma.user.create({
      data: insertParams,
    });
  }

  async find(findParams?: UserFindParams): Promise<User[]> {
    return await prisma.user.findMany({
      where: findParams,
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateById(id: string, updateParams: UserUpdateParams): Promise<User> {
    await this.checkIfExistsById(id);

    return await prisma.user.update({
      where: {
        id,
      },
      data: updateParams,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.checkIfExistsById(id);

    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async checkIfExistsById(id: string): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }
  }
}
