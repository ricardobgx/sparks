import { User } from '@prisma/client';
import { HttpStatus, Injectable } from '@nestjs/common';

import UserRepository from '../repositories/user.repository';

import JWTUtil from '../utils/jwt.util';
import EncryptorUtil from '../utils/encryptor.util';

import AppError from '../errors/app.error';

import { Credentials, UserUpdateParams } from 'src/types/User';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async get(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError('User not found', 404);

    return user;
  }

  async create(insertParams): Promise<User> {
    const password = EncryptorUtil.hashValue(insertParams.password);

    return await this.userRepository.create({ ...insertParams, password });
  }

  async updateById(id: string, updateParams: UserUpdateParams): Promise<User> {
    return await this.userRepository.updateById(id, updateParams);
  }

  async deleteById(id: string): Promise<void> {
    return await this.userRepository.deleteById(id);
  }

  async login(credentials: Credentials): Promise<string> {
    const { email, password } = credentials;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      if (EncryptorUtil.isEqualHashedValue(password, user.password)) {
        return JWTUtil.generateToken({ id: user.id });
      }
    }

    throw new AppError(
      'User not found with email/password',
      HttpStatus.NOT_FOUND,
    );
  }
}
