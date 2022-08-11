import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is working!");
});

app.listen(1987, () => {
    console.log('server is listening');
});