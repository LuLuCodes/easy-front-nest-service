import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';

@Entity({ name: 't_dictionary', comment: '基础-字典表' })
@Index('idx_field_key', ['field_key'])
export class Dictionary extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '字典表主键' })
  id!: number;

  @Column({ type: 'varchar', length: 50, comment: '字典名称' })
  field_name!: string;

  @Column({ type: 'varchar', length: 50, comment: '字典key' })
  field_key!: string;

  @Column({ type: 'varchar', length: 1000, comment: '字典value' })
  field_value!: string;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '是否是系统变量',
  })
  is_system?: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '是否初始化时缓存',
  })
  is_init_cache?: number;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '备注' })
  remark?: string;

  @Column({ type: 'int', nullable: true, default: 0, comment: '排序' })
  sort_no?: number;
}
