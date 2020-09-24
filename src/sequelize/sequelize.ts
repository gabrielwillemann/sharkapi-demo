import { Sequelize } from 'sequelize';

export let sequelize;

export async function createSequelize(): Promise<Sequelize> {
  sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/database.sqlite' });
  await sequelize.authenticate();
  return sequelize;
}
