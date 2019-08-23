
import Sequelize from 'sequelize';
import * as ENV from '../config/env'

const sequelize = new Sequelize(ENV.DATABASE, 'root', '', {
  host:             ENV.HOST,
  dialect:          ENV.DIALECT,
  operatorsAliases: false,
  pool:             ENV.POOL
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.generals = require('../model/general.model.js')(sequelize, Sequelize);

db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.address = require('../model/address.model.js')(sequelize, Sequelize);
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.company = require('../model/company.model.js')(sequelize, Sequelize);
db.product = require('../model/product.model.js')(sequelize, Sequelize);
db.project = require('../model/project.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

db.address.belongsTo(db.customers, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
db.customers.hasOne(db.address, {foreignKey: 'fk_customerid', targetKey: 'uuid'});

db.company.hasMany(db.product, {foreignKey: 'fk_companyid', sourceKey: 'uuid'});
db.product.belongsTo(db.company, {foreignKey: 'fk_companyid', targetKey: 'uuid'});

db.project.belongsToMany(db.user, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId', otherKey: 'userId'});
db.user.belongsToMany(db.project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'});

module.exports = db;