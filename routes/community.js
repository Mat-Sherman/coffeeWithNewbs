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
    
    
    res.render("community")
});

router.post("/community", function(req, res){
    
  var name =  req.body.name
 var image =   req.body.image
 var email = req.body.email
 var desc = req.body.desc
 var bestWayToReachMe = req.body.bestWayToReachMe
 var favCoffeeDrink = req.body.favCoffeeDrink
 var user = {
     
     id: req.user._id,
     username: req.user.username
 }
 
    var newCommunity = {name: name, image: image, email: email, desc: desc, bestWayToReachMe: bestWayToReachMe, favCoffeeDrink: favCoffeeDrink, user: user}
    
    console.log(req.user);
Community.create(newCommunity, function( err, newlyCreated) {
    
    if (err){
        
        console.log(err)
        
            } else {
                console.log(newlyCreated)
                res.redirect("/community")
            }
    })

});

router.get("/community/:id", isLoggedIn, function (req, res){
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

router.get("/community/:id/edit", function(req, res){
    
    Community.findById(req.params.id, function(err, editSomeone){
        
        if (err){
            
            res.redirect("community")
        } else {
          
                res.render("edit", {community: editSomeone});
            
        }
    })
    
    
    router.put(":id/", function( req, res ){
        
        Community.findByIdAndUpdate(req.params.id, req.body.community, function( err, editSomeone){
            if (err) {
                
                console.log(err)
            } else {
                
                res.redirect("/community/" + req.params.co)
            }
            
            
        })
    })
    

    
    // Community.findById(req.params.id, function( err, moreInfo){
    //     if (err){
            
    //         res.render("/community")
    //     } else {
            
    //         res.render("edit", {community: moreInfo}); 
    //     }
        
    // });
})

router.put("/:id", function (req, res){
    
    Community.findByIdAndUpdate(req.params.id, req.body.community, function(err, updatedInfo){
        
        if (err){
            
            res.redirect("/community")
        } else {
            
            res.redirect("/community/" + req.params.id );
        }
    })
})


function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
        
    } res.redirect("/register")
}



module.exports = router;