import {createConnection, getConnection} from "typeorm";
import dbOptions from '../ormconfig';

export const setupTestDb = async () => {
    try {
        const options = Object.assign(dbOptions, {url: process.env.TEST_DB_URL});

        await createConnection(options);

        console.log('TEST DB connection established.');
    } catch (err) {
        console.log('Could not establish TEST DB connection.', err);
    }
};

export const clearTestDb = async () => {
    await getConnection().manager.query("truncate table movie cascade;");
}

export const setupDb = async () => {
    try {
        await createConnection(dbOptions);

        console.log('DB connection established.');
    } catch (err) {
        console.log('Could not establish DB connection.', err);
    }
};
