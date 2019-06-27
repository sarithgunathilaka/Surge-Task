const express = require('express')
const mongoose = require('mongoose');
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const bodyParser = require('body-parser');
const app = express()


//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.error('Connected to Mongoose Atlas'))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port}`));

//Bodyparser
app.use(bodyParser.json());

//Routes

app.use('/users', indexRouter);


//app.use('/users', userRouter);




