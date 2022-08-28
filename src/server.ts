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

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use(express.static('./'));
app.use(express.static('./api-docs'));
app.use(express.static('/api-docs'));
app.use(express.static('api-docs'));
app.use(express.static('/src/api-docs'));
app.use(express.static('./src/api-docs'));
app.use(express.static('public'));
app.use(express.static('/public'));
app.use(express.static('./public'));
app.use(express.static('../public'));
app.use(express.static('/public/'));
app.use(express.static('src/public'));
app.use(express.static('./src/public'));
app.use(express.static('/src/public'));




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