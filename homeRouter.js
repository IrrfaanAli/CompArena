const { application } = require("express");
const express = require("express");
const Router = express.Router();
const homeSchema = require('../models/homeSchema');
 
Router.get("/registration", (err, res) => {
    
    res.render("registration")
 });
 Router.post ('/registration', async(req, res) =>{
    try{
        const{
            name,
            email,
            password,
            user_type,
            region,
            interest
        

        } = req.body;
      

    }
    catch(error)
    {
                 res.send(console.log("hoynai code"));
    }

 })
 module.exports = Router;
