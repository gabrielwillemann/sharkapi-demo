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
    sequelize.define('Person', { name: DataTypes.STRING, age: DataTypes.INTEGER }, { underscored: true });
  } catch (error) {
    console.log(error);
  }
}

async function startExpress() {
  app = express();
  app.use(bodyParser.json());

  // app.get('/people', async (req, res) => {
  //   let people = await sequelize.models.Person.findAll();
  //   res.send(people);
  // });

  // app.post('/people', async (req, res) => {
  //   let people = await sequelize.models.Person.create(req.body);
  //   res.send(people);
  // });

  let port = process.argv[2] || 3000;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
}

async function startSharkApi() {
  let sharkApi = new SharkApi();
  sharkApi.restApiServer(app);
  sharkApi.entitySequelize(sequelize.models.Person);
  sharkApi.createResources();
}
