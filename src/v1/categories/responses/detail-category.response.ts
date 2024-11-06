import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/common/responses/base.response";
import { CategoriesModel } from "src/common/schema/category.schema";

export class DetailCategoryResponse extends CategoriesModel {
    constructor(init?: CategoriesModel) {
        super();
        this.mapResponse(init);
    }
}

export class DetailCategoryResponseSwagger extends BaseResponse {
    @ApiProperty({ type: DetailCategoryResponse })
    data: DetailCategoryResponse;
}