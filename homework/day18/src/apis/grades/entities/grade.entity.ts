import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  grade: string;
}
