import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCharset1685087315334 implements MigrationInterface {
    name = 'updateCharset1685087315334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Photo\` CHANGE \`caption\` \`caption\` text COLLATE "utf8mb4_unicode_ci" NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Photo\` CHANGE \`caption\` \`caption\` text COLLATE "utf8mb4_0900_ai_ci" NOT NULL`);
    }

}
