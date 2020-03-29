const knex = require('knex');
const config = require('../../knexfile');

const env = process.env.NODE_ENV;

const conn = knex(env === 'test' ? config.test : config.development);

module.exports = conn;
