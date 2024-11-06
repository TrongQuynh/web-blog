import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHashtagDto {
    @ApiProperty({ example: 'hashtag-1' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
    @IsString()
    @IsOptional()
    thumbnail: string;
}