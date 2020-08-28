import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Sequelize, DataTypes } from 'sequelize';
import { SharkApi } from 'sharkapi';

let app;
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
    let Car = sequelize.define('Car', { name: DataTypes.STRING }, { underscored: true });

    Person.belongsTo(City);
    City.hasMany(Person);

    Car.belongsTo(Person);
    Person.hasMany(Car);
  } catch (error) {
    console.log(error);
  }
}

async function startExpress() {
  app = express();
  app.use(bodyParser.json());

  let port = process.argv[2] || 3000;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
}

async function startSharkApi() {
  let sharkApi = new SharkApi();
  sharkApi.restApiServer(app);
  sharkApi.entitySequelize(sequelize.models.City);
  sharkApi.entitySequelize(sequelize.models.Person);
  sharkApi.entitySequelize(sequelize.models.Car);

  // sharkApi.entitySequelize(sequelize.models.City, {
  //   hooks: [
  //     {
  //       triggered: 'filter', // all, filter, relationship, sort ...
  //       id: 'name-like',
  //       fn({entity, context, query, value, req, hookId}) {
  //         // context in sequelize is object passed as parameter, but in TypeOrm and Mogoose is QueryBuild
  //         // Take care for clear all data generate by SharkApi
  //         context.where = context.where || {};
  //         context.include = context.include || {};
  //         return context;
  //       }
  //     }
  //   ]
  // });

  sharkApi.createResources();
}
