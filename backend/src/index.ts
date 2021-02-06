import * as dotenv from  'dotenv';
import "reflect-metadata";
import * as cors from 'cors';
import routes from './routes';
import * as express from 'express';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);