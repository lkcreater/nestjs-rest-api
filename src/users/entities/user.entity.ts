import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import {
  Entity,
  Column,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'uuid_token',
  })
  @Generated('uuid')
  uuid_token: string;

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

  @Column({
    name: 'is_active',
    default: true,
  })
  is_active: boolean;

  @Column({ default: false })
  status: boolean;

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
  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'uid',
  })
  userProfile: UserProfile;
}
