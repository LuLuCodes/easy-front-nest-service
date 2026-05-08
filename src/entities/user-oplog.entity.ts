import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { bigintTransformer } from '@database/transformers/bigint.transformer';

@Entity({ name: 't_user_oplog', comment: '用户操作记录表' })
@Index('idx_user', ['user_id'])
@Index('idx_target', ['target_type', 'target_id'])
export class UserOplog extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({
    type: 'bigint',
    nullable: true,
    transformer: bigintTransformer,
    comment: '用户id',
  })
  user_id?: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '目标类型(表名)',
  })
  target_type?: string;

  @Column({
    type: 'bigint',
    nullable: true,
    transformer: bigintTransformer,
    comment: '目标id(表id)',
  })
  target_id?: number;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '【谁】' })
  action_user?: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    comment: '动作，业务定义 1-新增 2-修改 3-删除',
  })
  action_type?: number;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
    comment: '【干了什么】',
  })
  action_desc?: string;
}
