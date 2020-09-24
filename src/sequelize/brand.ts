import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { Car } from './car';
import { Tyre } from './tyre';
import { Country } from './country';

export let Brand;

export function createBrand() {
  Brand = sequelize.define('Brand', { name: DataTypes.STRING });
  return Brand;
}

export function createBrandRelationships() {
  Brand.hasMany(Car);
  Brand.hasMany(Tyre);
  Brand.belongsTo(Country);
}
