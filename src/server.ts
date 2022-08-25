import mongoose from 'mongoose';
import routes from './routes';

const express = require("express");
const cors = require('cors');
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: "WordsThatIKnowMongoDB"
})
    .then(() => console.debug("Database connected!"))
    .catch(err => { console.debug(err) });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5000, () => {
    console.debug("Running on port 5000.");
});

// Export the Express API
module.exports = app;