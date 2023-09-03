import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RoleAccess {
  @PrimaryGeneratedColumn()
  role_acc_id: number;

  @Column({
    type: 'int8',
  })
  role_id: number;

  @Column({
    type: 'int8',
  })
  user_id: number;

  @Column({
    type: 'int8',
    default: 0,
  })
  create_by: number;

  @Column({
    type: 'int8',
    default: 0,
  })
  update_by: number;

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
}
