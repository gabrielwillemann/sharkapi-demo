import * as graphql from 'graphql';
import * as graphqlIsoDate from 'graphql-iso-date';
import { graphqlHTTP } from 'express-graphql';
import { SharkAPI, ServerGraphQL } from 'sharkapi';

import { app as express } from '../express';
import { createSharkAPIEntities } from '../sequelize/sharkapi';

export async function startSharkAPI() {
  let sharkAPI = new SharkAPI();
  new ServerGraphQL(sharkAPI, { graphql, graphqlIsoDate });
  createSharkAPIEntities(sharkAPI);

  let schema = sharkAPI.server.createResources();

  express.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );
}
