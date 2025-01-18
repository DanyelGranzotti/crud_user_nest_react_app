import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsUUID } from 'class-validator';
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

  @ApiProperty()
  @IsUUID()
  favoriteColorId?: string;

  @ApiProperty()
  notes?: string;

  @ApiProperty({ enum: UserRoles })
  @IsEnum(UserRoles)
  role?: UserRoles;
}
