import { createSequelize } from './sequelize';
import { Brand, createBrand, createBrandRelationships } from './brand';
import { Car, createCar, createCarRelationships } from './car';
import { City, createCity, createCityRelationships } from './city';
import { Country, createCountry, createCountryRelationships } from './country';
import { Person, createPerson, createPersonRelationships } from './person';
import { Tyre, createTyre, createTyreRelationships } from './tyre';

export async function startSequelize() {
  await createSequelize();

  createBrand();
  createCar();
  createCity();
  createCountry();
  createPerson();
  createTyre();

  createBrandRelationships();
  createCarRelationships();
  createCityRelationships();
  createCountryRelationships();
  createPersonRelationships();
  createTyreRelationships();

  Brand.sync({ force: true });
  Car.sync({ force: true });
  City.sync({ force: true });
  Country.sync({ force: true });
  Person.sync({ force: true });
  Tyre.sync({ force: true });
}
