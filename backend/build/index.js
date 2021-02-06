"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
require("reflect-metadata");
var cors = require("cors");
var routes_1 = require("./routes");
var express = require("express");
var typeorm_1 = require("typeorm");
dotenv.config();
var app = express();
typeorm_1.createConnections();
app.use(cors());
app.use(express.json());
app.use(routes_1.default);
app.listen(process.env.PORT || 3333);
//# sourceMappingURL=index.js.map