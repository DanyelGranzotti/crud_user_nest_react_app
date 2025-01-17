import { ApiProperty } from '@nestjs/swagger';
import { FavoriteColor } from '../enums/favorite-color.enum';

export class CreateUserDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: FavoriteColor })
  favoriteColor: FavoriteColor;

  @ApiProperty()
  notes: string;
}
