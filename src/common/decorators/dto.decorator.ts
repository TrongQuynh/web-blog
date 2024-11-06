
import { HttpException, HttpStatus } from '@nestjs/common';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';

export function TransformObjectId() {
  return Transform(({ value }) => {
    try { return new mongoose.Types.ObjectId(value); }
    catch (error) { throw new HttpException(`id không đúng định dạng`, HttpStatus.BAD_REQUEST); }
  });
}