import {MigrationInterface, QueryRunner} from "typeorm";

export class createMigrations1685429356559 implements MigrationInterface {
    name = 'createMigrations1685429356559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`birthday\` datetime NULL, \`phoneNumber\` varchar(255) NULL, \`address\` varchar(1000) NULL, \`gender\` tinyint NULL, \`avatar\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Reaction\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`reactionType\` int NOT NULL DEFAULT '1', \`postId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Comment\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`content\` text NULL, \`isEdited\` tinyint NOT NULL DEFAULT 0, \`path\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, \`postId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`refreshToken\` varchar(255) NULL, \`lastLoginAt\` timestamp NULL, \`profileId\` int NULL, INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), UNIQUE INDEX \`REL_654d8b4ea5b99b309ea9d8498a\` (\`profileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP COLUMN \`likes\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP COLUMN \`comments\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP COLUMN \`share\``);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP COLUMN \`likes\``);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP COLUMN \`comments\``);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP COLUMN \`share\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD \`likeCounter\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD \`commentCounter\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD \`shareCounter\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD \`postId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD \`likeCounter\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD \`commentCounter\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD \`shareCounter\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Photo\` CHANGE \`caption\` \`caption\` text COLLATE "utf8mb4_unicode_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`Post\` CHANGE \`caption\` \`caption\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD CONSTRAINT \`FK_f271d982b6dc0d89f79bc3840f4\` FOREIGN KEY (\`ownerId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD CONSTRAINT \`FK_c303f2f38e4e5bcef425d68867d\` FOREIGN KEY (\`albumId\`) REFERENCES \`Album\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD CONSTRAINT \`FK_7bfc3a864ae30d631a648322e16\` FOREIGN KEY (\`postId\`) REFERENCES \`Post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Reaction\` ADD CONSTRAINT \`FK_f23c5ca787ea103be296bd65af8\` FOREIGN KEY (\`postId\`) REFERENCES \`Post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Reaction\` ADD CONSTRAINT \`FK_dd611eed69d26ffdccc5045ec13\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Comment\` ADD CONSTRAINT \`FK_4c827119c9554affb8018d4da82\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Comment\` ADD CONSTRAINT \`FK_fb770b565e79f3a4a2ecef894a7\` FOREIGN KEY (\`postId\`) REFERENCES \`Post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD CONSTRAINT \`FK_9a628271bb8fadde9f80c535218\` FOREIGN KEY (\`ownerId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD CONSTRAINT \`FK_654d8b4ea5b99b309ea9d8498a9\` FOREIGN KEY (\`profileId\`) REFERENCES \`Profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Album\` ADD CONSTRAINT \`FK_877fbb3229c040cc4eec9703207\` FOREIGN KEY (\`ownerId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Album\` DROP FOREIGN KEY \`FK_877fbb3229c040cc4eec9703207\``);
        await queryRunner.query(`ALTER TABLE \`User\` DROP FOREIGN KEY \`FK_654d8b4ea5b99b309ea9d8498a9\``);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP FOREIGN KEY \`FK_9a628271bb8fadde9f80c535218\``);
        await queryRunner.query(`ALTER TABLE \`Comment\` DROP FOREIGN KEY \`FK_fb770b565e79f3a4a2ecef894a7\``);
        await queryRunner.query(`ALTER TABLE \`Comment\` DROP FOREIGN KEY \`FK_4c827119c9554affb8018d4da82\``);
        await queryRunner.query(`ALTER TABLE \`Reaction\` DROP FOREIGN KEY \`FK_dd611eed69d26ffdccc5045ec13\``);
        await queryRunner.query(`ALTER TABLE \`Reaction\` DROP FOREIGN KEY \`FK_f23c5ca787ea103be296bd65af8\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP FOREIGN KEY \`FK_7bfc3a864ae30d631a648322e16\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP FOREIGN KEY \`FK_c303f2f38e4e5bcef425d68867d\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP FOREIGN KEY \`FK_f271d982b6dc0d89f79bc3840f4\``);
        await queryRunner.query(`ALTER TABLE \`Post\` CHANGE \`caption\` \`caption\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Photo\` CHANGE \`caption\` \`caption\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP COLUMN \`shareCounter\``);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP COLUMN \`commentCounter\``);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP COLUMN \`likeCounter\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP COLUMN \`postId\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP COLUMN \`shareCounter\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP COLUMN \`commentCounter\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP COLUMN \`likeCounter\``);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD \`share\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD \`comments\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD \`likes\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD \`share\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD \`comments\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD \`likes\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP INDEX \`REL_654d8b4ea5b99b309ea9d8498a\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`Comment\``);
        await queryRunner.query(`DROP TABLE \`Reaction\``);
        await queryRunner.query(`DROP TABLE \`Profile\``);
    }

}
