import { ApiProperty } from "@nestjs/swagger";
import { DetailHashtagResponse } from "./detail-hashtag.response";
import { BasePaginationResponse } from "src/common/responses/base-pagination.response";


export class ListHashtagResponseSwagger extends BasePaginationResponse {
    @ApiProperty({ type: [DetailHashtagResponse] })
    list: DetailHashtagResponse[];
}
