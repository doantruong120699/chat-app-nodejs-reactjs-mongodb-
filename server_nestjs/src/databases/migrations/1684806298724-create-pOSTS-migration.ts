import {MigrationInterface, QueryRunner} from "typeorm";

export class createPOSTSMigration1684806298724 implements MigrationInterface {
    name = 'createPOSTSMigration1684806298724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Post\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`caption\` text NOT NULL, \`likes\` int NOT NULL DEFAULT '0', \`comments\` int NOT NULL DEFAULT '0', \`share\` int NOT NULL DEFAULT '0', \`status\` int NOT NULL DEFAULT '1', \`privacy\` int NOT NULL DEFAULT '2', \`ownerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Photo\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`caption\` text NOT NULL, \`url\` varchar(255) NULL, \`likes\` int NOT NULL DEFAULT '0', \`height\` int NOT NULL DEFAULT '0', \`width\` int NOT NULL DEFAULT '0', \`comments\` int NOT NULL DEFAULT '0', \`share\` int NOT NULL DEFAULT '0', \`status\` int NOT NULL DEFAULT '1', \`privacy\` int NOT NULL DEFAULT '2', \`ownerId\` varchar(36) NULL, \`albumId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Album\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` text NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`privacy\` int NOT NULL DEFAULT '2', \`ownerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD CONSTRAINT \`FK_9a628271bb8fadde9f80c535218\` FOREIGN KEY (\`ownerId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD CONSTRAINT \`FK_f271d982b6dc0d89f79bc3840f4\` FOREIGN KEY (\`ownerId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Photo\` ADD CONSTRAINT \`FK_c303f2f38e4e5bcef425d68867d\` FOREIGN KEY (\`albumId\`) REFERENCES \`Album\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Album\` ADD CONSTRAINT \`FK_877fbb3229c040cc4eec9703207\` FOREIGN KEY (\`ownerId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Album\` DROP FOREIGN KEY \`FK_877fbb3229c040cc4eec9703207\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP FOREIGN KEY \`FK_c303f2f38e4e5bcef425d68867d\``);
        await queryRunner.query(`ALTER TABLE \`Photo\` DROP FOREIGN KEY \`FK_f271d982b6dc0d89f79bc3840f4\``);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP FOREIGN KEY \`FK_9a628271bb8fadde9f80c535218\``);
        await queryRunner.query(`DROP TABLE \`Album\``);
        await queryRunner.query(`DROP TABLE \`Photo\``);
        await queryRunner.query(`DROP TABLE \`Post\``);
    }

}
