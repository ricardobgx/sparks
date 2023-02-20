import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';

import {
  ProductFindParams,
  ProductInsertParams,
  ProductUpdateParams,
} from 'src/types/Product';

import AppError from '../errors/app.error';

const prisma = new PrismaClient();

@Injectable()
export default class ProductRepository {
  constructor() {}

  public async create(insertParams: ProductInsertParams): Promise<Product> {
    return await prisma.product.create({
      data: insertParams,
    });
  }

  async find(findParams?: ProductFindParams): Promise<Product[]> {
    return await prisma.product.findMany({
      where: findParams,
    });
  }

  async findById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async updateById(
    id: string,
    updateParams: ProductUpdateParams,
  ): Promise<Product> {
    await this.checkIfExistsById(id);

    return await prisma.product.update({
      where: {
        id,
      },
      data: updateParams,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.checkIfExistsById(id);

    await prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async checkIfExistsById(id: string): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      throw new AppError('Product not found', 404);
    }
  }
}
