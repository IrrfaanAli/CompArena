const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema( {
  
     
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

});

const eventModel = mongoose.model('Event1',eventSchema);

module.exports = eventModel;