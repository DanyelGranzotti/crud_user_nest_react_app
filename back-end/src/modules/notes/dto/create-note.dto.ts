import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ description: 'Texto descritivo da nota', required: true })
  @IsNotEmpty()
  @IsString()
  description: string;
}
