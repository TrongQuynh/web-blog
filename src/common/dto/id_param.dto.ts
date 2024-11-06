
import { ApiProperty } from '@nestjs/swagger';
import { registerDecorator, ValidationOptions } from 'class-validator';
import * as mongoose from 'mongoose';
import { TransformObjectId } from '../decorators/transform-object-id.decorator';


export class StringIdParamDto {
  @TransformObjectId()
  @ApiProperty({
    type: String,
    example: '670e1c2ee749672fc2e77178',
  })
  id: string;
}

export function IsStringId(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isStringId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!mongoose.Types.ObjectId.isValid(value)) return false;
          return true;
        },

        defaultMessage() {
          return 'id không đúng định dạng';
        },
      },
    });
  };
}

