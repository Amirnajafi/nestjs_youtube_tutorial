import { UsersService } from './../users/users.service';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Products from 'src/entities/products.entity';
import { FindOperator, Repository } from 'typeorm';
import userGuard from 'src/users/dto/userGuards';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private products_repository: Repository<Products>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const new_product = await this.products_repository.save(createProductDto);
    return new_product;
  }

  async findAll() {
    return await this.products_repository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.products_repository.findOne({
      relations: {
        user: true,
      },
      where: {
        id,
      },
    });
    if (!product) {
      throw new HttpException('product not found', 404);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const check = await this.products_repository.update(
      { id, user: updateProductDto.user },
      { ...updateProductDto },
    );
    if (check.affected === 0) {
      throw new HttpException('products not found', 404);
    }
    console.log(check);
    return {};
  }

  async remove(id: number, user: userGuard) {
    // find product by id and check if it belongs to the user
    const check = await this.products_repository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.user', 'users')
      .where('products.id = :id', { id })
      .andWhere('products.user = :user', { user: user.id })
      .getOne();

    console.log(check);
    if (!check) {
      throw new HttpException('products not found ', 404);
    }
    await this.products_repository.remove(check);
    //return this.products_repository.delete(id);
    return {};
  }
}
