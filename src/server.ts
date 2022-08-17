import mongoose from 'mongoose';
import routes from './routes';

const express = require("express");

const app = express();
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/WordsThatIKnowMongoDB')

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.listen(5000, () => {
    console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;