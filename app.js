var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var app = express();


mongoose.connect("mongodb://localhost/help_a_newbie");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



var communitySchema = new mongoose.Schema({
    
    
    name: String,
    image: String,
    email: String,
    description: String 
});

var Community = mongoose.model("Community", communitySchema);



    
    
    




// ROutes

app.get("/", function(req, res){
     
    res.render("welcome")
})

app.get("/community", function(req, res){
    
    Community.find({}, function(err, allCommunity){
        
        if (err){
            
            console.log("error for now")
        } else {
            
            res.render("index", {community: allCommunity});
        }
        
    })


// 

});

app.get("/community/new", function(req, res){
    
    
    res.render("new.ejs")
})

app.post("/community", function(req, res){
    
  var name =  req.body.name
 var image =   req.body.image
 var email = req.body.email
 
    var newCommunity = {name: name, image: image, email: email}
Community.create(newCommunity, function( err, newlyCreated) {
    
    if (err){
        
        console.log(err)
        
            } else {
                
                res.redirect("/community")
            }
    })

});

app.get("/community/:id", function (req, res){
    
    res.render ("show");
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The server is up lets gooooo");
});