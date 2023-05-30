import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePostTable1684809421974 implements MigrationInterface {
    name = 'updatePostTable1684809421974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD \`postId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD CONSTRAINT \`FK_7bfc3a864ae30d631a648322e16\` FOREIGN KEY (\`postId\`) REFERENCES \`Post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP FOREIGN KEY \`FK_7bfc3a864ae30d631a648322e16\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP COLUMN \`postId\``);
    }

}
