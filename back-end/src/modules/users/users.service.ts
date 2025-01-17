import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as validateCPF } from 'cpf-check';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRoles } from './enums/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async validateUser(createUserDto: CreateUserDto) {
    if (!validateCPF(createUserDto.cpf)) {
      throw new BadRequestException('Invalid CPF format');
    }

    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use');
    }

    const existingUserByCPF = await this.usersRepository.findOne({
      where: { cpf: createUserDto.cpf },
    });
    if (existingUserByCPF) {
      throw new ConflictException('CPF already in use');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUser(createUserDto);

    if (createUserDto.role === UserRoles.ADMIN && !createUserDto.password) {
      throw new BadRequestException('Password is required for admin users');
    } else if (createUserDto.role !== UserRoles.ADMIN) {
      createUserDto.password = '';
    }

    const newUser: User = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filters: any = {},
  ): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (filters.cpf) {
      queryBuilder.andWhere('user.cpf = :cpf', { cpf: filters.cpf });
    }
    if (filters.fullName) {
      queryBuilder.andWhere('LOWER(user.fullName) LIKE LOWER(:fullName)', {
        fullName: `%${filters.fullName}%`,
      });
    }
    if (filters.favoriteColor) {
      queryBuilder.andWhere('user.favoriteColor = :favoriteColor', {
        favoriteColor: filters.favoriteColor,
      });
    }
    if (filters.email) {
      queryBuilder.andWhere('user.email LIKE :email', {
        email: `%${filters.email}%`,
      });
    }

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    if (total === 0) {
      throw new NotFoundException('No users found with the given filters');
    }

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<User> {
    if (
      !id.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      )
    ) {
      throw new BadRequestException('Invalid UUID format');
    }

    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user.role === UserRoles.ADMIN) {
      throw new BadRequestException('Admin user cannot be deleted');
    }
    await this.usersRepository.delete(id);
  }
}
