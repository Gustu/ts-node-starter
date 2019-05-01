import {ConnectionOptions} from 'typeorm';
const config: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: false,
    entities: [
        __dirname + '/src/entity/**.entity{.ts,.js}'
    ],
    migrations: [
        'build/migration/**/*.js'
    ],
    cli: {
        entitiesDir: './src/entity',
        migrationsDir: './src/migration'
    }
};

export default config;
