let express = require("express");
let mongodb = require("mongoose");
let app = express();
let cors = require("cors");
let jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
let bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/Uploads', express.static('Uploads'));
mongodb.connect("mongodb://127.0.0.1:27017/Socialgram")
  .then(() => {
    console.log("Connection successfully");
  })
  .catch(() => {
    console.log("Connection not successful");
});


module.exports={app,mongodb}