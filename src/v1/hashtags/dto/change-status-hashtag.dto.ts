import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum } from "class-validator";
import { HASHTAG_STATUS } from "src/common/schema/hashtag.schema";

export class ChangeStatusHashtagDto {

    @ApiProperty({ example: 1 })
    @Transform(({ value }) => +value)
    @IsEnum(HASHTAG_STATUS)
    status: number;
}