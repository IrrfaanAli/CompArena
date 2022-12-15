const express=require ('express');
const bodyParser=require('body-parser');
const mongoos=require('mongoose');
const model=require('../model/schema');
const Router=express.Router();


mongoos.connect("mongodb+srv://admin:admin@cluster0.fzyor3s.mongodb.net/cmp",{useNewUrlParser:true})
const db=mongoos.connection;
db.on('eror',()=>{
    console.log("Err is");
})

db.once('open',()=>{
    console.log("DB is Connected");
});

Router.get('/',(req,res)=>{
         res.render('event');
    });

    

     

var event11 =model.find({});
     
    Router.post('/create', function(req, res, next) {
      var event= new model({
        eventName1:req.body.eventName1,
        eventType1:req.body.eventType1,
        eventMode1:req.body.eventModel1,
        eventDetails1:req.body.eventDetails1,
        date1:req.body.date1,
        regDeadline1:req.body.regDeadline1,
        region1:req.body.region1,
        eventLink1:req.body.eventLink1,
        organizerName1:req.body.organizerName1,
        organizerEmail1:req.body.organizerEmail1

      })
    
      event.save(function(err,req1){
        if(err) throw err;
        event11.exec(function(err,data){
          if(err) throw err;
        //   res.render('index', { title: 'Employee Records', records:data, success:'Record Inserted Successfully' });
       res.send('Data Inserted');       
    });

      })
      
      console.log(event);
    });

   

module.exports=Router; 
