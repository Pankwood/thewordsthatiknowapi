import mongoose from 'mongoose';
import routes from './routes';
import path from 'path';
import bodyParser from 'body-parser';


const express = require("express");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const cors = require('cors');
const ROOT_FOLDER = path.join(__dirname, '..');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');

mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: "WordsThatIKnowMongoDB"
})
    .then(() => console.debug("Database connected!"))
    .catch(err => { console.debug(err) });

app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(routes);

app.use('/public', express.static(path.join(SRC_FOLDER, 'public')));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
    customCssUrl: '/public/swagger-ui.css'
};

app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
);

app.listen(5000, () => {
    console.debug("Running on port 5000.");
});

// Export the Express API
module.exports = app;