const express = require('express');
const router = express.Router();
const eventModel = require('../models/events');
const bodyParser=require('body-parser'); 



//Home page route
router.get('/',(req,res)=>{

    eventModel.find({},function(err,events){
        res.render('participant',{
            eventList : events
        })
    })  
 });

  // filter route
  router.post('/filter',(reg,res)=>{
    
      //var time = reg.body.part3;

    eventModel.find({region1: reg.body.part1,eventType1: reg.body.part2},
        function(err,events){
        res.render('participant',{
            eventList : events
        })
    }) 
  })

  router.get('/filter',(reg,res)=>{
   
    
}); 

 module.exports = router;