import { PartialType } from '@nestjs/swagger';
import { CreateColorDto } from './create-color.dto';
import { IsBoolean, IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateColorDto extends PartialType(CreateColorDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsHexColor()
  @IsOptional()
  hex_code?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
