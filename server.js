const express = require("express");
const app = express();
app.use(express.static("public"));
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const homeRouter = require('./routers/homeRouter')
const port = process.env.port || 3000;
const ejs = require('ejs');

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

 
// const db = mongoose.connection;
// db.on("error" , ()=> {console.log("not connected");})
// db.once('open',()=> {console.log("connected");})
mongoose.connect('mongodb+srv://admin:admin@cluster0.fzyor3s.mongodb.net/cmp?retryWrites=true&w=majority');


const userSchema = {
  
     
    name1: String,
    email1: String,
    pass1: String,
    usertype1: String,
    region1: String,
   interest1: String

}

const userModel = mongoose.model('user1',userSchema);



 app.get('/registration',(req,res)=>{
    userModel.insert({},function(err,users){
        res.render('registration',{
            userlist : users
        })
    })
 });

app.listen(4000,function(){
    console.log('server is running');
})


// app.use('/', homeRouter)
app.get("/registration", (req, res) => {
   console.log("here")
   res.render("registration")
});

app.get("/signin", (req, res) => {
   console.log("here")
   res.render("signin")
});
app.listen(3000);
