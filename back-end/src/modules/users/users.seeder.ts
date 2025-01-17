import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FavoriteColor } from './enums/favorite-color.enum';
import { UserRoles } from './enums/user-roles.enum';

dotenv.config();

@Injectable()
export class UsersSeeder {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Seeds an admin user if none exists.
   */
  async seed() {
    const adminEmail = process.env.USER_ADMIN;
    const adminPassword = process.env.USER_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new BadRequestException(
        'Admin credentials not set in environment variables',
      );
    }

    const adminUser = await this.usersRepository.findOneBy({
      email: adminEmail,
    });

    if (!adminUser) {
      // TODO: hash adminPassword before saving in production
      const newUser = this.usersRepository.create({
        fullName: 'Admin User',
        cpf: '00000000000',
        email: adminEmail,
        favoriteColor: FavoriteColor.BLUE,
        notes: 'Admin account',
        role: UserRoles.ADMIN,
        password: adminPassword,
      });

      await this.usersRepository.save(newUser);
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
}
