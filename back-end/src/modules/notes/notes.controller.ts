import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';

@ApiTags('notes')
@Controller('notes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({
    status: 201,
    description: 'The note has been successfully created.',
    type: Note,
  })
  create(@Body() createNoteDto: CreateNoteDto) {
    const { userId } = createNoteDto;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.notesService.create(createNoteDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiQuery({ name: 'userId', required: false, description: 'ID do usuário' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de itens por página',
    example: 10,
  })
  @ApiResponse({ status: 200, description: 'Return all notes.', type: [Note] })
  findAll(
    @Query('userId') userId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.notesService.findAll(userId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the note with the given ID.',
    type: Note,
  })
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Note ID is required');
    }
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note by ID' })
  @ApiResponse({
    status: 200,
    description: 'The note has been successfully updated.',
    type: Note,
  })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    if (!id) {
      throw new BadRequestException('Note ID is required');
    }
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note by ID' })
  @ApiResponse({
    status: 200,
    description: 'The note has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Note ID is required');
    }
    return this.notesService.remove(id);
  }
}
