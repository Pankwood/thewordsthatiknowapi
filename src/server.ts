import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';


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
    console.log('server is listening');
});

export default app;