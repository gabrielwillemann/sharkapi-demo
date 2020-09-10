import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Sequelize, DataTypes, Op } from 'sequelize';
import { SharkApi, ServerRestApi, SequelizeEntity } from 'sharkapi';

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
    let Car = sequelize.define('Car', { name: DataTypes.STRING }, { underscored: true });
    let Color = sequelize.define('Color', { name: DataTypes.STRING, hexCode: DataTypes.STRING }, { underscored: true });

    Person.belongsTo(City);
    City.hasMany(Person);

    Car.belongsTo(Person);
    Person.hasMany(Car);

    Car.belongsTo(Color);
    Color.hasMany(Car);
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
  new ServerRestApi(sharkApi, expressApp);
  new SequelizeEntity(sharkApi, sequelize.models.City);
  new SequelizeEntity(sharkApi, sequelize.models.Person);
  new SequelizeEntity(sharkApi, sequelize.models.Color);
  new SequelizeEntity(sharkApi, sequelize.models.Car);

  sharkApi.server.createResources();
}
