import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesSchema } from 'src/common/schema/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModel } from 'src/common/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CategoriesModel.name, schema: CategoriesSchema }])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
