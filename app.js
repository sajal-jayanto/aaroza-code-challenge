const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();


mongoose.connect('mongodb+srv://jayanto:jayanto123456789@cluster0-1srbn.mongodb.net/test?retryWrites=true&w=majority', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, () => {
    console.log('Connnected to mongo DB...');
});


app.use(express.json());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/api', indexRouter);
app.use('/api/user', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`The server is running at port ${PORT}...`);
});



