import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies') 
export class MovieOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  studio: string;

  @Column()
  producer: string;

  @Column()
  winner: boolean;
}
