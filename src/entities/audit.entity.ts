import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { bigintTransformer } from '@database/transformers/bigint.transformer';

/**
 * Audit fields shared by every business table.
 * Subclasses still declare their own primary key because the type
 * varies (most are BIGINT, t_dictionary is INT).
 */
export abstract class AuditEntity {
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updated_at!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deleted_at?: Date;

  @Column({
    name: 'created_by',
    type: 'bigint',
    transformer: bigintTransformer,
  })
  created_by!: number;

  @Column({
    name: 'updated_by',
    type: 'bigint',
    transformer: bigintTransformer,
  })
  updated_by!: number;
}
