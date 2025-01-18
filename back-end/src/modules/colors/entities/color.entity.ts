import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hex_code: string;

  @Column({ default: true })
  active: boolean;
}
