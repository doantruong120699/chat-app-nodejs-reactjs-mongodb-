import {MigrationInterface, QueryRunner} from "typeorm";

export class createParentField1685680436541 implements MigrationInterface {
    name = 'createParentField1685680436541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Comment\` ADD \`parentCommentId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`Comment\` ADD CONSTRAINT \`FK_20e4c8c271255cd25b36ed76381\` FOREIGN KEY (\`parentCommentId\`) REFERENCES \`Comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Comment\` DROP FOREIGN KEY \`FK_20e4c8c271255cd25b36ed76381\``);
        await queryRunner.query(`ALTER TABLE \`Comment\` DROP COLUMN \`parentCommentId\``);
    }

}
