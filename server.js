const multer = require('multer');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
const ejs = require("ejs");
var bodyParser = require("body-parser");
const session = require("express-session");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static('uploads'));
app.use(session({ secret: "secret" }));
var md5 = require('js-md5');
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


const eventSchema = {
  eventName1: String,

  eventType1: String,

  eventMode1: String,

  eventDetails1: String,

  date1: String,

  regDeadline1: String,

  region1: String,

  eventLink1: String,

  organizerName1: String,

  organizerEmail1: String,

  image1: String,
};


const eventModel = mongoose.model("Event1", eventSchema);


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");

  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const maxSize = 1 * 1024 * 1024;
var upload = multer({
  storage: storage,

}).single("image1");

//Home page route
app.get('/', async (req, res) => {

  eventModel.find({}, function (err, events) {
    res.render('participant', {
      eventList: events,
    })
  }).limit(9);
});
app.get('/h', async (req, res) => {

  eventModel.find({}, function (err, events) {
    res.render('host', {
      eventList: events,
    })
  }).limit(9);
});

// filter route
app.get('/filter', (req, res) => {
  var r = req.query.regionbased;

  if (req.query.genre === 'Type' && req.query.regionbased !== 'Region') {
    eventModel.find({ region1: r },
      function (err, events) {
        res.render('participant', {
          eventList: events
        })
      })
  }
  else if (req.query.regionbased === 'Region' && req.query.genre !== 'Type') {
    eventModel.find({ eventType1: req.query.genre },
      function (err, events) {
        res.render('participant', {
          eventList: events
        })
      })
  }
  else {
    res.redirect('/');
  }
});

//search
app.get("/s", (req, res) => {
  var sname = req.query.name;
  eventModel.find({ eventName1: { '$regex': sname, '$options': 'i' } }, function (err, events) {
    res.render("search", {
      eventList: events,
    });
  });
});
app.get("/s2", (req, res) => {
  var sname = req.query.name;
  eventModel.find({ eventName1: { '$regex': sname, '$options': 'i' } }, function (err, events) {
    res.render("search2", {
      eventList: events,
    });
  });
});

app.get('/events', (req, res) => {
  res.render('event');
});

var eM = eventModel.find({});

app.post('/create', upload, function (req, res) {
  const event = new eventModel({
    eventName1: req.body.eventName1,
    eventType1: req.body.eventType1,
    eventMode1: req.body.eventModel1,
    eventDetails1: req.body.eventDetails1,
    date1: req.body.date1,
    regDeadline1: req.body.regDeadline1,
    region1: req.body.region1,
    eventLink1: req.body.eventLink1,
    organizerName1: req.body.organizerName1,
    organizerEmail1: req.body.organizerEmail1,
    image1: req.file.filename,

  })

  event.save(function (err, req1) {
    if (err) throw err;
    eM.exec(function (err, data) {
      if (err) throw err;
      //   res.render('index', { title: 'Employee Records', records:data, success:'Record Inserted Successfully' });
      res.redirect('/h');
    });

  })

  console.log(event);
});


//reg-login
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

  userModel.create({ name1: name1, email1: email1, pass1: pass1, usertype1: usertype1, rgeion1: region1, interest1: interest1 }, function (err, users) {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect('/login');
    }

  });
});

//id-fetch




app.get('/abc', function (req, res, next) {

  console.log(req.session.email1);
});






app.get('/login', function (req, res) {

  res.render("Signin");


});
app.post('/login', function (req, res) {

  var email1 = req.body.email1;
  var pass1 = md5(req.body.pass1);
  req.session.email1 = email1;
  var usertype1 = req.body.usertype1;

  userModel.findOne({ email1: email1 }, (err, result) => {
    if (email1 === result.email1 && pass1 === result.pass1 && result.usertype1 == 'participant') {
      if (req.session.user = result._id) {

        res.redirect('/');
      }
      else {
        res.redirect('/reg');
      }
    }
    else if (email1 === result.email1 && pass1 === result.pass1 && result.usertype1 == 'host') {
      if (req.session.user = result._id) {

        res.redirect('/h');
      }
      else {
        res.redirect('/reg');
      }
    }
    else if (email1 === result.email1 && pass1 === result.pass1 && result.usertype1 == 'admin') {
      if (req.session.user = result._id) {

        res.redirect('/dashboard');
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
app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect('/');
    }
  })
})


app.get("/ea", (req, res) => {
  eventModel.find({}, function (err, events) {
    res.render("eventadmin", {
      eventList: events,
    });
  });
});







//admin
app.get("/dashboard", async (req, res) => {

  const count1 = await eventModel.find().count();
  const count2 = await userModel.find().count();

  const display1 = eventModel.find().limit(5);

  const [count, countuser, display] = await Promise.all([count1, count2, display1]);

  eventModel.find({}, function (err, events) {
    res.render("dashboard_admin", {
      eventList: events,
      count1: count,
      count2: countuser,
      display1: display
    });
  })
})



app.get("/update_event/:id", (req, res) => {

  eventModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, events) {
    res.render("eventupdate", {
      eventList: events,
    });
  });
});

