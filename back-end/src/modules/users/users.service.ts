import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { validate as validateCPF } from 'cpf-check';
import { Repository } from 'typeorm';
import { Color } from '../colors/entities/color.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRoles } from './enums/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Color)
    private colorsRepository: Repository<Color>,
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

  isAuthenticated(): boolean {
    // Implement your authentication logic here
    return true; // Placeholder, replace with actual authentication check
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.role === UserRoles.ADMIN && !this.isAuthenticated()) {
      throw new UnauthorizedException(
        'Você não tem permissão para criar um usuário admin.',
      );
    }

    await this.validateUser(createUserDto);

    const favoriteColor = await this.colorsRepository.findOne({
      where: { id: createUserDto.favoriteColorId },
    });
    if (!favoriteColor) {
      throw new BadRequestException('Favorite color not found');
    }

    let hashedPassword = null;
    if (createUserDto.password) {
      hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    }

    const newUser: User = this.usersRepository.create({
      ...createUserDto,
      favoriteColor,
      password: hashedPassword,
      notes: [],
    });
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
      relations: ['notes'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.notes = user.notes || [];
    user.notes = user.notes
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(0, 2);

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

    if (updateUserDto.favoriteColorId) {
      const favoriteColor = await this.colorsRepository.findOne({
        where: { id: updateUserDto.favoriteColorId },
      });
      if (!favoriteColor) {
        throw new BadRequestException('Favorite color not found');
      }
      updateUserDto.favoriteColorId = favoriteColor.id;
    }

    await this.usersRepository.update(id, {
      ...updateUserDto,
      notes: user.notes,
    });
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
