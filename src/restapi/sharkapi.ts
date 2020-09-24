import { SharkAPI, ServerRestAPI, SequelizeEntity } from 'sharkapi';

import { app as express } from '../express';

import { Brand } from '../sequelize/brand';
import { Car } from '../sequelize/car';
import { City } from '../sequelize/city';
import { Country } from '../sequelize/country';
import { Person } from '../sequelize/person';
import { Tyre } from '../sequelize/tyre';

export async function startSharkAPI() {
  let sharkAPI = new SharkAPI();
  let server = new ServerRestAPI(sharkAPI, { express });
  new SequelizeEntity(sharkAPI, Brand);
  new SequelizeEntity(sharkAPI, Car);
  new SequelizeEntity(sharkAPI, City);
  new SequelizeEntity(sharkAPI, Country);
  new SequelizeEntity(sharkAPI, Person);
  new SequelizeEntity(sharkAPI, Tyre);

  server.createResources();
}
