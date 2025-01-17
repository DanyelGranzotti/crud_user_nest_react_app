import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { FavoriteColor } from '../enums/favorite-color.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  fullName?: string;

  @ApiProperty()
  cpf?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty({ enum: FavoriteColor })
  favoriteColor?: FavoriteColor;

  @ApiProperty()
  notes?: string;
}
