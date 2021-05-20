const express = require("express");
const app = express();
const routes = require("./routes/router");
require("./data/dbconnection").open();

app.set("port",3000);

app.use("/api",routes);

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+port);
})