import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum } from "class-validator";

import { CATEGORIES_VISIBLE } from "src/common/schema/category.schema";

export class ChangeCategoryVisibleDto {

    @ApiProperty({ example: 1 })
    @Transform(({ value }) => Number(value))
    @IsEnum(CATEGORIES_VISIBLE)
    visible: number;
}
