var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var app = express();
var methodOverride = require("method-override")
var passport =  require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/users")


var communityRoutes = require("./routes/community")
var indexRoutes = require("./routes/index")


//mongoose.connect("mongodb://localhost/help_a_newbie");
mongoose.connect("mongodb://Mat_Sherman:Barnum12!@ds151289.mlab.com:51289/coffeewithanewb");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));


/*var communitySchema = new mongoose.Schema({
    
    
    name: String,
    image: String,
    email: String,
    desc: String ,
    firstName: String,
    bestWayToReachMe: String,
    favCoffeeDrink: String
});

*/

//var Community = mongoose.model("Community", communitySchema);

    
app.use(require("express-session")({
    
    
    secret: "#yesphx",
    resave: false,
    saveUninitialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy( User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    
    res.locals.currentUser = req.user;
    next();
});

// ROutes
/*
app.get("/", function(req, res){
    

    res.render("welcome")
});

 app.get("/nextsteps", function(req, res) {
    
    
    res.render("nextsteps")
})

app.get("/community", function(req, res){
    

    
    Community.find({}, function(err, allCommunity){
        
        if (err){
            
            console.log("error for now")
        } else {
            
            res.render("index", {community: allCommunity, currentUser: req.user});
        }
        
    })


// 

});

app.get("/community/new", isLoggedIn,  function(req, res){
    
    
    res.render("new.ejs")
})

app.post("/community", function(req, res){
    
  var name =  req.body.name
 var image =   req.body.image
 var email = req.body.email
 var desc = req.body.desc
 var bestWayToReachMe = req.body.bestWayToReachMe
 var favCoffeeDrink = req.body.favCoffeeDrink
 
    var newCommunity = {name: name, image: image, email: email, desc: desc, bestWayToReachMe: bestWayToReachMe, favCoffeeDrink: favCoffeeDrink}
Community.create(newCommunity, function( err, newlyCreated) {
    
    if (err){
        
        console.log(err)
        
            } else {
                
                res.redirect("/community")
            }
    })

});

app.get("/community/:id", isLoggedIn, function (req, res){
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

app.get("/community/:id/edit", function(req, res){
    
    Community.findById(req.params.id, function( err, moreInfo){
        if (err){
            
            res.render("/community")
        } else {
            
            res.render("edit", {community: moreInfo}); 
        }
        
    });
})

app.put("/:id", function (req, res){
    
    Community.findByIdAndUpdate(req.params.id, req.body.community, function(err, updatedInfo){
        
        if (err){
            
            res.redirect("/community")
        } else {
            
            res.redirect("/community/" + req.params.id );
        }
    })
})

// update campgrounf


app.get("/rules", function (req, res){
    // find the person with provided ID and render SHOW Template
    res.render("rules")
    
});



// AUTH Routes


app.get("/register", function(req, res){
    res.render("register");
    
});

app.post("/register", function(req, res){
    

       var newUser = new User({username: req.body.username});
       User.register(newUser, req.body.password, function(err, user){
           
           if (err){
               
               console.log(err)
               return res.render("register")
           }
           
           passport.authenticate("local")(req, res, function(){
               
               res.redirect("rules")
               
           })
       })
       
});



app.get("/faq", function(req, res){
    
    res.render("faq")
    
});


app.get("/login", function(req, res){
    
    res.render("login");
});


app.post("/login", passport.authenticate("local", 

{
    successRedirect: "/community", 
    failureRedirect: "/login"
    
    
    
}), function(req, res){
    
    passport.authenticate()
})


app.get("/logout", function(req, res){
    
    req.logout();
    res.redirect("/community")
})

function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
        
    } res.redirect("/register")
}


*/
app.use(indexRoutes);
app.use(communityRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The server is up lets gooooo");
});