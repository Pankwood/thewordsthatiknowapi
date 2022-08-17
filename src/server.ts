import mongoose from 'mongoose';
import routes from './routes';

const express = require("express");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI || "");

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.listen(5000, () => {
    console.log("Running on port 5000." + process.env);
});

// Export the Express API
module.exports = app;