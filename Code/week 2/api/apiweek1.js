const express = require("express")
const router = express.Router();

let list = {list: []}

router.get("/", (req, res) => {
    res.send(list)
})

router.post("/", (req, res) => {

    list.list.push(req.body.text)

    res.send(list)
})

module.exports = router;