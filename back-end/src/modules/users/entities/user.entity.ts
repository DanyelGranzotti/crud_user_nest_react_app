/**
 * Represents a user record in the database.
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteColor } from '../enums/favorite-color.enum';
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

  @Column({
    type: 'enum',
    enum: FavoriteColor,
  })
  favoriteColor: FavoriteColor;

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
