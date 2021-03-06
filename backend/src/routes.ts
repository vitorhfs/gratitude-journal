import { Router } from 'express';
import PhrasesController from './controller/PhrasesController';
import UsersController from './controller/UsersController';

const routes = Router();

routes.get('/users/:auth', UsersController.getUser);
routes.post('/users', UsersController.create);

routes.get('/phrases/:id', PhrasesController.get);
routes.post('/phrases/:id', PhrasesController.post);
routes.put('/phrases/:id', PhrasesController.edit);
routes.delete('/phrases/:id', PhrasesController.delete);

export default routes;