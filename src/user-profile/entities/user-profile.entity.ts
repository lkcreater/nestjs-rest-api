import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int8',
  })
  uid: number;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  //-- join table --------------------------------
  @OneToOne(() => User, (user) => user.userProfile, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  user: User;
}
