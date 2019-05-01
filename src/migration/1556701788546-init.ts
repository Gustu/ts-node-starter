import {MigrationInterface, QueryRunner} from "typeorm";

export class init1556701788546 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "rating"
                                 (
                                     "rating_id" SERIAL            NOT NULL,
                                     "movie_id"  integer           NOT NULL,
                                     "source"    character varying NOT NULL,
                                     "value"     character varying NOT NULL,
                                     CONSTRAINT "PK_1ba02007f1315301d9553a6839a" PRIMARY KEY ("rating_id")
                                 )`);
        await queryRunner.query(`CREATE TABLE "movie"
                                 (
                                     "movie_id"    SERIAL            NOT NULL,
                                     "imdb_id"     character varying NOT NULL,
                                     "title"       character varying,
                                     "year"        integer,
                                     "released"    TIMESTAMP,
                                     "runtime"     character varying,
                                     "genre"       character varying,
                                     "director"    character varying,
                                     "writer"      character varying,
                                     "actors"      character varying,
                                     "plot"        character varying,
                                     "language"    character varying,
                                     "country"     character varying,
                                     "awards"      character varying,
                                     "poster"      character varying,
                                     "metascore"   integer,
                                     "imdb_rating" numeric(2, 1),
                                     "imdb_votes"  integer,
                                     "type"        character varying,
                                     "dvd"         TIMESTAMP,
                                     "box_office"  character varying,
                                     "production"  character varying,
                                     "website"     character varying,
                                     CONSTRAINT "PK_f38244c6e76d8e50e1a590f6744" PRIMARY KEY ("movie_id")
                                 )`);
        await queryRunner.query(`CREATE TABLE "comment"
                                 (
                                     "comment_id" SERIAL            NOT NULL,
                                     "movie_id"   integer           NOT NULL,
                                     "username"   character varying NOT NULL,
                                     "message"    character varying NOT NULL,
                                     CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a" PRIMARY KEY ("comment_id")
                                 )`);
        await queryRunner.query(`ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a6341c958bc0027bfb37b0f98a4" FOREIGN KEY ("movie_id") REFERENCES "movie" ("movie_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment"
            ADD CONSTRAINT "FK_78bb58aecbc0e3e21ee5b81cd9a" FOREIGN KEY ("movie_id") REFERENCES "movie" ("movie_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment"
            DROP CONSTRAINT "FK_78bb58aecbc0e3e21ee5b81cd9a"`);
        await queryRunner.query(`ALTER TABLE "rating"
            DROP CONSTRAINT "FK_a6341c958bc0027bfb37b0f98a4"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
