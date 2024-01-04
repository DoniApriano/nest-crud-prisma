import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return {
      status: HttpStatus.CREATED,
      message: "Create Product successfully",
      data: await this.productsService.create(createProductDto)
    };
  }

  @Get()
  async findAll() {
    return {
      status: HttpStatus.OK,
      message: "Show all products successfully",
      data: await this.productsService.findAll()
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      status: HttpStatus.OK,
      message: `Show product by ID ${id} successfully`,
      data: await this.productsService.findOne(+id),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return {
      status: HttpStatus.OK,
      message: `Update product by ID ${id} successfully`,
      data: await this.productsService.update(Number(id), updateProductDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      status: HttpStatus.OK,
      message: `Delete product by ID ${id} successfully`,
      data: await this.productsService.remove(+id),
    };;
  }
}
