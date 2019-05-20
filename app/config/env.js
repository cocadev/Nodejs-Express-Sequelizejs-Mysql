const env = {
  database: 'sequelizeDota',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  },
  PORT : 5000,
  PUBLIC_VAPID_KEY : "BCmrK_JkhCp8smaeJs1MFhhccF9JHHl6zDsBWIp4gb0CXzMtXx2NCpIbndxSGrWTm9Z1fo9xSMzFP9tMpt68cfI",
  PRIVATE_VAPID_KEY : "ytdoWxJi2lD2KVmhx0QmVTxynHX4Wia9EbqTeJZuzPk",
};

module.exports = env;