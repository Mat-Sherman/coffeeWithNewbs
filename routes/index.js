var express = require("express")
var router = express.Router();
var passport = require("passport")
var User = require("../models/users")






router.get("/", function(req, res){


    res.render("welcome")
});

router.get("/register", function(req, res){
    res.render("register");
    
});

router.post("/register", function(req, res){
    

       var newUser = new User({username: req.body.username});
       User.register(newUser, req.body.password, function(err, user){
           
           if (err){
               
               console.log(err)
               return res.render("register")
           }
           
           passport.authenticate("local")(req, res, function(){
               
               res.redirect("community")
               
           })
       })
       
});



router.get("/rules", function (req, res){
    // find the person with provided ID and render SHOW Template
    res.render("rules")
    
});



router.get("/faq", function(req, res){
    
    res.render("faq")
    
});


router.get("/login", function(req, res){
    
    res.render("login");
});


router.post("/login", passport.authenticate("local", 

{
    successRedirect: "/community", 
    failureRedirect: "/login"
    
    
    
}), function(req, res){
    
    passport.authenticate()
})


router.get("/logout", function(req, res){
    
    req.logout();
    res.redirect("/community")
})

function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
        
    } res.redirect("/register")
}



module.exports = router;