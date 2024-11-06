import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { HashtagsModule } from 'src/v1/hashtags/hashtags.module';

const routes:Routes = [
    {
        path: 'v1',
        children: [HashtagsModule]
    }
];

@Module({
    imports: [RouterModule.register(routes), HashtagsModule]
})
export class V1Module {}
