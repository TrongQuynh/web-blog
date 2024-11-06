import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { StringIdParamDto } from 'src/common/dto/id_param.dto';
import { ListCategoryDto } from './dto/list-category.dto';
import { ChangeCategoryVisibleDto } from './dto/change-category-visible.dto';
import { ListCategoryResponseSwagger } from './responses/list-category.response';
import { DetailCategoryResponseSwagger } from './responses/detail-category.response';
import { BaseResponseDataNull } from 'src/common/responses/base.response';
import { GetUserIdFromToken } from 'src/common/decorators/auth.decorator';

@ApiTags('CATEGORIES')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'List categories' })
  @ApiOkResponse({ type: ListCategoryResponseSwagger })
  @Get()
  async listCategories(@Query() dto: ListCategoryDto) {
    return this.categoriesService.listCategories(dto);
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiOkResponse({ type: DetailCategoryResponseSwagger })
  @Post("create")
  async createCategory(@GetUserIdFromToken() id: string, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(id, dto);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiOkResponse({ type: DetailCategoryResponseSwagger })
  @Post(":id/update")
  async updateCategory(@Param("id") param: StringIdParamDto, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.updateCategory(param.id, dto);
  }

  @ApiOperation({ summary: 'Change visible category' })
  @ApiOkResponse({ type: BaseResponseDataNull })
  @Post(":id/change-visible")
  async changeVisibleCategory(@Param("id") param: StringIdParamDto, @Body() dto: ChangeCategoryVisibleDto) {
    return this.categoriesService.changeVisibleCategory(param.id, dto);
  }

  @ApiOperation({ summary: 'Get detail category' })
  @ApiOkResponse({ type: DetailCategoryResponseSwagger })
  @Get(":id/detail")
  async getDetailCategory(@Param("id") param: StringIdParamDto) {
    return this.categoriesService.getDetailCategory(param.id);
  }

}
