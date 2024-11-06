import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { HashtagsModule } from 'src/v1/hashtags/hashtags.module';
import { CategoriesModule } from './categories/categories.module';

const routes:Routes = [
    {
        path: 'v1',
        children: [HashtagsModule, CategoriesModule]
    }
];

@Module({
    imports: [RouterModule.register(routes), HashtagsModule, CategoriesModule]
})
export class V1Module {}
