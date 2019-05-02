import {MigrationInterface, QueryRunner} from "typeorm";

export class ratingIndex1556834877355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "UQ_76d1af339ff21153b7c52bfa8ba"`);
        await queryRunner.query(`CREATE INDEX "IDX_562c0de1249cd2e42898e5ae04" ON "rating" ("movie_id", "source") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "UQ_76d1af339ff21153b7c52bfa8ba" UNIQUE ("source")`);
        await queryRunner.query(`DROP INDEX "IDX_562c0de1249cd2e42898e5ae04"`);
    }

}
