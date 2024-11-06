import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsController } from './hashtags.controller';
import { HashtagModel } from 'src/common/schema/hashtag.schema';
import { HashtagSchema } from 'src/common/schema/hashtag.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    {name: HashtagModel.name, schema: HashtagSchema}
  ])],
  controllers: [HashtagsController],
  providers: [HashtagsService],
})
export class HashtagsModule {}
