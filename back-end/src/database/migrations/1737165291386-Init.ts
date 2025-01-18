import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737165291386 implements MigrationInterface {
    name = 'Init1737165291386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "color" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "hex_code" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_229c1a96f14d7187fccf3684ecc" UNIQUE ("name"), CONSTRAINT "UQ_f66a71505f5898120f15ea2686a" UNIQUE ("hex_code"), CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "notes" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "password" character varying, "favoriteColorId" uuid, CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c02106f65f3c8f4b87e7a666cac" FOREIGN KEY ("favoriteColorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c02106f65f3c8f4b87e7a666cac"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "color"`);
    }

}
