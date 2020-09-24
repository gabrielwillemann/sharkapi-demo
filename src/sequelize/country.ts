import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { Brand } from './brand';
import { City } from './city';

export let Country;

export function createCountry() {
  Country = sequelize.define('Country', { name: DataTypes.STRING });
  return Country;
}

export function createCountryRelationships() {
  Country.hasMany(City);
  Country.hasMany(Brand);
}
