const express = require('express');
const router = express.Router();
const eventModel = require('../models/events');



//Home page route
router.get('/',(req,res)=>{
    
    eventModel.find({},function(err,events){
        res.render('participant',{
            eventList : events
        })
    })
 });





router.post('/click', (req, res) => {
   
  });
        
  router.get('/click',(req,res)=>{

    if (typeof document !== "undefined") {
        const e1 = document.getElementById("region");
        var text1 = e1.options[e1.selectedIndex].text;

    }
     
    
   // var e2 = document.getElementById("type");
   // var e3 = document.getElementById("deadline");
   

  // const query = { region1: "Dhaka" };
    eventModel.find({region1: 'Dhaka'},function(err,events){
        res.render('participant',{
            eventList : events
        })
    })
 });

 module.exports = router;