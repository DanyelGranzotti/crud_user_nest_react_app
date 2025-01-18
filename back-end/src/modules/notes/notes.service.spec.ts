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
    const createNoteDto: CreateNoteDto = { description: 'Test note' };
    const user = new User();
    user.id = 'user-id';
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(notesRepository, 'create').mockReturnValue(new Note());
    jest.spyOn(notesRepository, 'save').mockResolvedValue(new Note());

    const note = await service.create(createNoteDto, 'user-id');
    expect(note).toBeDefined();
  });

  it('should find all notes', async () => {
    const notes = [new Note(), new Note()];
    jest.spyOn(notesRepository, 'find').mockResolvedValue(notes);

    const result = await service.findAll();
    expect(result).toEqual(notes);
  });

  it('should find one note', async () => {
    const note = new Note();
    jest.spyOn(notesRepository, 'findOne').mockResolvedValue(note);

    const result = await service.findOne('note-id');
    expect(result).toEqual(note);
  });

  it('should update a note', async () => {
    const note = new Note();
    jest.spyOn(service, 'findOne').mockResolvedValue(note);
    jest.spyOn(notesRepository, 'save').mockResolvedValue(note);

    const updateNoteDto: UpdateNoteDto = { description: 'Updated note' };
    const result = await service.update('note-id', updateNoteDto);
    expect(result.description).toBe('Updated note');
  });

  it('should remove a note', async () => {
    const note = new Note();
    jest.spyOn(service, 'findOne').mockResolvedValue(note);
    jest.spyOn(notesRepository, 'remove').mockResolvedValue(undefined);

    await service.remove('note-id');
    expect(notesRepository.remove).toHaveBeenCalledWith(note);
  });
});
