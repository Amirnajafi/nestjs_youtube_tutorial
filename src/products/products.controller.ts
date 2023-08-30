import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import userGuard from 'src/users/dto/userGuards';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductForBiddenRespnonse } from './dto/forbidden.dto';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
    type: ProductForBiddenRespnonse,
  })
  @ApiResponse({ status: 201, description: 'Created', type: CreateProductDto })
  @ApiHeader({
    name: 'Lang',
    description: 'send preferred language',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the product',
  })
  create(@Body() createProductDto: CreateProductDto, @Request() request) {
    const user: userGuard = request.user;
    createProductDto.user = user;
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Request() request,
  ) {
    updateProductDto.user = request.user;
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number, @Request() req) {
    return this.productsService.remove(+id, req.user);
  }
}
