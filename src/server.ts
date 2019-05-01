import {setupDb} from "./db";

import app from './app';

app.listen(3000, async () => {
    await setupDb();
    console.log('App listening on port 3000!');
});
