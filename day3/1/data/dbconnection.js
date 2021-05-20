const MongoClient = require("mongodb").MongoClient;
const dbName = "meanGames";
const dburl = "mongodb://localhost:27017/"+dbName;
var __connection = null;

const open = function(){
    MongoClient.connect(dburl, {useUnifiedTopology:true}, 
        function(err,client){
            if(err){
                console.log("connection failed");
                return;
            }
            __connection = client.db(dbName);
            console.log("DB connection open",__connection);
    })
}

const get = function(){
    return __connection;
}

module.exports = {
    open: open,
    get: get
}