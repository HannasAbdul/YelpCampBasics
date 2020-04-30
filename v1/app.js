var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/yelpcamp", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Routes
app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds", {campgrounds : allCampgrounds});
            
        }
    })
   
});


// Show form to create new campground
app.get("/campgrounds/new", function(req,res){
    res.render("new");
 })

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
    Campground.findById(req.params.id, function(err, getCampground){
        if(err){
            console.log(err)
        }else{
            // console.log(campgrounds.description);
            res.render("show", {campgrounds: getCampground});
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

})


app.listen(3000, function(){
    console.log("Yelp camp server has started");
});