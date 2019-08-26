
import Sequelize from 'sequelize';
import model_address from '../model/address.model.js'
import model_general from '../model/general.model.js'
import model_customer from '../model/customer.model.js'
import model_company from '../model/company.model.js'
import model_product from '../model/product.model.js'
import model_project from '../model/project.model.js'

import model_user from '../model/user.model.js'
import model_profile from '../model/profile.model'

import * as ENV from './env'

const sequelize = new Sequelize(ENV.DATABASE, 'root', '', {
  host:             ENV.HOST,
  dialect:          ENV.DIALECT,
  operatorsAliases: false,
  pool:             ENV.POOL
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//tables
db.address = model_address(sequelize, Sequelize);
db.generals = model_general(sequelize, Sequelize);
db.customers = model_customer(sequelize, Sequelize);

db.user = model_user(sequelize, Sequelize);
db.profile = model_profile(sequelize, Sequelize);

db.company = model_company(sequelize, Sequelize);
db.product = model_product(sequelize, Sequelize);
db.project = model_project(sequelize, Sequelize);

// relationship
db.profile.hasOne(db.user, { foreignKey: 'fk_profileId', targetKey: 'uuid'});
db.user.belongsTo(db.profile, { foreignKey: 'fk_profileId', targetKey: 'uuid'});

db.address.belongsTo(db.customers, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
db.customers.hasOne(db.address, {foreignKey: 'fk_customerid', targetKey: 'uuid'});

db.company.hasMany(db.product, {foreignKey: 'fk_companyid', sourceKey: 'uuid'});
db.product.belongsTo(db.company, {foreignKey: 'fk_companyid', targetKey: 'uuid'});

db.project.belongsToMany(db.user, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId', otherKey: 'userId'});
db.user.belongsToMany(db.project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'});

module.exports = db;