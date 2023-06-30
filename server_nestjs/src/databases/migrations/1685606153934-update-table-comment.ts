import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTableComment1685606153934 implements MigrationInterface {
    name = 'updateTableComment1685606153934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Reaction\` CHANGE \`isDeleted\` \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`Comment\` CHANGE \`path\` \`path\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Comment\` CHANGE \`path\` \`path\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Reaction\` CHANGE \`isDeleted\` \`isDeleted\` tinyint(1) NOT NULL DEFAULT '0'`);
    }

}
