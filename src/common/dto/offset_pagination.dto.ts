import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class OffsetPaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  page = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(500)
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: Number,
    example: 20,
    required: false,
  })
  limit = 20;
}
