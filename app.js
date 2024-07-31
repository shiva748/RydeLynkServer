require("dotenv").config();
// imports

const express = require("express");
const { createServer } = require("node:http");
const port = 3005 || process.env.PORT;
const Routes = require("./Route/Routes");
const Adminroutes = require("./Route/adminroute");
const bodyParser = require("body-parser");
const initialize = require("./socket/socket");
const path = require("node:path");
const app = express();
const fs = require("fs");
const cookieparser = require("cookie-parser");

require("./Database/connection");

app.use(bodyParser.json());
app.use(cookieparser());

app.use("/assets", express.static(path.join(__dirname, "./landing/assets")));

app.get("/", (req, res) => {
  try {
    let filePath = path.join(__dirname, `./landing/index.html`);
    return res.status(200).sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});

app.get("/:file", (req, res) => {
  try {
    const { file } = req.params;
    let filePath = path.join(__dirname, `./landing/${file}.html`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(__dirname, `./landing/404.html`);
    }
    return res.status(200).sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});

app.use("/api", Routes);

app.use("/admin", Adminroutes);

const server = createServer(app);

initialize(server);

server.listen(port, () => {
  console.log(`listining to port ${port}`);
});
