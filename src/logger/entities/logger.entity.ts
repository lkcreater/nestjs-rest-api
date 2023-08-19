import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'logger_app',
})
export class Logger {
  @PrimaryGeneratedColumn()
  log_id: number;

  @Column({
    nullable: true,
  })
  log_type: string;

  @Column('jsonb', {
    nullable: true,
  })
  log_data: object;

  @Column({ nullable: true })
  log_user: string;

  @Column('jsonb', { nullable: true })
  log_origin: object;

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
