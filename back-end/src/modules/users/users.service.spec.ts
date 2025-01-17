import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FavoriteColor } from './enums/favorite-color.enum';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'John Doe',
      cpf: '123456789',
      email: 'john@example.com',
      favoriteColor: FavoriteColor.BLUE,
      notes: 'Test note',
    };
    const user = new User();
    Object.assign(user, createUserDto);

    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('should find all users', async () => {
    const users = [new User(), new User()];
    jest.spyOn(repository, 'find').mockResolvedValue(users);

    expect(await service.findAll()).toEqual(users);
  });

  it('should find one user by id', async () => {
    const user = new User();
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

    expect(await service.findOne('1')).toEqual(user);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { fullName: 'John Doe Updated' };
    const user = new User();
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(service, 'findOne').mockResolvedValue(user);

    expect(await service.update('1', updateUserDto)).toEqual(user);
  });

  it('should remove a user', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove('1')).toBeUndefined();
  });
});
