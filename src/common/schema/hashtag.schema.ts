import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CommonModel, schemaOptions } from "./_common.schema";
import { ApiProperty } from "@nestjs/swagger";

export enum HASHTAG_STATUS {
    ACTIVE = 1,
    INACTIVE = 0
}

@Schema(schemaOptions('hashtags'))
export class HashtagModel extends CommonModel {

    @ApiProperty({ example: 'hashtag-1' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
    @Prop({ type: String })
    thumbnail: string;

    @ApiProperty({ example: 1 })
    @Prop({ type: Number, default: HASHTAG_STATUS.ACTIVE, required: true })
    status: HASHTAG_STATUS;

    @ApiProperty({ example: 'hashtag-1' })
    @Prop({ type: String, required: true })
    normalized_value: string;

    protected mapResponse(init?: HashtagModel): void {
        super.mapResponse(init);
        this.name = init?.name || '';
        this.thumbnail = init?.thumbnail || '';
        this.status = init?.status || HASHTAG_STATUS.INACTIVE;
    }
}

export const HashtagSchema = SchemaFactory.createForClass(HashtagModel);
