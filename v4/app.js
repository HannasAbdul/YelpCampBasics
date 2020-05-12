var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var seedDB = require("./seeds");
mongoose.connect("mongodb://127.0.0.1:27017/yelpcamp_v2", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

seedDB();

// Routes
app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/campgrounds", {campgrounds : allCampgrounds});
            
        }
    })
   
});


// Show form to create new campground
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
 })
// Create a New Campground
app.post("/campgrounds", function(req, res){
    // get the data from our form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            //redirect back to campground page
            res.redirect("/campgrounds");
        }
    })
});
//show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, getCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/show", {campgrounds: getCampground});
        }
    });
})
// Edit route

app.get("/campgrounds/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("edit", {campgrounds: foundCampground});
        }
    })

});

//================comment routes===========
// Create a comment form for a particular campground
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campgroundId){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campgrounds: campgroundId})
        }
    })
   
});
// Create a new comment 
app.post("/campgrounds/:id/comments", function(req,res){
  Campground.findById(req.params.id, function(err, campgrounds){
      if(err){
          console.log(err);
          res.redirect("/campgrounds")
      }else{
          Comment.create(req.body.comment, function(err,comment){
            if(err){
                console.log(err);
                res.redirect("/campgrounds")
            }else{
                campgrounds.comments.push(comment);
                campgrounds.save();
                res.redirect("/campgrounds/" + campgrounds._id);
            }
          })
      }
  })
})


app.listen(3000, function(){
    console.log("Yelp camp server has started");
});