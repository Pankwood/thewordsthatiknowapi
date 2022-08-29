import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';



const ROOT_FOLDER = path.join(__dirname, '..');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');

const app = express();

app.set('trust proxy', 1); // trust first proxy

// Security
app.use(cors());

app.use(routes);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// database
mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: "WordsThatIKnowMongoDB"
})
    .then(() => console.debug("Database connected!"))
    .catch(err => { console.debug(err) });


app.use(express.static(path.join(ROOT_FOLDER, 'build'), { index: false }));
app.use('/public', express.static(path.join(SRC_FOLDER, 'public')));
app.use('/media', express.static(path.join(ROOT_FOLDER, 'public')));


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


var options = {
    explorer: true,
    customCssUrl: '/public/swagger-ui.css'
};

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

app.listen(5000, () => {
    console.debug("Running on port 5000.");
});


export default app;
