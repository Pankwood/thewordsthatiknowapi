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
app.use(express.static("/api-docs"));

app.use(cors());
app.use(routes);

app.use('/api-docs', express.static('public'))
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));


app.listen(5000, () => {
    console.debug("Running on port 5000.");
});

// Export the Express API
module.exports = app;