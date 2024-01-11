import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({ data: createProductDto });
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({ where: { id }, data: updateProductDto });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async remove(id: number) {
    const product = await this.prisma.product.delete({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return;
  }
}
