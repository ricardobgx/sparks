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

import { ProductService } from '../services/product.service';

import { ProductInsertParams, ProductUpdateParams } from '../types/Product';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  async create(
    @Res() res: Response,
    @Body() insertParams: ProductInsertParams,
  ) {
    const product = await this.productService.create(insertParams);

    return res.json({ product });
  }

  @Get()
  async get(@Res() res: Response) {
    const products = await this.productService.get();

    return res.json({ products });
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param('id') id: string) {
    const product = await this.productService.getById(id);

    return res.json({ product });
  }

  @Put(':id')
  async updateById(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateParams: ProductUpdateParams,
  ) {
    const product = await this.productService.updateById(id, updateParams);

    return res.json({ product });
  }

  @Delete(':id')
  async deleteById(@Res() res: Response, @Param('id') id: string) {
    await this.productService.deleteById(id);

    return res.json({ message: 'Product deleted' });
  }
}
