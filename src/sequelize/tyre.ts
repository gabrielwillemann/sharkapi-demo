import { DataTypes } from 'sequelize';
import { Brand } from './brand';
import { Car } from './car';
import { sequelize } from './sequelize';

export let Tyre;

export function createTyre() {
  Tyre = sequelize.define('Tyre', { name: DataTypes.STRING });
  return Tyre;
}

export function createTyreRelationships() {
  Tyre.belongsTo(Car);
  Tyre.belongsTo(Brand);
}

