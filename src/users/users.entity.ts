import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true }) // Ensures no two people use the same email
  email: string;

  @Column()
  course: string;

  @Column()
  section: string;

  @Column()
  password: string;

  @Column({ default: 'student' }) // ← ADD THIS: New users are students by default
  role: string;
}
