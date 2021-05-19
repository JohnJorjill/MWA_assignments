const express = require("express");
const app = express();

app.set("port",5000);

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+port);
})