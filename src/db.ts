import {createConnection, getConnection} from "typeorm";
import dbOptions from '../ormconfig';

export const setupTestDb = async () => {
    try {
        let options = Object.assign(dbOptions, {url: process.env.TEST_DB_URL});

        await createConnection(options);

        await getConnection().manager.query("truncate table movie cascade;");

        console.log('TEST DB connection established.');
    } catch (err) {
        console.log('Could not establish TEST DB connection.', err);
    }
};

export const setupDb = async () => {
    try {
        await createConnection(dbOptions);

        console.log('DB connection established.');
    } catch (err) {
        console.log('Could not establish DB connection.', err);
    }
};
