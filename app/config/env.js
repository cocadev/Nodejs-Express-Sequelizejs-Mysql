require('dotenv').config({ path: '../../.env' });

const env = {
  database: 'wangharry',
  username: 'wangharry',
  password: '123qwe!@#QWE',
  host: "85.10.205.173",
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  },
  PORT : 5000,
  PUBLIC_VAPID_KEY : process.env.DATABASE.PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY : process.env.DATABASE.PRIVATE_VAPID_KEY,
};

module.exports = env;