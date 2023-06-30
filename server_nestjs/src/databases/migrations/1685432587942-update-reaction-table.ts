import {MigrationInterface, QueryRunner} from "typeorm";

export class updateReactionTable1685432587942 implements MigrationInterface {
    name = 'updateReactionTable1685432587942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Reaction\` ADD \`isDeleted\` int NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Reaction\` DROP COLUMN \`isDeleted\``);
    }

}
