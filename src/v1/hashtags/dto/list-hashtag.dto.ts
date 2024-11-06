import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";

import { IsString } from "class-validator";
import { OffsetPaginationDto } from "src/common/dto/offset_pagination.dto";
import { HASHTAG_STATUS } from "src/common/schema/hashtag.schema";

export class ListHashtagDto extends OffsetPaginationDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ example: 'hashtag-1', description: 'Search by name' })
    key_search: string;

    @Transform(({ value }) => +value)
    @IsEnum(HASHTAG_STATUS)
    @ApiPropertyOptional({ example: 1, description: '1: active, 0: inactive' })
    status: number;
}