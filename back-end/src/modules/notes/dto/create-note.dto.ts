import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ description: 'Texto descritivo da nota', required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'ID do usuário', required: true })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
