const express=require ('express');
const Router=express.Router();
const bodyPasrser=require('body-parser');
Router.get('/',(req,res)=>{
         res.render('event');
    });

    Router.post('/create',(req,res)=>{
        const eventName1 =req.body.eventName1;

        console.log(eventName1);

    });

module.exports=Router;