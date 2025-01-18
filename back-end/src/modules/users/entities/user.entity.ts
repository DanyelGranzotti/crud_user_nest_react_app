/**
 * Represents a user record in the database.
 */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from '../../colors/entities/color.entity';
import { UserRoles } from '../enums/user-roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Color, { eager: true })
  @JoinColumn({ name: 'favoriteColorId' })
  favoriteColor: Color;

  @Column()
  notes: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Column({ nullable: true })
  password: string;
}
