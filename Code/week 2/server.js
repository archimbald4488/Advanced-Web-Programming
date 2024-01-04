const express = require("express");
const app = express();
const path = require('path')
const port = 3000;

app.use(express.json())

message = {
    msg: "Hello world"
}

app.use(express.static(path.join(__dirname, 'stuff')))

app.get("/hello", (req, res) => {
    res.send(message);
});

app.get("/echo/:id", (req, res) => {
    res.send(req.params);
});

app.post("/sum", (req, res) => {

    let sum = {sum: 0}

    req.body.numbers.forEach((alkio) => {
        sum.sum += alkio
    });

    res.send(sum)
})

app.use("/list", require("./api/apiweek1.js"))

app.listen(port, () => console.log(`Server listening a port ${port}!`));