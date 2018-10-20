"use strict";
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);




app.get("/", (req, res) => {
  console.log(req)
});



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});