import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';
import { UserRoles } from '../enums/user-roles.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @Matches(/^\d{11}$/, { message: 'CPF must be 11 digits and numbers only' })
  cpf: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  notes: string;

  @ApiProperty({ enum: UserRoles, required: false })
  @IsEnum(UserRoles)
  @IsOptional()
  role: UserRoles = UserRoles.USER;

  @ApiProperty({ required: false })
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsUUID()
  favoriteColorId: string;
}
