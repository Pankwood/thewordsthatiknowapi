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

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'css'],
    index: false,
    setHeaders: function (res, path, stat) {
        res.setHeader('Content-Type', 'text/css')
    }
};

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use(express.static('./', options));
app.use(express.static('./api-docs', options));
app.use(express.static('/api-docs', options));
app.use(express.static('api-docs', options));
app.use(express.static('/src/api-docs', options));
app.use(express.static('./src/api-docs', options));
app.use(express.static('public', options));
app.use(express.static('/public', options));
app.use(express.static('./public', options));
app.use(express.static('../public', options));
app.use(express.static('/public/', options));
app.use(express.static('src/public', options));
app.use(express.static('./src/public', options));
app.use(express.static('/src/public', options));
app.use(express.static('/../', options));
app.use(express.static('/../public', options));
app.use(express.static('/./swagger-ui.css', options));
app.use(express.static('/../public/swagger-ui.css', options));
app.use(express.static('/../public/swagger-ui.css', options));
app.use(express.static('/./public/swagger-ui.css', options));
app.use(express.static('/./public/swagger-ui.css', options));
app.use('/static', express.static('public', options))
app.use(express.static('*', options));
app.use(express.static('swagger-ui.css', options));
app.use(express.static('./swagger-ui.css/', options));
app.use(express.static('/./swagger-ui.css/', options));
app.use(express.static('/swagger-ui.css/', options));
app.use(express.static('/../swagger-ui.css', options));





var options2 = {
    customCssUrl: '/../swagger-ui.css'
};

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, options2));


app.listen(5000, () => {
    console.debug("Running on port 5000.");
});

// Export the Express API
module.exports = app;