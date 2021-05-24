const express = require("express");
const app = express();
require("./api/data/db"); // runs when require
const routes = require("./api/routes/router");
app.use(express.json())

app.set("port",3000);

app.use("/api",routes);

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+port);
})