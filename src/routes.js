import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// routes.get('/users/:id', UserController.show);

// só utilizará o middleware nas rotas declaradas após o routes.use(authMiddleware);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
