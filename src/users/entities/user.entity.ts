import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuidToken: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    nullable: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    nullable: true,
  })
  token: string;

  @Column({ default: true })
  isActive: boolean;
}
