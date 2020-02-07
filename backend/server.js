const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use(cors());
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

if (process.env.NODE_ENV === "production") {
    app.use(express.static('build'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}.`);
});