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
  sharkApi.entitySequelize(sequelize.models.Car, {
    hooks: [
      {
        trigger: 'sort',
        match: 'person_name',
        fn({ context, name, value }) {
          context.order = context.order || [];
          context.order.push([sequelize.models.Person, 'name', value]);
          context.include = context.include || [];
          context.include.push({ model: sequelize.models.Person });
          return context;
        },
      },
      {
        trigger: 'filter',
        match: 'person_name',
        fn({ context, name, value }) {
          context.include = context.include || [];
          context.include.push({
            model: sequelize.models.Person,
            where: {
              name: { [Op.like]: `%${value}%` },
            },
          });
          return context;
        },
      },
      {
        trigger: 'relationship',
        match: 'person_with_city',
        fn({ context, name, value }) {
          context.include = context.include || [];
          context.include.push({
            model: sequelize.models.Person,
            include: [{ model: sequelize.models.City }],
          });
          return context;
        },
      },
    ],
  });

  sharkApi.createResources();

  // sharkApi.entitySequelize(sequelize.models.City, {
  //   hooks: [
  //     {

  //       // valid options: index-before, index-after, create-before, create-after, update-{}, delete-{}
  //       // valid options: filter, relationship, sort, page
  //       trigger: 'filter',

  //       // only valid for: filter, relationship, sort, page
  //       // string or regex
  //       match: 'name-like',

  //       // this function will be called by entity with Context = Query, and will receive return
  //       fn({entity, context, value, triggered, name/match, req?}) {
  //         // context in sequelize is object passed as parameter, but in TypeOrm and Mogoose is QueryBuild
  //         // Take care for clear all data generate by SharkApi
  //         context.where = context.where || {};
  //         context.include = context.include || {};
  //         return context;
  //       }
  //     }
  //   ]
  // });

  // global hooks, for all entities
  // sharkApi.hooks = [{}];
}
