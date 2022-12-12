const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
const ejs = require("ejs");
var bodyParser = require("body-parser");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secret" }));

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.fzyor3s.mongodb.net/cmp?retryWrites=true&w=majority"
);

const cmntSchema = {
  usern: String,
  cc1: String,
  time1: String,
};

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

  cmnt: cmntSchema,
};

const eventModel = mongoose.model("Event1", eventSchema);

app.get("/", (req, res) => {
  eventModel.find({}, function (err, events) {
    res.render("participant", {
      eventList: events,
    });
  });
});

//event view code

app.get("/eventview", (req, res) => {
  var eventName1 = req.body.eventName1;
  var eventType1 = req.body.eventType1;
  var eventMode1 = req.body.eventMode1;
  var eventDetails1 = req.body.eventDetails1;
  var date1 = req.body.date1;
  var regDeadline1 = req.body.regDeadline1;
  var region1 = req.body.region1;
  var eventLink1 = req.body.eventLink1;
  var organizerName1 = req.body.organizerName1;
  var organizerEmail1 = req.body.organizerEmail1;

  eventModel.find({ eventName1: "Math" }, function (err, events) {
    res.render("eventview", {
      eventList: events,
      eventName1: eventName1,
      eventType1: eventType1,
      eventMode1: eventMode1,
      eventDetails1: eventDetails1,
      date1: date1,
      redDeadline1: regDeadline1,
      region1: region1,
      eventLink1: eventLink1,
      organizerName1: organizerName1,
      organizerEmail1: organizerEmail1,
    });
  });
});

// wishlist code

function isEventInWishlist(wishlist, eventModel) {
  for (let i = 0; i < wishlist.length; i++) {
    if (wishlist[i].eventModel == eventModel) {
      return true;
    }
  }
  return false;
}

app.get("/add_to_wishlist", function (req, res) {
  var eventName1 = req.body.eventName1;
  var eventType1 = req.body.eventType1;
  var eventMode1 = req.body.eventMode1;
  var eventDetails1 = req.body.eventDetails1;
  var date1 = req.body.date1;
  var regDeadline1 = req.body.regDeadline1;
  var region1 = req.body.region1;
  var eventLink1 = req.body.eventLink1;
  var organizerName1 = req.body.organizerName1;
  var organizerEmail1 = req.body.organizerEmail1;
  var list = {
    eventName1: eventName1,
    eventType1: eventType1,
    eventMode1: eventMode1,
    eventDetails1: eventDetails1,
    date1: date1,
    redDeadline1: regDeadline1,
    region1: region1,
    eventLink1: eventLink1,
    organizerName1: organizerName1,
    organizerEmail1: organizerEmail1,
  };

  if (req.session.wishlist) {
    var wishlist = req.session.wishlist;

    if (!isEventInWishlist(wishlist, eventModel)) {
      wishlist.push(list);
    }
  } else {
    req.session.wishlist = [wishlist];
    var wishlist = req.session.wishlist;
  }

  // return to wishlist page
  eventModel.find({}, function (err, events) {
    res.render("wishlist", {
      eventList: events,
    });
  });
});

// remove wishlist

app.post("/remove", function (req, res) {
  var wishlist = req.session.wishlist;

  for (let i = 0; i < wishlist.length; i++) {
    if (wishlist[i].eventModel == eventModel) {
      wishlist.splice(wishlist.indexOf(i), 1);
    }
  }

  res.redirect("/wishlist");
});

/*
app.post('/add_to_wishlist',(req,res)=>{
    eventModel.find({},function(err,events){
        res.render('wishlist',{
            eventList : events
        })
    })
 });
 */
app.listen(4000, function () {
  console.log("server is running");
});
