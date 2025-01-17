import { ApiProperty } from '@nestjs/swagger';
import { FavoriteColor } from '../enums/favorite-color.enum';
import { UserRoles } from '../enums/user-roles.enum';

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

  @ApiProperty({ required: false })
  roles: UserRoles;

  @ApiProperty({ required: false })
  password: string;
}
