import { SequelizeEntity, SharkAPI } from 'sharkapi';
import { Op } from './sequelize';
import { Brand } from './brand';
import { Car } from './car';
import { City } from './city';
import { Country } from './country';
import { Person } from './person';
import { Tyre } from './tyre';

export function createSharkAPIEntities(sharkAPI: SharkAPI) {
  new SequelizeEntity(sharkAPI, Brand);
  new SequelizeEntity(sharkAPI, Car);
  new SequelizeEntity(sharkAPI, City, {
    hooks: [
      {
        trigger: 'sort',
        match: 'country_name',
        fn({ context, name, value }) {
          context.include.push({ model: Country });
          context.order.push([[Country, 'name', value]]);
        },
      },
    ],
  });
  new SequelizeEntity(sharkAPI, Country, {
    hooks: [
      {
        trigger: 'filter',
        match: 'name_like',
        fn({ context, name, value }) {
          context.where.name = { [Op.like]: `%${value}%` };
        },
      },
    ],
  });
  new SequelizeEntity(sharkAPI, Person);
  new SequelizeEntity(sharkAPI, Tyre, {
    hooks: [
      {
        trigger: 'relationship',
        match: 'country',
        fn({ context, name, value }) {
          context.include.push({
            model: Brand,
            include: [{ model: Country }],
          });
        },
      },
    ],
  });
}
