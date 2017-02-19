var mongoose = require("mongoose")


var communitySchema = new mongoose.Schema({
    
    
    name: String,
    image: String,
    email: String,
    desc: String ,
    firstName: String,
    bestWayToReachMe: String,
    favCoffeeDrink: String,
    
        
    
});

module.exports = mongoose.model("Community", communitySchema);

