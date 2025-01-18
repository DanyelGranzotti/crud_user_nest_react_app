import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColors1737161564406 implements MigrationInterface {
    name = 'CreateColors1737161564406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "hex_code" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "color"`);
    }

}