app.post("/update_event/:id", (req, res) => {

  eventModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, events) {
    if (err) console.log(err);
    res.redirect('/ea');
  });
});

app.get("/delete_event/:id", (req, res) => {

  eventModel.findByIdAndDelete({ _id: req.params.id }, { new: true }, function (err, events) {
    if (err) console.log(err);
    res.redirect('/ea');
  });
});



app.get("/ua", (req, res) => {
  userModel.find({}, function (err, users) {
    res.render("useradmin", {
      userList: users,
    });
  });
});


app.get("/update_user/:id", (req, res) => {

  userModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, users) {
    res.render("userupdate", {
      userList: users,
    });
  });
});

app.post("/update_user/:id", (req, res) => {

  userModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, users) {
    if (err) console.log(err);
    res.redirect('/ua');
  });
});

app.get("/delete_user/:id", (req, res) => {

  userModel.findByIdAndDelete({ _id: req.params.id }, { new: true }, function (err, users) {
    if (err) console.log(err);
    res.redirect('/ua');
  });
});


let image = []
let name = []
let type = []
let mode = []
let details = []
let date = []
let reg = []
let region = []
let link = []
let orgName = []
let orgEmail = []


app.post('/event_view', (req, res) => {

  const image1 = req.body.image1;
  const eventName1 = req.body.eventName1;
  const eventType1 = req.body.eventType1;
  const eventMode1 = req.body.eventMode1;
  const eventDetails1 = req.body.eventDetails1;
  const date1 = req.body.date1;
  const regDeadline1 = req.body.regDeadline1;
  const region1 = req.body.region1;
  const eventLink1 = req.body.eventLink1;
  const organizerName1 = req.body.organizerName1;
  const organizerEmail1 = req.body.organizerEmail1;

  image.push(image1);
  name.push(eventName1);
  type.push(eventType1);
  mode.push(eventMode1);
  details.push(eventDetails1);
  date.push(date1);
  reg.push(regDeadline1);
  region.push(region1);
  link.push(eventLink1);
  orgName.push(organizerName1);
  orgEmail.push(organizerEmail1);


  res.redirect('/eventview');


});

app.get('/eventview', (req, res) => {


  res.render('eventview', {
    image1: image,
    eventName1: name,
    eventType1: type,
    eventMode1: mode,
    eventDetails1: details,
    date1: date,
    regDeadline1: reg,
    region1: region,
    eventLink1: link,
    organizerName1: orgName,
    organizerEmail1: orgEmail,
    image1: image


  })

  image = []
  name = []
  type = []
  mode = []
  details = []
  date = []
  reg = []
  region = []
  link = []
  orgName = []
  orgEmail = []

});




// wishlist code


const wishlistschema = {

  image1: String,

  eventName1: String,

  eventType1: String,

  eventMode1: String,

  eventDetails1: String,

  date1: String,

  regDeadline1: String,

  region1: String,

  eventLink1: String,

  organizerName1: String,

  organizerEmail1: String,

  user_email: String

}

const wishlistmodel = mongoose.model('wishlist1', wishlistschema);


app.get('/t', function (req, res) {
  userModel.aggregate([
    { "$group": { "_id": "$interest1", "count": { "$sum": 1 } } },
    { "$match": { "_id": { "$ne": null }, "count": { "$gt": 1 } } },
    { "$project": { "name": "$_id", "_id": 0 } }
  ])
})

app.post('/add_to_wishlist', function (req, res) {


  const wishlistdata = {
    image1: req.body.image1,
    eventName1: req.body.eventName1,
    eventType1: req.body.eventType1,
    eventMode1: req.body.eventMode1,
    eventDetails1: req.body.eventDetails1,
    date1: req.body.date1,
    regDeadline1: req.body.regDeadline1,
    region1: req.body.region1,
    eventLink1: req.body.eventLink1,
    organizerName1: req.body.organizerName1,
    organizerEmail1: req.body.organizerEmail1,
    user_email: req.session.email1
  }

  var data = wishlistmodel(wishlistdata);


  data.save(function (err) {
    if (err) {
      console.log('wishlist data entry error occured')
    }
    else {
      console.log('wishlist data added')
    }
  })

  res.redirect('/wishlist');

});

//wishlist view 
app.get('/wishlist', (req, res) => {
  wishlistmodel.find({ user_email: req.session.email1 }, function (err, events) {
    res.render('wishlist', {
      eventList: events
    })
  })
});

// wishlist remove 
app.post('/remove/:name', (req, res) => {
  wishlistmodel.findByIdAndDelete(req.params.name, function (err, events) {
    if (err) {
      res.redirect('/wishlist');
    }
    else {
      res.redirect('/wishlist');
    }
  })
});



app.listen(4000, function () {
  console.log("server is running");
});