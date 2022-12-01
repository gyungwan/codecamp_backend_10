import { Grade } from 'src/apis/grades/entities/grade.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  userId: string;

  @Column()
  password: string;

  @JoinColumn()
  @OneToOne(() => Grade)
  grade: Grade;
}
