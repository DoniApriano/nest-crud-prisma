import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id: id } });
    if (!category) throw new NotFoundException(`Category ID ${id} not found`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id: id } });
    if (!category) throw new NotFoundException(`Category ID ${id} not found`);
    return await this.prisma.category.update({ where: { id }, data: updateCategoryDto });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id: id } });
    if (!category) throw new NotFoundException(`Category ID ${id} not found`);
    return await this.prisma.category.delete({ where: { id }});
  }
}
