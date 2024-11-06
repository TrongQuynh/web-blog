import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { ListHashtagDto } from './dto/list-hashtag.dto';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { ChangeStatusHashtagDto } from './dto/change-status-hashtag.dto';
import { StringIdParamDto } from 'src/common/dto/id_param.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DetailHashtagResponseSwagger } from './responses/detail-hashtag.response';
import { BaseResponseDataNull } from 'src/common/responses/base.response';
import { ListHashtagResponseSwagger } from './responses/list-hashtag.response';

@ApiTags('HASHTAGS')
@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) { }

  @ApiOperation({ summary: 'Get hashtags' })
  @ApiOkResponse({ type: ListHashtagResponseSwagger })
  @Get()
  async getHashtags(@Query() query: ListHashtagDto) {
    return await this.hashtagsService.getHashtags(query);
  }

  @ApiOperation({ summary: 'Create hashtag' })
  @ApiOkResponse({ type: DetailHashtagResponseSwagger })
  @Post('create')
  async createHashtag(@Body() body: CreateHashtagDto) {
    return await this.hashtagsService.createHashtag(body);
  } 

  @ApiOperation({ summary: 'Update hashtag' })
  @ApiOkResponse({ type: DetailHashtagResponseSwagger })
  @Post(':id/update')
  async updateHashtag(@Param() param: StringIdParamDto, @Body() body: CreateHashtagDto) {
    return await this.hashtagsService.updateHashtag(param.id, body);
  }

  @ApiOperation({ summary: 'Change status hashtag' })
  @ApiOkResponse({ type: BaseResponseDataNull })
  @Post(':id/change-status')
  async changeStatusHashtag(@Param() param: StringIdParamDto, @Body() body: ChangeStatusHashtagDto) {
    return await this.hashtagsService.changeStatusHashtag(param.id, body);
  }

  @ApiOperation({ summary: 'Get detail hashtag' })
  @ApiOkResponse({ type: DetailHashtagResponseSwagger })
  @Get(':id/detail')
  async getDetailHashtag(@Param() param: StringIdParamDto) {
    return await this.hashtagsService.getDetailHashtag(param.id);
  }
}

