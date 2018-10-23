"use strict";
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors({origin: "http://localhost:3000", credentials: true}));

app.use('../public', express.static(__dirname + "/public"))

// app.get("/session", (req, res) => {
//   console.log('Cookies: ', req.cookies);
//   res.send(req.cookies.name)
// })

app.post("/login", (req, res) => {
  res.cookie('name', req.body.username);
  res.send(req.cookies.name)
})

app.get("/", (req, res) => {
  // res.cookie('name', 'express'); //Sets name = express

  knex("street_parking").then((data) => {
    let sendData = data.map(coord => ({
      lat_start: coord.lat_start, lng_start: coord.long_start,
      lat_end: coord.lat_end, lng_end: coord.long_end
    }))
    res.send(sendData)
  });
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
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
