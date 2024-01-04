var express = require('express');
var router = express.Router();
const fs = require("fs");

let list = [{name: "pizza", instructions: ["do this", "do that"], ingredients: ["flour", "tomato"]}]

let msg1 = { msg: "Not found" }
let msg2 = { msg: "Hi!" }

/* fs.writeFile("./public/data/recipes.json", JSON.stringify(list), err => {
  if(err) {
      console.log(err);
      return;
  }
}) */

router.get('/', function(req, res, next) { // show specific recipe
  res.render('index', { title: 'Welcome!' });
});

router.get('/recipe/:food', function(req, res, next) {

/*   fs.readFile('./public/data/recipes.json', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    list = JSON.parse(data);
  })

  for (let i = 0; i < list.length; i++) {
    if (req.params.food == list[i].name) {
      res.send(list[i])
      return
    }
  } */
  //spagetti
  let spagettilist = [{name: req.params.food, instructions: ["do this", "do that"], ingredients: ["flour", "tomato"]}]
  res.send(spagettilist[0]);
});

router.post("/recipe/", function(req, res, next) {
/*   fs.readFile('./public/data/recipes.json', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    list = JSON.parse(data);
  }) */

  list.push(req.body) // Add the new data

/*   fs.writeFile("./public/data/recipes.json", JSON.stringify(list), err => {
    if(err) {
        console.log(err);
        return;
    }
    //console.log("Data saved!");
  }) */
  res.send(list[list.length - 1]);
})

router.post("/images", function(req, res, next) {
  res.send(msg2)
})

module.exports = router;
