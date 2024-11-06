import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/common/responses/base.response";
import { HashtagModel } from "src/common/schema/hashtag.schema";

export class DetailHashtagResponse extends HashtagModel {
    constructor(init?: HashtagModel) {
        super();
        this.mapResponse(init);
    }
}

export class DetailHashtagResponseSwagger extends BaseResponse {
    @ApiProperty({ type: DetailHashtagResponse })
    data: DetailHashtagResponse;
}

