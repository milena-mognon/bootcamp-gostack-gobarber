import express from 'express';
import { resolve } from 'path';
// importa as rotas do arquivo routes.js
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // conseguir enviar requisições e receber respostas no formato JSON
    this.server.use(express.json());
    // express static -> serve para servir arquivos estaticos (imagens, arquivos..)
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
