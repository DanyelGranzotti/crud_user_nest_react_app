import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteColor } from '../enums/favorite-color.enum';
import { UserRoles } from '../enums/user-roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  @Column()
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
    array: true,
  })
  roles: UserRoles = UserRoles.USER;

  @Column({ nullable: true })
  password: string;
}
