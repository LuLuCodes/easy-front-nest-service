import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';

@Entity({ name: 't_sms_log', comment: '短信发送表' })
@Index('idx_mobile', ['mobile'])
export class SmsLog extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '系统编码' })
  id!: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '短信类型，业务自定义',
  })
  sms_type?: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '手机号' })
  mobile?: string;

  @Column({ type: 'varchar', length: 500, nullable: true, comment: '校验码' })
  sms_param?: string;

  @Column({ type: 'datetime', nullable: true, comment: '过期时间' })
  expire_time?: Date;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '状态：1-待验证 10-已验证 11-发送失败 12-验证失败',
  })
  msg_status?: number;
}
