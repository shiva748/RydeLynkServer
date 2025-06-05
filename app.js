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
const vhost = require('vhost');
const app = express();
const fs = require("fs");
const cookieparser = require("cookie-parser");

require("./Database/connection");

// Create separate apps for main and admin
const mainApp = express();
const adminApp = express();

// Configure admin app
adminApp.use(bodyParser.json());
adminApp.use(cookieparser());
adminApp.use("/", Adminroutes);

// Configure main app
mainApp.use(bodyParser.json());
mainApp.use(cookieparser());
mainApp.use("/assets", express.static(path.join(__dirname, "./landing/assets")));

mainApp.get("/", (req, res) => {
  try {
    let filePath = path.join(__dirname, `./landing/index.html`);
    return res.status(200).sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});

mainApp.get("/:file", (req, res) => {
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

mainApp.get("/booking/:BookingId", (req, res) => {
  try {
    let filePath = path.join(__dirname, `./landing/booking.html`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(__dirname, `./landing/404.html`);
    }
    return res.status(200).sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});

mainApp.use("/api", Routes);

// Use vhost to handle subdomains
app.use(vhost(process.env.ADMINDOMAIN, adminApp));
app.use(vhost(process.env.DOMAIN, mainApp));

const server = createServer(app);

initialize(server);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
