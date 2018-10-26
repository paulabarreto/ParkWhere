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

app.get("/parking_info", async (req, res) => {
  // res.cookie('name', 'express'); //Sets name = express

  knex.select(["street_parking.*", "comments.*"])
      .from('street_parking')
      .innerJoin('comments', 'street_parking.id', 'comments.parking_id')
      .then((data) => {
        // console.log(data)
        let result = {};
        data.forEach(row => {

          if (result[row.parking_id]) {
            result[row.parking_id].comments.push(row.comments)
          } else {
            result[row.parking_id] = {
              ...row,
              comments:[
                row.comments
              ]
            }
          }
        });
        res.send(Object.values(result))
      })


  // const parkings = await knex.from("street_parking")
  //   //   .then((data) => {
  //   //   let sendData = data.map(coord => ({
  //   //     lat_start: coord.lat_start, lng_start: coord.long_start,
  //   //     lat_end: coord.lat_end, lng_end: coord.long_end,
  //   //     hours: coord.hours, rate: coord.rate,
  //   //     id:coord.id
  //   //   }))
  //   //   res.send(sendData)
  //   // });
  //
  //   const comments = await knex.from("comments")
  //
  //   comments.forEach(comment => )
  //
  //   knex(street_parking)
  //   .join(comments).

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
app.post('/add_rating', (req,res)=>{
  const info = req.body.data;
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
   // console.log(req.body)
})

app.post('/add_parking_info_data', (req,res)=>{
  const newData = req.body.data;
  const newParking = {
    lat_start: newData.coords[0].lat,
    lng_start: newData.coords[0].lng,
    lat_end: newData.coords[1].lat,
    lng_end: newData.coords[1].lng,
    hours: newData.hours,
    rate: newData.rate
  };
  if(!req.body.data.id) {
    knex.insert(newParking, "id")
        .into("street_parking")
        .catch(function(error){
          console.error(error)
        }).then(function() {
          return knex.select('*')
          .from('street_parking')
        }).then(function(rows) {
          // console.log(rows);
        })
  } else {
    knex('street_parking').where({
      id: req.body.data.id,
    }).update({
      hours: newData.hours,
      rate: newData.rate
    }).then(function(rows) {
      // console.log(rows);
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
