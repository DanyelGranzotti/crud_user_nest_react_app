import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ description: 'The name of the color' })
  name: string;

  @ApiProperty({ description: 'The hex code of the color' })
  hex_code: string;

  @ApiProperty({ description: 'Whether the color is active' })
  active: boolean;
}
