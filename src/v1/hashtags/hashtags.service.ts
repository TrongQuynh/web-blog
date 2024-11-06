import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { HashtagModel } from 'src/common/schema/hashtag.schema';
import { ListHashtagDto } from './dto/list-hashtag.dto';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { DetailHashtagResponse } from './responses/detail-hashtag.response';
import { StringUtil } from 'src/common/utils/string.util';
import { BasePaginationResponse } from 'src/common/responses/base-pagination.response';
import { ChangeStatusHashtagDto } from './dto/change-status-hashtag.dto';

@Injectable()
export class HashtagsService {
    constructor(
        @InjectModel(HashtagModel.name) private hashtagModel: Model<HashtagModel>
    ) {}

    async getHashtags(query: ListHashtagDto) {
        const { key_search, status, page, limit } = query;
        const skip = (page - 1) * limit;

        const filter: FilterQuery<HashtagModel> = {
            status,
        };
        if (key_search) filter.normalized_value = new RegExp(key_search, 'i');

        const [data, total] = await Promise.all([
            await this.hashtagModel.find(filter).skip(skip).limit(limit),
            await this.hashtagModel.countDocuments(filter)
        ]);

        return new BasePaginationResponse({
            limit,
            total_record: total,
            list: data.map(item => new DetailHashtagResponse(item))
        })
        
    }

    async createHashtag(body: CreateHashtagDto) {
        const { name, thumbnail } = body;

        const isNameExisted = await this.hashtagModel.findOne({ name });
        if (isNameExisted) throw new HttpException('Name is already existed', HttpStatus.BAD_REQUEST);
        
        const normalizedValue = StringUtil.normalizedString(`${name}`);

        const hashtag = await this.hashtagModel.create({
            name,
            thumbnail,
            normalized_value: normalizedValue
        });

        return new DetailHashtagResponse(hashtag);
    }

    async updateHashtag(id: string, body: CreateHashtagDto) {
        const { name, thumbnail } = body;

        const hashtagObjectId = new mongoose.Schema.ObjectId(id);
        const isNameExisted = await this.hashtagModel.findOne({ name, _id: { $ne: hashtagObjectId } });
        if (isNameExisted) throw new HttpException('Name is already existed', HttpStatus.BAD_REQUEST);

        const normalizedValue = StringUtil.normalizedString(`${name}`);

        const hashtag = await this.hashtagModel.findByIdAndUpdate(hashtagObjectId, {
            name,
            thumbnail,
            normalized_value: normalizedValue
        }, { new: true });

        return new DetailHashtagResponse(hashtag);
    }

    async changeStatusHashtag(id: string, body: ChangeStatusHashtagDto) {
        const { status } = body;
        const isExisted = await this.hashtagModel.findById(id);
        if (!isExisted) throw new HttpException('Hashtag not found', HttpStatus.NOT_FOUND);

        await this.hashtagModel.findByIdAndUpdate(id, { status });
        return null;
    }

    async getDetailHashtag(id: string) {
        const hashtag = await this.hashtagModel.findById(id);
        if (!hashtag) throw new HttpException('Hashtag not found', HttpStatus.NOT_FOUND);
        return new DetailHashtagResponse(hashtag);
    }
}