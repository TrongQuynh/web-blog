import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CategoriesModel } from 'src/common/schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ListCategoryDto } from './dto/list-category.dto';
import { ChangeCategoryVisibleDto } from './dto/change-category-visible.dto';
import { DetailCategoryResponse } from './responses/detail-category.response';
import { BasePaginationResponse } from 'src/common/responses/base-pagination.response';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(CategoriesModel.name) private categoriesModel: Model<CategoriesModel>) {}

    async createCategory(id: string, dto: CreateCategoryDto) {
        const { name, thumbnail, visible } = dto;
        const isExist = await this.categoriesModel.findOne({ name });
        if (isExist) throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST);
        const category = new this.categoriesModel({ name, thumbnail, visible, user_id: id });
        return await category.save();
    }

    async updateCategory(id: string, dto: CreateCategoryDto) {
        const { name, thumbnail, visible } = dto;
        const category = await this.categoriesModel.findOne({ name, _id: { $ne: id } });
        if (category) throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST);
        const categoryUpdated = await this.categoriesModel.findByIdAndUpdate(id, { name, thumbnail, visible }, { new: true });
        return new DetailCategoryResponse(categoryUpdated);
    }

    async getDetailCategory(id: string) {
        const category = await this.categoriesModel.findById(id);
        if (!category) throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
        return new DetailCategoryResponse(category);
    }

    async listCategories(dto: ListCategoryDto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;

        const filter: FilterQuery<CategoriesModel> = {};

        const [categories, totalRecords] = await Promise.all([
            this.categoriesModel.find(filter).skip(skip).limit(limit),
            this.categoriesModel.countDocuments(filter)
        ]);
        return new BasePaginationResponse({
            limit,
            total_record: totalRecords,
            list: categories.map((category) => new DetailCategoryResponse(category))
        });
    }

    async changeVisibleCategory(id: string, body: ChangeCategoryVisibleDto) {
        const { visible } = body;
        const isExist = await this.categoriesModel.findById(id);
        if (!isExist) throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
        await this.categoriesModel.findByIdAndUpdate(id, { visible });
        return null;
    }
}
