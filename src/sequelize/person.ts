import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { Car } from './car';
import { City } from './city';

export let Person;

export function createPerson() {
  Person = sequelize.define('Person', { name: DataTypes.STRING });
  return Person;
}

export function createPersonRelationships() {
  Person.belongsTo(City);
  Person.hasMany(Car);
}
