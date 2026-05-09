import { MigrationInterface, QueryRunner } from 'typeorm';

const TABLES = [
  't_user',
  't_user_login',
  't_user_role',
  't_user_role_relation',
  't_user_right',
  't_user_right_relation',
  't_dictionary',
  't_sms_log',
  't_user_oplog',
];

export class AddTenantIdToAuditEntities1746864000000 implements MigrationInterface {
  name = 'AddTenantIdToAuditEntities1746864000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of TABLES) {
      await queryRunner.query(
        `ALTER TABLE \`${table}\` ADD COLUMN \`tenant_id\` BIGINT NOT NULL DEFAULT 0 AFTER \`id\``,
      );
      await queryRunner.query(
        `CREATE INDEX \`idx_${table}_tenant_id\` ON \`${table}\` (\`tenant_id\`)`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of TABLES) {
      await queryRunner.query(`DROP INDEX \`idx_${table}_tenant_id\` ON \`${table}\``);
      await queryRunner.query(`ALTER TABLE \`${table}\` DROP COLUMN \`tenant_id\``);
    }
  }
}
