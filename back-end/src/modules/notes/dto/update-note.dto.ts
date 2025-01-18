import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty({
    description: 'The title of the note',
    example: 'My Note',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'The content of the note',
    example: 'This is the content of my note.',
    required: false,
  })
  content?: string;
}
