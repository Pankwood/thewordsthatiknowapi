import mongoose from 'mongoose';
import routes from './routes';

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

app.use(express.json());
app.use(cors());
app.use(routes);

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');

var options = {
    customCssUrl: '../custom-swagger-ui.css'
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