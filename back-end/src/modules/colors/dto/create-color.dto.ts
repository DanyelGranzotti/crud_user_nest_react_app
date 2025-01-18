import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ description: 'The name of the color' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The hex code of the color' })
  @IsHexColor()
  @IsNotEmpty()
  hex_code: string;

  @ApiProperty({ description: 'Whether the color is active' })
  @IsBoolean()
  active: boolean;
}
