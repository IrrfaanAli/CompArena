const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const { ObjectId } = require('mongodb');


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.urlencoded({extended:true})); 
app.use(session({secret:"secret"}));


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


//event view code 

let name = [];
let type = []
let mode = []
let details = []
let date = []
let reg = []
let region = []
let link = []
let orgName = []
let orgEmail = []


app.post('/event_view',(req,res)=>{
          
        
         const eventName1 = req.body.eventName1;
         const eventType1 = req.body.eventType1;
         const eventMode1 = req.body.eventMode1;
         const eventDetails1 = req.body.eventDetails1;
         const date1 = req.body.date1;
         const regDeadline1 =  req.body.regDeadline1;
         const region1 = req.body.region1;
         const eventLink1 = req.body.eventLink1;
         const organizerName1 = req.body.organizerName1;
         const organizerEmail1 = req.body.organizerEmail1;

        name.push(eventName1);
        type.push(eventType1);
        mode.push(eventMode1);
        details.push(eventDetails1);
        date.push(date1);
        reg.push(regDeadline1);
        region.push(region1);
        link.push(eventLink1);
        orgName.push(organizerName1);
        orgEmail.push(organizerEmail1);



        res.redirect('/eventview');
    
   
});

app.get('/eventview',(req,res)=>{
    
    
        res.render('eventview',{
                eventName1:name,
                eventType1:type,
                eventMode1:mode,
                eventDetails1:details,
                date1:date,
                regDeadline1:reg, 
                region1:region,
                eventLink1: link,
                organizerName1: orgName,
                organizerEmail1: orgEmail
           
        })

        name = []
        type = []
        mode = []
        details = []
        date = []
        reg = []
        region = []
        link = []
        orgName = []
        orgEmail = []

 });


 
 
 // wishlist code


 const wishlistschema = {

     
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

const wishlistmodel = mongoose.model('wishlist1',wishlistschema);




app.post('/add_to_wishlist',function(req,res){
         

    const wishlistdata = {
          eventName1:req.body.eventName1,
          eventType1:req.body.eventType1,
          eventMode1: req.body.eventMode1,
          eventDetails1:req.body.eventDetails1,
          date1 : req.body.date1,
          regDeadline1 : req.body.regDeadline1,
          region1 : req.body.region1,
          eventLink1 : req.body.eventLink1,
          organizerName1 : req.body.organizerName1,
          organizerEmail1 : req.body.organizerEmail1
    }

    var data  = wishlistmodel(wishlistdata);

    data.save(function(err){
         if(err){
            console.log('wishlist data entry error occured')
         }
         else{
            console.log('wishlist data added')
         }
    })

    res.redirect('/wishlist');
    
});

//wishlist view 
app.get('/wishlist',(req,res)=>{
    wishlistmodel.find({},function(err,events){
        res.render('wishlist',{
            eventList : events
        })
    })
 });

// wishlist remove 
app.post('/remove/:name',(req,res)=>{
   wishlistmodel.findByIdAndDelete(req.params.name, function(err,events){
       if(err){
        res.redirect('/wishlist');
       }
       else{
        res.redirect('/wishlist');
       }
   })
 });