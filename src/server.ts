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
    dbName: "WordsThatIKnowMongoDB"
})
    .then(() => console.debug("Database connected!"))
    .catch(err => { console.debug(err) });

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const options = { customCssUrl: '/public/swagger-ui.css', customSiteTitle: "The Words That I Know API - Swagger" };

app.use('/public', express.static(path.join(SRC_FOLDER, 'public')));
app.use('/', swaggerUi.serve);
app.get('/', function (req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serveFiles(swaggerDocument, options), swaggerUi.setup());

app.listen(5000, () => {
    console.debug("Running on port 5000.");
});

export default app;