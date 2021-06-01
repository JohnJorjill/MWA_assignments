const express = require("express");
const app = express();
require("./api/data/db"); // runs when require
const routes = require("./api/routes/router");
const path = require("path");

app.use(express.json({ extended: false }));

app.set("port", 3000);

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules",express.static(path.join(__dirname, "node_modules")));



app.use("/api",routes);

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+port);
})