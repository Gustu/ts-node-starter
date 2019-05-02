import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.TEST_DB_URL,
    synchronize: false,
    entities: [
        __dirname + '/entity/**.entity{.ts,.js}'
    ],
    migrations: [
        'build/migration/**/*.js'
    ],
    cli: {
        entitiesDir: './src/entity',
        migrationsDir: './src/migration'
    }
};

export = config;
