import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FavoriteColor } from './enums/favorite-color.enum';
import { UserRoles } from './enums/user-roles.enum';
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
      cpf: '12345678909', // Valid CPF
      email: 'john@example.com',
      favoriteColor: FavoriteColor.BLUE,
      notes: 'Test note',
      role: UserRoles.USER,
      password: 'password',
    };
    const user = new User();
    Object.assign(user, createUserDto);

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('should create an admin user with password', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Admin User',
      cpf: '12345678909', // Valid CPF
      email: 'admin@example.com',
      favoriteColor: FavoriteColor.BLUE,
      notes: 'Admin note',
      role: UserRoles.ADMIN,
      password: 'adminpassword',
    };
    const user = new User();
    Object.assign(user, createUserDto);

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('should create a regular user without password', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Regular User',
      cpf: '12345678909', // Valid CPF
      email: 'user@example.com',
      favoriteColor: FavoriteColor.BLUE,
      notes: 'User note',
      role: UserRoles.USER,
      password: 'userpassword',
    };
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = '';

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('should throw ConflictException if email already in use', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Duplicate User',
      cpf: '12345678909', // Valid CPF
      email: 'duplicate@example.com',
      favoriteColor: FavoriteColor.BLUE,
      notes: 'Duplicate note',
      role: UserRoles.USER,
      password: 'password',
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(new User());
    await expect(service.create(createUserDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw BadRequestException for invalid CPF format', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Invalid CPF User',
      cpf: 'invalid-cpf',
      email: 'invalidcpf@example.com',
      favoriteColor: FavoriteColor.BLUE,
      notes: 'Invalid CPF note',
      role: UserRoles.USER,
      password: 'password',
    };
    await expect(service.create(createUserDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw ConflictException if CPF already in use', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Duplicate CPF User',
      cpf: '12345678909', // Valid CPF
      email: 'duplicatecpf@example.com',
      favoriteColor: FavoriteColor.BLUE,
      notes: 'Duplicate CPF note',
      role: UserRoles.USER,
      password: 'password',
    };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(new User());
    await expect(service.create(createUserDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should find all users', async () => {
    const users = [new User(), new User()];
    jest.spyOn(repository, 'find').mockResolvedValue(users);

    expect(await service.findAll()).toEqual(users);
  });

  it('should find one user by id', async () => {
    const user = new User();
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);

    expect(await service.findOne(validUUID)).toEqual(user);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { fullName: 'John Doe Updated' };
    const user = new User();
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);

    expect(await service.update(validUUID, updateUserDto)).toEqual(user);
  });

  it('should throw NotFoundException if user to update does not exist', async () => {
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'update').mockImplementation(() => {
      throw new NotFoundException();
    });
    await expect(service.update(validUUID, {})).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should remove a user', async () => {
    const user = new User();
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(validUUID)).toBeUndefined();
  });

  it('should throw NotFoundException if user to remove does not exist', async () => {
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'delete').mockImplementation(() => {
      throw new NotFoundException();
    });
    await expect(service.remove(validUUID)).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if user to find does not exist', async () => {
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne(validUUID)).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException for invalid UUID', async () => {
    const invalidUUID = 'invalid-uuid';
    await expect(service.findOne(invalidUUID)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update a user successfully', async () => {
    const updateUserDto: UpdateUserDto = { fullName: 'John Doe Updated' };
    const user = new User();
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);

    expect(await service.update(validUUID, updateUserDto)).toEqual(user);
  });

  it('should remove a user successfully', async () => {
    const user = new User();
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(validUUID)).toBeUndefined();
  });
});
