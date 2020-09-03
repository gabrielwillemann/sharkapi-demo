import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Sequelize, DataTypes, Op } from 'sequelize';
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
    let Color = sequelize.define('Color', { name: DataTypes.STRING, hexCode: DataTypes.STRING }, { underscored: true });

    Person.belongsTo(City);
    City.hasMany(Person);

    Car.belongsTo(Person);
    Person.hasMany(Car);

    Car.belongsTo(Color);
    Color.hasMany(Car);

    // await City.create({ name: 'Paramus' });
    // await Person.create({ name: 'Andew' });
    // await Color.create({ name: 'Silver', hexCode: 'c5ced4' });
    // await Car.create({ name: 'Toyota Avalon' });

    // await Color.sync({ force: true });
    // await Car.sync({ force: true });
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
  sharkApi.entitySequelize(sequelize.models.Person, {
    hooks: [
      {
        trigger: 'page',
        match: 'limit',
        fn({ context, name, value }) {
          context.limit = parseInt(value);
          // context.offset = ;
        },
      },
    ],
  });

  sharkApi.entitySequelize(sequelize.models.Color);

  sharkApi.entitySequelize(sequelize.models.Car, {
    hooks: [
      // {
      //   trigger: 'page',
      //   match: 'limit',
      //   fn({ context, name, value }) {
      //     console.log('aaaaaaaaaaaaa', context, name, value);
      //   },
      // },
      // {
      //   trigger: 'page',
      //   match: 'offset',
      //   fn() {},
      // },
      // {
      //   trigger: 'page',
      //   match: 'new-limit',
      //   fn() {},
      // },
      // {
      //   trigger: 'filter',
      //   match: 'person_name',
      //   fn({ context, name, value }) {
      //     context.include = context.include || [];
      //     context.include.push({
      //       model: sequelize.models.Person,
      //       where: { name: { [Op.like]: `%${value}%` } },
      //     });
      //     return context;
      //   },
      // },
      // {
      //   trigger: 'sort',
      //   match: 'person_name',
      //   fn({ context, name, value }) {
      //     context.order = context.order || [];
      //     context.order.push([sequelize.models.Person, 'name', value]);
      //     context.include = context.include || [];
      //     context.include.push({ model: sequelize.models.Person });
      //     return context;
      //   },
      // },
      // {
      //   trigger: 'relationship',
      //   match: 'person_with_city',
      //   fn({ context, name, value }) {
      //     context.include = context.include || [];
      //     context.include.push({
      //       model: sequelize.models.Person,
      //       include: [{ model: sequelize.models.City }],
      //     });
      //     return context;
      //   },
      // },
    ],
  });

  sharkApi.createResources();

  // global hooks, for all entities
  // sharkApi.hooks = [{}];
}
