const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine','ejs');

mongoose.connect('mongodb+srv://admin:admin@cluster0.fzyor3s.mongodb.net/cmp?retryWrites=true&w=majority');


const eventSchema = {
  
     
    eventName1: String,

    eventType1: String,

    eventMode1: String,

    eventDetails1: String,

    date1: String,

    regDeadline1: String,

    region1: String,

    eventLink1: String,

    organizerName1: String,

    organizerEmail1: String

}

const eventModel = mongoose.model('Event1',eventSchema);



 app.get('/',(req,res)=>{
    eventModel.find({},function(err,events){
        res.render('participant',{
            eventList : events
        })
    })
 });

app.listen(4000,function(){
    console.log('server is running');
})