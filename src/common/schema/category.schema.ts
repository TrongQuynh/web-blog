import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CommonModel, schemaOptions } from "./_common.schema";
import { ApiProperty } from "@nestjs/swagger";

export enum CATEGORIES_VISIBLE {
    SHOW = 1,
    HIDE = 0
}

@Schema(schemaOptions('categories'))
export class CategoriesModel extends CommonModel{

    @ApiProperty({ example: 'category-1' })
    @Prop({ type: String, required: true })
    name: string;

    @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
    @Prop({ type: String, required: true })
    thumbnail: string;

    @ApiProperty({ example: 1 })
    @Prop({ type: Number, required: true, enum: CATEGORIES_VISIBLE, default: CATEGORIES_VISIBLE.HIDE })
    visible: CATEGORIES_VISIBLE;

    @ApiProperty({ example: '1' })
    @Prop({ type: String, required: true })
    user_id: string;

    protected mapResponse(init?: CategoriesModel): void {
        super.mapResponse(init);
        this.name = init?.name || '';
        this.thumbnail = init?.thumbnail || '';
        this.visible = init?.visible || CATEGORIES_VISIBLE.HIDE;
        this.user_id = init?.user_id || '';
    }
}

export const CategoriesSchema = SchemaFactory.createForClass(CategoriesModel);