export default (sequelize, Sequelize) => {
  const General = sequelize.define('general', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 3,
          msg: "Name must be atleast 3 characters in length"
        }
      }
    },
    birth: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    popularity: {
      type: Sequelize.STRING
    },
    history: {
      type: Sequelize.TEXT
    },
    type: {
      type: Sequelize.ENUM('STR', 'AGI', 'INT', ''),
      defaultValue: ''
    }
  });

  return General;
}