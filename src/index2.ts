import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import { SharkApi, ServerGraphQl, SequelizeEntity } from 'sharkapi';
import { Sequelize, DataTypes, Op } from 'sequelize';
import * as graphql from 'graphql';
import * as graphqlIsoDate from 'graphql-iso-date';

let expressApp;
let sequelize;

(async () => {
  await startSequelize();
  await startExpress();
  await startSharkApi();
})();

async function startSequelize() {
  try {
    sequelize = new Sequelize({ dialect: 'sqlite', storage: 'database.sqlite' });
    await sequelize.authenticate();

    let City = sequelize.define('City', { name: DataTypes.STRING }, { underscored: true });
    let Person = sequelize.define('Person', { name: DataTypes.STRING, age: DataTypes.INTEGER }, { underscored: true });

    Person.belongsTo(City);
    City.hasMany(Person);
  } catch (error) {
    console.log(error);
  }
}

async function startExpress() {
  expressApp = express();
  expressApp.use(bodyParser.json());

  let port = process.argv[2] || 3000;
  expressApp.listen(port, () => {
    console.log(`Example expressApp listening on port ${port}!`);
  });
}

async function startSharkApi() {
  let sharkApi = new SharkApi();
  new ServerGraphQl(sharkApi, graphql, graphqlIsoDate);
  new SequelizeEntity(sharkApi, sequelize.models.City);
  new SequelizeEntity(sharkApi, sequelize.models.Person);

  let schema = sharkApi.server.createResources();

  expressApp.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );
}
