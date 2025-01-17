import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { FavoriteColor } from '../enums/favorite-color.enum';
import { UserRoles } from '../enums/user-roles.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  fullName?: string;

  @ApiProperty()
  cpf?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @ApiProperty({ enum: FavoriteColor })
  favoriteColor?: FavoriteColor;

  @ApiProperty()
  notes?: string;

  @ApiProperty({ enum: UserRoles })
  @IsEnum(UserRoles)
  role?: UserRoles;
}
