"use strict";
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const cors = require('cors');
const Cookies = require('universal-cookie');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cors());
app.use('../public', express.static(__dirname + "/public"))

app.get('/', function(req, res){
   res.cookie('name', 'express').send('cookie set'); //Sets name = express
   console.log(req.cookies);
});



app.get("/", (req, res) => {
  knex("street_parking").then((data) => {
    let sendData = data.map(coord => ({
      lat_start: coord.latitude,
      lng_start: coord.longitude
    }))
      res.json(sendData)

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
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
