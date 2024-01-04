"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
let vehicleList = [];
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello from TS-Express application – I am up!");
});
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.post("/vehicle/add", (req, res) => {
    if ("bodyType" in req.body) {
        let newVehicle = req.body;
        vehicleList.push(newVehicle);
        //console.log(vehicleList[vehicleList.length - 1])
    }
    else if ("draft" in req.body) {
        let newVehicle = req.body;
        vehicleList.push(newVehicle);
        //console.log(vehicleList[vehicleList.length - 1])
    }
    else if ("wingspan" in req.body) {
        let newVehicle = req.body;
        vehicleList.push(newVehicle);
        //console.log(vehicleList[vehicleList.length - 1])
    }
    else {
        let newVehicle = req.body;
        vehicleList.push(newVehicle);
        //console.log(vehicleList[vehicleList.length - 1])
    }
    res.status(201).send("Vehicle added");
});
app.get("/vehicle/search/:model", (req, res) => {
    const name = req.params.model;
    let foundVehicle = null;
    vehicleList.forEach(vehicle => {
        if (vehicle.model == name) {
            res.send(vehicle);
            foundVehicle = vehicle;
        }
    });
    if (foundVehicle) {
        res.status(200).send(foundVehicle);
    }
    else {
        res.status(404).send("Vehicle not found");
    }
});
app.listen(port, () => {
    console.log("Server is up'n'running at http://localhost:" + port);
});
