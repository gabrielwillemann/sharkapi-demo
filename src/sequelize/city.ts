import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { Country } from './country';
import { Person } from './person';

export let City;

export function createCity() {
  City = sequelize.define('City', { name: DataTypes.STRING });
  return City;
}

export function createCityRelationships() {
  City.belongsTo(Country);
  City.hasMany(Person);
}
