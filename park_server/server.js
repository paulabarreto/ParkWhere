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

app.use(cors({origin: "http://localhost:3002", credentials: true}));
app.use('../public', express.static(__dirname + "/public"))

// app.get("/session", (req, res) => {
//   console.log('Cookies: ', req.cookies);
//   res.send(req.cookies.name)
// })

app.post("/login", (req, res) => {
  // console.log(req.body.username)
  knex("users").where({
    name: req.body.username
  }).then((data) => {
    // console.log("data", data)
    res.cookie('name', data[0].name);
    res.send('');
  })
})

app.post("/logout", (req, res) => {
  console.log("remove cookie")
  res.clearCookie("name");
})

app.get("/parking_info", async (req, res) => {
  // res.cookie('name', 'express'); //Sets name = express

  knex.select(["street_parking.*", "comments.comments"])
      .from('street_parking')
      .fullOuterJoin('comments', 'street_parking.id', 'comments.parking_id')
      .then((data) => {
        let result = {};
        data.forEach(row => {

          row.lat_start = parseFloat(row.lat_start);
          row.lng_start = parseFloat(row.lng_start);
          row.lat_end = parseFloat(row.lat_end);
          row.lng_end = parseFloat(row.lng_end);
          row.hours = JSON.parse(row.hours);
          if (result[row.id]) {
            result[row.id].comments.push(row.comments)
          } else {
            result[row.id] = {
              ...row,
              comments:[
                row.comments
              ]
            }
          }
        });
        res.send(Object.values(result))
      })
});

app.post('/add_rating', (req,res)=>{
  const info = req.body.data;
  console.log(req.body.data);
  knex('street_parking').where({
    id: info.parking_id
  }).then((data) => {
    info.rating = Math.floor((data[0].rating + info.rating)/2);
  })
  knex('street_parking').where({

     id: info.parking_id
     })
     .update({
      id: info.parking_id,
      rating: info.rating
   })
   knex('street_parking')
      .where({
        id: info.parking_id
      })
      .then((data) => {
        res.send(data)
      });
})

app.post('/add_comment', (req,res)=>{
  const newComment = {
    comments: req.body.data.comment,
    parking_id: req.body.data.parking_id,
  };
  knex('comments').where({
    parking_id: req.body.data.parking_id,
  }).insert(newComment, "id")
      .into("comments")
      .catch(function(error){
        console.error(error)
      }).then(function() {
        return knex.select('*')
        .from('comments')
      }).then(function(rows) {
        // console.log(rows);
        // res.send(rows);
      })
})

app.post('/add_parking_info_data', (req,res)=>{
  const newData = req.body.data;
  if(!newData.rating ){
    newData.rating = 0;
  }
  if(!newData.rate){
    newData.rate = 0;
  }
  
  const newParking = {
    lat_start: newData.coords[0].lat,
    lng_start: newData.coords[0].lng,
    lat_end: newData.coords[1].lat,
    lng_end: newData.coords[1].lng,
    hours: newData.hours,
    rate: newData.rate,
    rating: newData.rating,
    address: newData.address
  };
  console.log(newParking)
  if(!req.body.data.id) {
    knex.raw('SELECT setval(\'street_parking_id_seq\', (SELECT MAX(id) from "street_parking"));')
    knex.insert(newParking, "id")
        .into("street_parking")
        .catch(function(error){
          console.error(error)
        }).then(function() {
          return knex.select('*')
          .from('street_parking')
        }).then(function(rows) {
          res.send(rows);
        })
  } else {
    knex('street_parking').where({
      id: req.body.data.id,
    }).update({
      hours: newData.hours,
      rate: newData.rate
    }).catch(function(error){
      console.error(error)
    }).then(function() {
      return knex.select('*')
      .from('street_parking')
    }).then(function(rows) {
      res.send(rows);
    })
  }
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


/*
update current parking info
with the new rating,calculate the avg rating, put it in the database
modify the comments array so that looks like
comments: {comment_id:1,text:'lalallala'}

new parking info
construct data from req and put in database, respone as the entire parking info array

*/
