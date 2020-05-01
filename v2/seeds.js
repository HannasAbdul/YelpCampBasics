var mongoose  = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");


var data = [
    {
        name: "Camp Tea",
        image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547941772b72d2964a_340.jpg",
        description: "Ha ha ha"
    },
    {
        name: "Camp fire",
        image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417d2d7fdd914cc2_340.jpg",
        description: "ha ha ha"
    },
    {
        name: "Camp waters",
        image: "https://pixabay.com/get/52e3d5404957a514f1dc84609620367d1c3ed9e04e5074417d2d7fdd914cc2_340.jpg",
        description: "ha ha ha"
    }
]


function seedDB(){
    //Remove all campgrounds 
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err)
        }else{
            console.log("Campgrounds Deleted!!")
        };
        // Add new campground
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    }else{
                        console.log("New Campground added");
                        Comment.create({
                            text: "Awesome treat in the camp",
                            author: "Hannas"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment")
                            }

                        });
                    }
                })
            })
    });
   
    
}

module.exports = seedDB;