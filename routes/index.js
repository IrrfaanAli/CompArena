const express = require('express');
const router = express.Router();
const eventModel = require('../models/events');
const bodyParser=require('body-parser'); 



//Home page route
router.get('/', async (req,res)=>{

  

    eventModel.find({},function(err,events){
        res.render('participant',{
            eventList : events,
           

        })
    }).limit(9);  
 });



  // filter route
  router.post('/filter',(reg,res)=>{
    
      

    eventModel.find({region1: reg.body.part1,eventType1: reg.body.part2},
        function(err,events){
        res.render('participant',{
            eventList : events
        })
    }) 
  });

  router.get('/filter',(reg,res)=>{
   
    eventModel.find({region1: reg.body.part1,eventType1: reg.body.part2},
        function(err,events){
        res.render('participant',{
            eventList : events
        })
    }) 
}); 

 module.exports = router;