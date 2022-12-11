const mongoose=require('mongoose');
const schema=mongoose.Schema;
const eventSchema=new mongoose.Schema({
    eventName1:String,
    eventType1:String,
    eventMode1:String,
    eventDetails1:String,
    date1:{
        type:Date,
        default:Date.now()
    },
    regDeadline1:Date,
    region1:String,
    eventLink1:String,
    organizerName1:String,
    organizerEmail1:String

});
module.exports=mongoose.model('event1',eventSchema)