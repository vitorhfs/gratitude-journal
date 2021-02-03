import "reflect-metadata";
import {createConnection} from "typeorm";
import * as cors from 'cors';
import routes from './routes';
import * as express from 'express';

const app = express();

createConnection();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);