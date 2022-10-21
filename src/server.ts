import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';

const express = require("express");
const app = express();

const ROOT_FOLDER = path.join(__dirname, '..');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: process.env.MONGODB_NAME
})
    .then(() => console.debug("Database connected! DBName: " + process.env.MONGODB_NAME))
    .catch(err => { console.debug(err) });

const fs = require('fs');
const fileName = './swagger.json';
const file = require(fileName);

if (file && file.host)
    file.host = process.env.SWAGGER_HOST || "";

if (file && file.schemes)
    file.schemes[0] = process.env.SWAGGER_SCHEME || "";

fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err)
        return console.log(err);
    console.debug('Updated swagger.json');
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const options = {
    customCssUrl: '/public/swagger-ui.css',
    customSiteTitle: 'The Words That I Know API - Swagger',
    basicAuth: {
        name: 'Authorization',
        schema: {
            type: 'basic',
            in: 'header'
        },
        value: 'Basic <user:password>'
    }
};

app.use('/public', express.static(path.join(SRC_FOLDER, 'public')));
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument, options));

app.listen(process.env.PORT, () => {
    console.debug("Access it at: http://localhost:" + process.env.PORT);
});

export default app;