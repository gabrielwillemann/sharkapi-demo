import { startSequelize } from '../sequelize/index';
import { startExpress } from '../express';
import { startSharkAPI } from './sharkapi';

(async () => {
  await startSequelize();
  await startExpress();
  startSharkAPI();
})();
