import express, {Express, Request, Response} from "express"

const app: Express = express()
const port: number = 3000

type ObjectArray = Array<{ model: string }>

interface genericVehicle {
    model: string;
    color: string;
    year: number;
    power: number;
}

interface Car extends genericVehicle {
    bodyType: string;
    wheelCount: number;
}

interface Boat extends genericVehicle {
    draft: number;
}

interface Plane extends genericVehicle {
    wingspan: number;
}

let vehicleList: ObjectArray = []

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from TS-Express application – I am up!")
})

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world")
})

app.post("/vehicle/add", (req: Request, res: Response) => {

    if ("bodyType" in req.body) {
        let newVehicle: Car = req.body
        vehicleList.push(newVehicle)
        //console.log(vehicleList[vehicleList.length - 1])
    } else if ("draft" in req.body) {
        let newVehicle: Boat = req.body
        vehicleList.push(newVehicle)
        //console.log(vehicleList[vehicleList.length - 1])
    } else if ("wingspan" in req.body) {
        let newVehicle: Plane = req.body
        vehicleList.push(newVehicle)
        //console.log(vehicleList[vehicleList.length - 1])
    } else {
        let newVehicle: genericVehicle = req.body
        vehicleList.push(newVehicle)
        //console.log(vehicleList[vehicleList.length - 1])
    }

    res.status(201).send("Vehicle added");
})

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    const name: string = req.params.model
    let foundVehicle = null;

    vehicleList.forEach(vehicle => {
        if (vehicle.model == name) {
            res.send(vehicle)
            foundVehicle = vehicle
        }
    })

    if (foundVehicle) {
        res.status(200).send(foundVehicle);
    } else {
        res.status(404).send("Vehicle not found");
    }
})

app.listen(port, () => {
    console.log("Server is up'n'running at http://localhost:" + port)
})
