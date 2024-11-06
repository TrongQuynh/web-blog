import { Prop, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment-timezone';

export enum BOOLEAN {
  FALSE = 0,
  TRUE = 1,
}

export enum GENDER {
  FEMALE = 0,
  MALE = 1,
}

export const schemaOptions = (collection: string): SchemaOptions => {
  return {
    collection: collection,
    versionKey: false,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      currentTime: () => +moment(),
    },
  };
};

export class CommonModel {
  @ApiProperty({ type: String, example: '614e521490d1614614614614' })
  _id: string;

  @ApiProperty({ type: String, example: '10:00 22/02/2022' })
  @Prop({ type: Number })
  created_at: number | string;

  @ApiProperty({ type: String, example: '10:00 22/02/2022' })
  @Prop({ type: Number })
  updated_at: number | string;

  protected mapResponse?(init?: CommonModel) {
    this._id = init?._id || '';
    this.created_at = moment(init?.created_at).format('HH:mm DD/MM/YYYY');
    this.updated_at = moment(init?.updated_at).format('HH:mm DD/MM/YYYY');
  }
}
