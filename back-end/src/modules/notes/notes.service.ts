import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    if (!createNoteDto.description) {
      throw new BadRequestException('Note description is required');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const note = this.notesRepository.create({
      ...createNoteDto,
      user,
    });
    return this.notesRepository.save(note);
  }

  async findAll(userId: string, page: number, limit: number): Promise<Note[]> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const skip = (page - 1) * limit;
    const query = this.notesRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.user', 'user')
      .where('note.userId = :userId', { userId })
      .andWhere('user.role != :adminRole', { adminRole: 'admin' }) // Omit admin user
      .orderBy('note.created_at', 'DESC')
      .skip(skip)
      .take(limit);

    return query.getMany();
  }

  async findOne(id: string): Promise<Note> {
    if (!id) {
      throw new BadRequestException('Note ID is required');
    }

    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    if (!id) {
      throw new BadRequestException('Note ID is required');
    }
    if (updateNoteDto.description === '') {
      throw new BadRequestException('Note description cannot be empty');
    }

    const note = await this.findOne(id);
    if (updateNoteDto.description) {
      note.description = updateNoteDto.description;
    }
    return this.notesRepository.save(note);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Note ID is required');
    }

    const note = await this.findOne(id);
    await this.notesRepository.remove(note);
  }
}
