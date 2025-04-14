import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  authorId: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  content: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  title: string;
}
