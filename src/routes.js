import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import AvaliableController from './app/controllers/AvaliableController';
import NotificationController from './app/controllers/NotificationController';
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
// upload é a variavel definida anteriormente, single indica que será 1 arquivo,
// 'file' é o nome do campo que será enviado na requisição
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:id/avaliable', AvaliableController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
export default routes;
