import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { Color } from '../colors/entities/color.entity';
import { Note } from '../notes/entities/note.entity';
import { User } from './entities/user.entity';
import { UserRoles } from './enums/user-roles.enum';

dotenv.config();

@Injectable()
export class UsersSeeder {
  private readonly logger = new Logger(UsersSeeder.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Color)
    private colorsRepository: Repository<Color>,
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  /**
   * Seeds an admin user if none exists.
   */
  async seed() {
    const adminEmail = process.env.USER_ADMIN;
    const adminPassword = process.env.USER_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      this.logger.error('Admin credentials not set in environment variables');
      throw new BadRequestException(
        'Admin credentials not set in environment variables',
      );
    }

    const adminUser = await this.usersRepository.findOneBy({
      email: adminEmail,
    });

    if (!adminUser) {
      const favoriteColor = await this.colorsRepository.findOne({
        where: { name: 'Red' },
      });
      if (!favoriteColor) {
        this.logger.error('Favorite color not found');
        throw new BadRequestException('Favorite color not found');
      }

      // TODO: hash adminPassword before saving in production
      const newUser = this.usersRepository.create({
        fullName: 'Admin User',
        cpf: '00000000000',
        email: adminEmail,
        favoriteColor,
        notes: [],
        role: UserRoles.ADMIN,
        password: adminPassword,
      });

      await this.usersRepository.save(newUser);
      this.logger.log('Admin user created');

      const exampleNote = this.notesRepository.create({
        description: 'This is an example note for the admin user.',
        user: newUser,
      });

      await this.notesRepository.save(exampleNote);
      this.logger.log('Example note for admin user created');
    } else {
      this.logger.log('Admin user already exists');
    }
  }
}
