import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { Person } from './person';
import { Brand } from './brand';
import { Tyre } from './tyre';

export let Car;

export function createCar() {
  Car = sequelize.define('Car', { name: DataTypes.STRING });
  return Car;
}

export function createCarRelationships() {
  Car.belongsTo(Person);
  Car.belongsTo(Brand);
  Car.hasMany(Tyre);
}
