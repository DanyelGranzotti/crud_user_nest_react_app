import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let notesRepository: Repository<Note>;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getRepositoryToken(Note),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    notesRepository = module.get<Repository<Note>>(getRepositoryToken(Note));
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a note', async () => {
    const createNoteDto: CreateNoteDto = {
      description: 'Test note',
      userId: 'user-id',
    };
    const user = new User();
    user.id = 'user-id';
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(notesRepository, 'create').mockReturnValue(new Note());
    jest.spyOn(notesRepository, 'save').mockResolvedValue(new Note());

    const note = await service.create(createNoteDto, 'user-id');
    expect(note).toBeDefined();
  });

  it('should throw BadRequestException if userId is not provided', async () => {
    const createNoteDto: CreateNoteDto = {
      description: 'Test note',
      userId: '',
    };
    await expect(service.create(createNoteDto, '')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException if user not found', async () => {
    const createNoteDto: CreateNoteDto = {
      description: 'Test note',
      userId: 'user-id',
    };
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);
    await expect(service.create(createNoteDto, 'user-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException if note description is not provided', async () => {
    const createNoteDto: CreateNoteDto = {
      description: '',
      userId: 'user-id',
    };
    await expect(service.create(createNoteDto, 'user-id')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should find all notes with pagination and filtering by userId', async () => {
    const notes = [new Note(), new Note()];
    jest.spyOn(notesRepository, 'createQueryBuilder').mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(notes),
    } as any);

    const result = await service.findAll('user-id', 1, 10);
    expect(result).toEqual(notes);
  });

  it('should throw BadRequestException if userId is not provided for findAll', async () => {
    await expect(service.findAll('', 1, 10)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should find one note', async () => {
    const note = new Note();
    jest.spyOn(notesRepository, 'findOne').mockResolvedValue(note);

    const result = await service.findOne('note-id');
    expect(result).toEqual(note);
  });

  it('should throw BadRequestException if noteId is not provided', async () => {
    await expect(service.findOne('')).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException if note not found', async () => {
    jest.spyOn(notesRepository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne('note-id')).rejects.toThrow(NotFoundException);
  });

  it('should update a note', async () => {
    const note = new Note();
    jest.spyOn(service, 'findOne').mockResolvedValue(note);
    jest.spyOn(notesRepository, 'save').mockResolvedValue(note);

    const updateNoteDto: UpdateNoteDto = { description: 'Updated note' };
    const result = await service.update('note-id', updateNoteDto);
    expect(result.description).toBe('Updated note');
  });

  it('should throw BadRequestException if noteId is not provided for update', async () => {
    const updateNoteDto: UpdateNoteDto = { description: 'Updated note' };
    await expect(service.update('', updateNoteDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if note description is empty for update', async () => {
    const updateNoteDto: UpdateNoteDto = { description: '' };
    await expect(service.update('note-id', updateNoteDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should remove a note', async () => {
    const note = new Note();
    jest.spyOn(service, 'findOne').mockResolvedValue(note);
    jest.spyOn(notesRepository, 'remove').mockResolvedValue(undefined);

    await service.remove('note-id');
    expect(notesRepository.remove).toHaveBeenCalledWith(note);
  });

  it('should throw BadRequestException if noteId is not provided for remove', async () => {
    await expect(service.remove('')).rejects.toThrow(BadRequestException);
  });
});
