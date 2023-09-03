import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
  })
  role_access_key: string;

  @Column()
  role_name: string;

  @Column({
    type: 'text',
  })
  role_desc: string;

  @Column({
    type: 'jsonb',
  })
  role_access: object;

  @Column({
    default: false,
  })
  role_is_template: boolean;

  @Column({
    name: 'is_active',
    default: true,
  })
  is_active: boolean;

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
