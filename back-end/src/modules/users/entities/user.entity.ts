import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteColor } from '../enums/favorite-color.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}
