import "reflect-metadata";
import {createConnection} from "typeorm";
import { Bootstrap, find } from "./bootstrap";

createConnection()
    .then(async _connection => {
        await Bootstrap().catch(err => console.log(err));
    
        await find().catch(err => console.log(err));
    })
    .catch(error => console.log(error));
