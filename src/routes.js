import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);

routes.post('/session', SessionController.store);

export default routes;
