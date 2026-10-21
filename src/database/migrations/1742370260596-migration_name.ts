import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationName1742370260596 implements MigrationInterface {
  name = 'PlatesInfo1742370260596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "plates"`);
    await queryRunner.query(
      `CREATE TABLE "plates"."plates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameCar" character varying NOT NULL, "WordPlates" character varying NOT NULL, "NumPlates" integer NOT NULL, "CreatedAt" TIMESTAMP WITH TIME ZONE, "ValidUntil" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_f51bf73eea2f292b65ffe776746" UNIQUE ("WordPlates"), CONSTRAINT "UQ_55e38981e4c87f00ca7098c87d2" UNIQUE ("NumPlates"), CONSTRAINT "PK_9a8950ff576a33188d5afcbdbe6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "plates"."plates"`);
  }
}
