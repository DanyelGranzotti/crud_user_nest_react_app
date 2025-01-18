import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Color } from '../colors/entities/color.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRoles } from './enums/user-roles.enum';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let colorsRepository: Repository<Color>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Color),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    colorsRepository = module.get<Repository<Color>>(getRepositoryToken(Color));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'John Doe',
      cpf: '12345678909',
      email: 'john@example.com',
      favoriteColorId: 'some-color-id',
      notes: 'Test note',
      role: UserRoles.USER,
      password: 'password',
    };
    const user = new User();
    Object.assign(user, createUserDto);

    const color = new Color();
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(colorsRepository, 'findOne').mockResolvedValue(color);
    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('should create an admin user with password', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Admin User',
      cpf: '12345678909',
      email: 'admin@example.com',
      favoriteColorId: 'some-color-id',
      notes: 'Admin note',
      role: UserRoles.ADMIN,
      password: 'adminpassword',
    };
    const user = new User();
    Object.assign(user, createUserDto);

    const color = new Color();
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(colorsRepository, 'findOne').mockResolvedValue(color);
    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('should create a regular user without password', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Regular User',
      cpf: '12345678909',
      email: 'user@example.com',
      favoriteColorId: 'some-color-id',
      notes: 'User note',
      role: UserRoles.USER,
      password: 'userpassword',
    };
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = '';

    const color = new Color();
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(colorsRepository, 'findOne').mockResolvedValue(color);
    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('should throw ConflictException if email already in use', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Duplicate User',
      cpf: '12345678909',
      email: 'duplicate@example.com',
      favoriteColorId: 'some-color-id',
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
      favoriteColorId: 'some-color-id',
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
      cpf: '12345678909',
      email: 'duplicatecpf@example.com',
      favoriteColorId: 'some-color-id',
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
    const total = users.length;
    const mockQueryBuilder = {
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([users, total]),
    };

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as any);

    const result = await service.findAll(1, 10, {});
    expect(result).toEqual({ data: users, total, page: 1, limit: 10 });
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
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
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

  it('should throw BadRequestException if trying to delete admin user', async () => {
    const adminUser = new User();
    adminUser.role = UserRoles.ADMIN;
    const validUUID = uuidv4();
    jest.spyOn(repository, 'findOne').mockResolvedValue(adminUser);

    await expect(service.remove(validUUID)).rejects.toThrow(
      BadRequestException,
    );
  });
});
