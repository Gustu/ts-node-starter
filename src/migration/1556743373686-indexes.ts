import { MigrationInterface, QueryRunner } from 'typeorm';

export class indexes1556743373686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "UQ_76d1af339ff21153b7c52bfa8ba" UNIQUE ("source")`
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "UQ_f05604ea5d74a15426885d74e27" UNIQUE ("imdb_id")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a6341c958bc0027bfb37b0f98a" ON "rating" ("movie_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f05604ea5d74a15426885d74e2" ON "movie" ("imdb_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_78bb58aecbc0e3e21ee5b81cd9" ON "comment" ("movie_id") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_78bb58aecbc0e3e21ee5b81cd9"`);
    await queryRunner.query(`DROP INDEX "IDX_f05604ea5d74a15426885d74e2"`);
    await queryRunner.query(`DROP INDEX "IDX_a6341c958bc0027bfb37b0f98a"`);
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "UQ_f05604ea5d74a15426885d74e27"`
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "UQ_76d1af339ff21153b7c52bfa8ba"`
    );
  }
}
