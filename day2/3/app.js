const express = require("express");
const app = express();
const sumController = require("./controller/sumController");

app.set("port",5000);

app.get("/:x",sumController);

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+port);
})