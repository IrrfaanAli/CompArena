const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyParser=require('body-parser'); 

const indexRouter = require('./routes/index');
app.set('view engine','ejs');

mongoose.connect('mongodb+srv://admin:admin@cluster0.fzyor3s.mongodb.net/cmp?retryWrites=true&w=majority');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',indexRouter);
app.use('/filter',indexRouter);



app.listen(4000,function(){
    console.log('server is running');
})