import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsBoolean, IsHexColor, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true, nullable: false })
  @IsHexColor()
  @IsNotEmpty()
  hex_code: string;

  @Column({ default: true })
  @IsBoolean()
  active: boolean;

  @OneToMany(() => User, (user) => user.favoriteColor)
  users: User[];
}
