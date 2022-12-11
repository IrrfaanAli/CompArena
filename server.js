const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

const indexRouter = require('./routes/index')

app.set('view engine','ejs');

mongoose.connect('mongodb+srv://admin:admin@cluster0.fzyor3s.mongodb.net/cmp?retryWrites=true&w=majority');


app.use('/',indexRouter);
app.use('/click',indexRouter);

app.listen(4000,function(){
    console.log('server is running');
})