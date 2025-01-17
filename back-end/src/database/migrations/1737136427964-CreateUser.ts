import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1737136427964 implements MigrationInterface {
    name = 'CreateUser1737136427964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "favoriteColor" "public"."user_favoritecolor_enum" NOT NULL, "notes" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "password" character varying, CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
