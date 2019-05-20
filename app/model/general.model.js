module.exports = (sequelize, Sequelize) => {
    const General = sequelize.define('general', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      email: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: 'Email address already in use!'
        },
        validate: {
          len: {
              args: [6, 128],
              msg: "Email address must be between 6 and 128 characters in length"
          },
          isEmail: {
              msg: "Email address must be valid"
          }
      }
      },
      house_type: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      general_type: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      age: {
        type: Sequelize.INTEGER,
        notEmpty: true
      },
      popularity: {
        type: Sequelize.FLOAT
      },
      rate: {
        type: Sequelize.INTEGER
      },
      history: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    });
    
    return General;
  }