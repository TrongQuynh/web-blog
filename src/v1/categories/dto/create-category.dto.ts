import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CATEGORIES_VISIBLE } from "src/common/schema/category.schema";

export class CreateCategoryDto {
    @ApiProperty({ example: 'category-1' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
    @IsString()
    @IsOptional()
    thumbnail: string;

    @ApiProperty({ example: 1, description: '1: show, 0: hide' })
    @Transform(({ value }) => Number(value))
    @IsEnum(CATEGORIES_VISIBLE)
    visible: number;
}