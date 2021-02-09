"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PhrasesController_1 = require("./controller/PhrasesController");
var UsersController_1 = require("./controller/UsersController");
var routes = express_1.Router();
routes.get('/users', UsersController_1.default.getUser);
routes.post('/users', UsersController_1.default.create);
routes.get('/phrases/:id', PhrasesController_1.default.get);
routes.post('/phrases/:id', PhrasesController_1.default.post);
routes.put('/phrases/:id', PhrasesController_1.default.edit);
routes.delete('/phrases/:id', PhrasesController_1.default.delete);
exports.default = routes;
//# sourceMappingURL=routes.js.map