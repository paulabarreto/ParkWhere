"use strict";
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
// const morgan = require('morgan');
// const knexLogger = require('knex-logger');

app.use(express.static("public"));

app.get("/", (req, res) => {
  //Fetching data from database
  knex("street_parking")
    .where({
      id: 1
    }).then(function (rows){
      // console.log(rows);
    })

  //Testing sending data to db
  // const point = {
  //   latitude: 43.646407,
  //   longitude: -79.396781
  // };
  // knex.insert(point, 'id')
  //   .into('street_parking')
  //   .catch(function(error) {
  //     console.error(error);
  //   }).then(function() {
  //     return knex.select('*')
  //     .from('street_parking')
  //   }).then(function(rows) {
  //     console.log(rows);
  //   })
  //   .catch(function(error) {
  //     console.error(error);
  //   });
})

app.get("/login", (req, res) => {
  res.render("login");
})



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
