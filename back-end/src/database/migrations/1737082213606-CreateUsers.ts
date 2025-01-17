import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1737082213606 implements MigrationInterface {
    name = 'CreateUsers1737082213606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_favoritecolor_enum" AS ENUM('red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "favoriteColor" "public"."user_favoritecolor_enum" NOT NULL, "notes" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_favoritecolor_enum"`);
    }

}
