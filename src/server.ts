import mongoose from 'mongoose';
import routes from './routes';
import bodyParser from 'body-parser';
import path from 'path';



const ROOT_FOLDER = path.join(__dirname, '..');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');

const express = require("express");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const cors = require('cors');


mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: "WordsThatIKnowMongoDB"
})
    .then(() => console.debug("Database connected!"))
    .catch(err => { console.debug(err) });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(ROOT_FOLDER, 'build'), { index: false }));
app.use('/static', express.static(path.join(SRC_FOLDER, 'public')));
app.use('/media', express.static(path.join(ROOT_FOLDER, 'uploads')));

app.use(cors());
app.use(routes);


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


var options = {
    customCssUrl: '/../swagger-ui.css'
};

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, options));


app.listen(5000, () => {
    console.debug("Running on port 5000.");
});

// Export the Express API
module.exports = app;