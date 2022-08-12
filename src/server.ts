import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

mongoose.connect('mongodb://localhost:27017/WordsThatIKnowMongoDB')

app.use(express.json());
app.use(routes);

app.listen(1987, () => {
    console.log('server is listening');
});