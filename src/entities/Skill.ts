import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  category!: string;

  @Column({ type: 'integer' })
  proficiency!: number;
}
