import { ApiProperty } from "@nestjs/swagger";
import { BasePaginationResponse } from "src/common/responses/base-pagination.response";
import { DetailCategoryResponse } from "./detail-category.response";

export class ListCategoryResponseSwagger extends BasePaginationResponse {
    @ApiProperty({ type: [DetailCategoryResponse] })
    list: DetailCategoryResponse[];
}