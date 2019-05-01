require('dotenv').config();

import app from './app';

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
