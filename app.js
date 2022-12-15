const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const app=express();
const homeRoutes=require('./routers/home');
const port = process.env.port || 8000;



// app.get('/',(req,res)=>{
//     res.send("Hello");
// });

app.set('view engine','ejs');
app.use(express.static('public')); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
//   })

app.use('/' , homeRoutes);




app.listen(port); 

