var express = require('express');
var router = express.Router();
const fs = require("fs");

let list = [];
msg1 = { msg: "Todo added" }
msg2 = { msg: "user added" }
msg3 = { msg: "User not found" }
msg4 = { msg: "User deleted" }
msg5 = { msg: "Task deleted" }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My todos' });
});

/* ToDos */
router.get("/todo", (req, res) => {
  res.send(list)
})

router.post("/todo", function(req, res) {
  fs.readFile('./data/todos.json', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    list = JSON.parse(data);
    //console.log("Data loaded!")
  })

  for (let i = 0; i < list.length; i++) {
    if (list[i].name) { // does entry exist
      if (req.body.name == list[i].name) {
        list[i].todos.push(req.body.task);

        fs.writeFile("./data/todos.json", JSON.stringify(list), err => {
          if(err) {
              console.log(err);
              return;
          }
          //console.log("Data saved!");
        })

        res.send(msg1);
        return;  // Exit the function after sending the response
      }
    }
  }
  // User not found
  list.push({ name: req.body.name, todos: [req.body.task] });

  fs.writeFile("./data/todos.json", JSON.stringify(list), err => {
    if(err) {
        console.log(err);
        return;
    }
    console.log("Data saved!");
  })

  res.send(msg2);

});

/* User search */
router.get('/user/:id', function(req, res) {
  //res.render('index2', { title: "Search" })
  fs.readFile('./data/todos.json', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    list = JSON.parse(data);
    //console.log("Data loaded!")
  })

  for (let i = 0; i < list.length; i++) {
    if (list[i].name) { // does entry exist
      if (req.params.id == list[i].name) {
        console.log("name found")
        console.log(list[i])
        res.json(list[i]);
        return;  // Exit the function after sending the response
      }
    }
  }
  res.send(msg3)

});

router.delete('/user/:id', function(req, res) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name) { // does entry exist
      if (req.params.id == list[i].name) {
        list.splice(i, 1);

        fs.writeFile("./data/todos.json", JSON.stringify(list), err => {
          if(err) {
              console.log(err);
              return;
          }
          //console.log("Data saved!");
        })

        res.send(msg4);
        return;  // Exit the function after sending the response
      }
    }
  }
  res.send(msg3)

})

router.put('/user', function(req, res) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name) { // does entry exist
      if (req.body.name == list[i].name) {
        console.log("found name" + req.body.name)
        let index = list[i].todos.indexOf(req.body.task);
        list.splice(index, 1);

        fs.writeFile("./data/todos.json", JSON.stringify(list), err => {
          if(err) {
              console.log(err);
              return;
          }
          //console.log("Data saved!");
        })

        res.send(msg5);
        return;  // Exit the function after sending the response
      }
    }
  }
  res.send(msg3);
})

module.exports = router;
