import {
  Entity,
  Column,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 250,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
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

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
