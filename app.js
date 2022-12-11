const express=require('express');
const mongoos=require('mongoose');
const bodyPasrser=require('body-parser');
const app=express();
const homeRoutes=require('./routers/home');
const port = process.env.port || 8000;

mongoos.connect("mongodb://127.0.0.1:27017/cmp",{useNewUrlParser:true})
const db=mongoos.connection;
db.on('eror',()=>{
    console.log("Err is");
})

db.once('open',()=>{
    console.log("DB is Connected");
});

// app.get('/',(req,res)=>{
//     res.send("Hello");
// });

app.set('view engine','ejs');
app.use(express.static('public')); 

app.use('/' , homeRoutes);

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.listen(port); 

