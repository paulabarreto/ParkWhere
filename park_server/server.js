"use strict";
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const cors = require('cors');

app.use(cors());


app.get("/", (req, res) => {
  knex("street_parking").then((data) => {
      res.json(data)
    })
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
