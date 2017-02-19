var express = require("express")
var router = express.Router();
var Community = require("../models/index")





router.get("/nextsteps", function(req, res) {
    
    
    res.render("nextsteps")
})

router.get("/community", function(req, res){
    

    
    Community.find({}, function(err, allCommunity){
        
        if (err){
            
            console.log("error for now")
        } else {
            
            res.render("index", {community: allCommunity, currentUser: req.user});
        }
        
    })


// 

});

router.get("/community/new", isLoggedIn,  function(req, res){
    
    
    res.render("new.ejs")
})

router.post("/community", function(req, res){
    
  var name =  req.body.name
 var image =   req.body.image
 var email = req.body.email
 var desc = req.body.desc
 
    var newCommunity = {name: name, image: image, email: email, desc: desc}
Community.create(newCommunity, function( err, newlyCreated) {
    
    if (err){
        
        console.log(err)
        
            } else {
                
                res.redirect("/community")
            }
    })

});

router.get("/community/:id", function (req, res){
    Community.findById(req.params.id, function(err, moreInfo) {
        
        if(err){
            
            console.log(err)
            
        } else {
            
            res.render("show", {community: moreInfo});
        }
        
    })
  //  req.params.id
    
});

//edit campgrounds







// update campgrounf


router.get("/rules", function (req, res){
    // find the person with provided ID and render SHOW Template
    res.render("rules")
    
});


function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
        
    } res.redirect("/register")
}




module.exports = router;