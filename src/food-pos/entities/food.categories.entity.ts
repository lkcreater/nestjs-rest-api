import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { nameTable } from '../food-pos.constants.type';

@Entity({
  name: nameTable('food-categories'),
})
export class FoodCategories {
  @PrimaryGeneratedColumn()
  cate_id: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  cate_parent_id: number;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
  })
  cate_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  cate_desc: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  cate_options: object;

  @Column({
    default: true,
  })
  is_active: boolean;

  @Column({
    type: 'integer',
    default: 0,
  })
  create_by: number;

  @Column({
    type: 'integer',
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
