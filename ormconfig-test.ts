import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.TEST_DB_URL,
    synchronize: false,
    entities: [
        __dirname + '/src/entity/**.entity{.ts,.js}'
    ],
    migrations: [
        'build/src/migration/*.js'
    ],
    cli: {
        entitiesDir: './src/entity',
        migrationsDir: './src/migration'
    }
};

export = config;
