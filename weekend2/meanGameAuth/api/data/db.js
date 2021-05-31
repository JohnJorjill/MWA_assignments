const mongoose = require("mongoose");
const dbName = "meanGames";
const dbURL = "mongodb://localhost:27017/"+dbName;
// require all models
require("./games-model");
require("./users-model");

mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology:true})

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected");
        process.exit(0);
    })
});

mongoose.connection.on("connected",function(){
    console.log("Connected to"+dbURL);
})

mongoose.connection.on("disconnected",function(){
    console.log("disconnected to"+dbURL);
})

mongoose.connection.on("error",function(){
    console.log("Error"+dbURL);
})