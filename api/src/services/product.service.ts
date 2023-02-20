import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import ProductRepository from 'src/repositories/product.repository';

import AppError from '../errors/app.error';

import { ProductUpdateParams } from 'src/types/Product';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async get(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getById(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);

    if (!product) throw new AppError('Product not found', 404);

    return product;
  }

  async create(insertParams): Promise<Product> {
    return await this.productRepository.create(insertParams);
  }

  async updateById(
    id: string,
    updateParams: ProductUpdateParams,
  ): Promise<Product> {
    return await this.productRepository.updateById(id, updateParams);
  }

  async deleteById(id: string): Promise<void> {
    return await this.productRepository.deleteById(id);
  }
}
