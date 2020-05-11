var mongoose  = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");


var data = [
    {
        name: "Camp Tea",
        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Ha ha ha"
    },
    {
        name: "Camp fire",
        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "ha ha ha"
    },
    {
        name: "Camp waters",
        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "ha ha ha"
    },
    {
        name: "New found camp",
        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "A cool camp"
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