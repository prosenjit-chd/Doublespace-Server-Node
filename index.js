const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const projectRouter = require('./src/routers/projects')
const reviewRouter = require('./src/routers/review')
const teams = require('./src/routers/team')
const utilities = require('./src/routers/utilities')

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.use('/api', projectRouter);
app.use('/api', reviewRouter);
app.use('/api', teams);
app.use('/api', utilities);

const DatabaseName = "Doublespace";
const mongoString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ocrjv.mongodb.net/${DatabaseName}?retryWrites=true&w=majority`;
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})

app.get('/', (req, res) => {
    res.send('Doublespace Server is running successfully');
});