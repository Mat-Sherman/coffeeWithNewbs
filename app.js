var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var app = express();
var passport =  require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/users")


//mongoose.connect("mongodb://localhost/help_a_newbie");
mongoose.connect("mongodb://Mat_Sherman:Barnum12!@ds151289.mlab.com:51289/coffeewithanewb");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



var communitySchema = new mongoose.Schema({
    
    
    name: String,
    image: String,
    email: String,
    desc: String 
});

var Community = mongoose.model("Community", communitySchema);



    
    
    
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

app.get("/", function(req, res){
    
    
    
     
    res.render("welcome")
});

app.get("/nextsteps", function(req, res) {
    
    
    var helper = require('sendgrid').mail;
  
var from_email = new helper.Email("shermanmat1@gmail.com");
var to_email = new helper.Email("mat.sherman@helloendless.com");
var subject = "Sending with SendGrid is Fun";
var content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js");
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
})
    
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
 
    var newCommunity = {name: name, image: image, email: email, desc: desc}
Community.create(newCommunity, function( err, newlyCreated) {
    
    if (err){
        
        console.log(err)
        
            } else {
                
                res.redirect("/community")
            }
    })

});

app.get("/community/:id", function (req, res){
    
    res.render ("/login");
});


app.get("/rules", function (req, res){
    
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

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The server is up lets gooooo");
});