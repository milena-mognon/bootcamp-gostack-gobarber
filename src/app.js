import express from 'express';
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
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
