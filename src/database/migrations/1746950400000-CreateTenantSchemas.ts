import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenantSchemas1746950400000 implements MigrationInterface {
  name = 'CreateTenantSchemas1746950400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`t_tenant\` (
        \`id\`           BIGINT NOT NULL AUTO_INCREMENT COMMENT '租户主键',
        \`tenant_id\`    BIGINT NOT NULL DEFAULT 0,
        \`code\`         VARCHAR(64) NOT NULL COMMENT '租户编码 (kebab-case slug)',
        \`name\`         VARCHAR(128) NOT NULL COMMENT '租户名称',
        \`status\`       ENUM('active','suspended','deleted') NOT NULL DEFAULT 'active',
        \`plan\`         VARCHAR(32) NOT NULL DEFAULT 'free',
        \`metadata\`     JSON NULL,
        \`created_at\`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`deleted_at\`   DATETIME NULL,
        \`created_by\`   BIGINT NOT NULL,
        \`updated_by\`   BIGINT NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`uq_tenant_code\` (\`code\`),
        INDEX \`idx_t_tenant_tenant_id\` (\`tenant_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='租户表'
    `);

    await queryRunner.query(`
      CREATE TABLE \`t_tenant_user_relation\` (
        \`id\`                  BIGINT NOT NULL AUTO_INCREMENT,
        \`tenant_id\`           BIGINT NOT NULL DEFAULT 0,
        \`relation_tenant_id\`  BIGINT NOT NULL COMMENT '关联到的租户 ID',
        \`user_id\`             BIGINT NOT NULL COMMENT '关联用户 ID',
        \`role_in_tenant\`      ENUM('owner','admin','member') NOT NULL DEFAULT 'member',
        \`is_default\`          TINYINT NOT NULL DEFAULT 0,
        \`created_at\`          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\`          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`deleted_at\`          DATETIME NULL,
        \`created_by\`          BIGINT NOT NULL,
        \`updated_by\`          BIGINT NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`uq_tenant_user\` (\`relation_tenant_id\`, \`user_id\`),
        INDEX \`idx_tur_user_id\` (\`user_id\`),
        INDEX \`idx_t_tenant_user_relation_tenant_id\` (\`tenant_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='租户-用户关系表'
    `);

    await queryRunner.query(`
      CREATE TABLE \`t_tenant_credential\` (
        \`id\`                    BIGINT NOT NULL AUTO_INCREMENT,
        \`tenant_id\`             BIGINT NOT NULL DEFAULT 0,
        \`credential_tenant_id\`  BIGINT NOT NULL COMMENT '凭证归属的租户 ID',
        \`provider\`              ENUM('wx_oa','wx_mp','wx_pay','alipay','oss','sms') NOT NULL,
        \`app_id\`                VARCHAR(128) NOT NULL,
        \`display_name\`          VARCHAR(128) NULL,
        \`secret_cipher\`         BLOB NOT NULL,
        \`secret_iv\`             BINARY(12) NOT NULL,
        \`secret_tag\`            BINARY(16) NOT NULL,
        \`cert_cipher\`           BLOB NULL,
        \`cert_iv\`               BINARY(12) NULL,
        \`cert_tag\`              BINARY(16) NULL,
        \`cert_serial_no\`        VARCHAR(64) NULL,
        \`status\`                ENUM('active','disabled') NOT NULL DEFAULT 'active',
        \`key_version\`           TINYINT NOT NULL DEFAULT 1,
        \`metadata\`              JSON NULL,
        \`created_at\`            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\`            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`deleted_at\`            DATETIME NULL,
        \`created_by\`            BIGINT NOT NULL,
        \`updated_by\`            BIGINT NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`uq_tenant_provider_app\` (\`credential_tenant_id\`, \`provider\`, \`app_id\`),
        INDEX \`idx_tc_provider\` (\`provider\`),
        INDEX \`idx_t_tenant_credential_tenant_id\` (\`tenant_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='租户外部服务凭证表（密文存储）'
    `);

    await queryRunner.query(
      `ALTER TABLE \`t_user\` ADD COLUMN \`is_system_admin\` TINYINT NOT NULL DEFAULT 0 COMMENT '是否为 system 租户下的超级管理员' AFTER \`user_status\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`t_user\` DROP COLUMN \`is_system_admin\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`t_tenant_credential\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`t_tenant_user_relation\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`t_tenant\``);
  }
}
