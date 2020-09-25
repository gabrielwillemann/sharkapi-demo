import { SharkAPI, ServerRestAPI } from 'sharkapi';

import { createSharkAPIEntities } from '../sequelize/sharkapi';
import { app as express } from '../express';

export async function startSharkAPI() {
  let sharkAPI = new SharkAPI();
  let server = new ServerRestAPI(sharkAPI, { express });

  createSharkAPIEntities(sharkAPI);

  server.createResources();
}
