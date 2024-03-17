/* eslint-disable no-undef */

//* Saco las variables de entorno de testing
require('dotenv').config({
    path: '.env.test'
});

//* Hago el mock de las variables de entorno usando el helper
jest.mock('./src/helpers/getEnvVariables', () => ({
  getEnvVariables: () => ({ ...process.env })
}));