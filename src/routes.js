import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// routes.get('/users/:id', UserController.show);

// só utilizará o middleware nas rotas declaradas após o routes.use(authMiddleware);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
// segundo parametro passa um middleware -> upload.single('file')
// upload é a variavel definida anteriormente, silgle indica que será 1 arquivo,
// 'file' é o nome do campo que será enviado na requisição
routes.post('/files', upload.single('file'), FileController.store);
export default routes;
