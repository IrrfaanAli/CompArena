const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
const ejs = require("ejs");
var bodyParser = require("body-parser");
const session = require("express-session");
var md5 = require('md5');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));


mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.fzyor3s.mongodb.net/cmp?retryWrites=true&w=majority"
);


const userSchema = {
  name1: String,
  email1: String,
  pass1: String,
  usertype1: String,
  region1: String,
  interest1: String
};

const userModel = mongoose.model("user1", userSchema);

app.get('/reg', function (req, res) {
  res.render('registration');
});

app.post('/reg', function (req, res) {
  var name1 = req.body.name1;
  var email1 = req.body.email1;
  var pass1 = md5(req.body.pass1);
  var usertype1 = req.body.usertype1;
  var region1 = req.body.region1;
  var interest1 = req.body.interest1;

  userModel.create({ name1: name1, email1: email1, pass1: pass1, usertype1: usertype1, region1: region1, interest1: interest1 }, function (err, users) {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect('/login');
    }

  });
});



app.get('/login', function (req, res) {

  res.render("Signin");


});
app.post('/login', function (req, res) {

  var email1 = req.body.email1;
  var pass1 = md5(req.body.pass1);

  var usertype1 = req.body.usertype1;

  userModel.findOne({ email1: email1 }, (err, result) => {
    if (email1 === result.email1 && pass1 === result.pass1 && result.usertype1 == 'participant') {
      if (req.session.user = result._id) {

        res.redirect('/userprofile');
      }
      else {
        res.redirect('/reg');
      }
    }
    else if (email1 === result.email1 && pass1 === result.pass1 && result.usertype1 == 'host') {
      if (req.session.user = result._id) {

        res.redirect('/userprofile');
      }
      else {
        res.redirect('/reg');
      }
    }
    else if (email1 === result.email1 && pass1 === result.pass1 && result.usertype1 == 'admin') {
      if (req.session.user = result._id) {

        res.redirect('/userprofile');
      }
      else {
        res.redirect('/reg');
      }
    }


    else {
      res.send('Invalid email or password');
    }
  })

})
app.get('/userprofile', async function (req, res) {
  if (req.session.user) {
    const userdata = await userModel.findById({ _id: req.session.user });

    res.render('userprofile', { user: userdata });

  }
  else {
    res.render('invalid')
  }
})
app.get('/editprofile', async function (req, res) {
  if (req.session.user) {
    const id = req.query.id;
    const userdata = await userModel.findById({ _id: id });


    res.render('edit', { user: userdata });
  }


  else {
    res.render('invalid')
  }

})

app.post('/update', async function (req, res) {
  if (req.session.user) {
    
    const userdata = await userModel.findByIdAndUpdate({ _id: req.session.user },{$set:{name1: req.body.name1, email1:req.body.email1,  usertype1:req.body.usertype1, region1: req.body.region1, interest1: req.body.interest1}});
    res.redirect('/userprofile');
    

  }
  else {
    res.render('invalid')
  }
})

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect('/login')
    }
  })
})




app.listen(4000, function () {
  console.log("server is running");
});

