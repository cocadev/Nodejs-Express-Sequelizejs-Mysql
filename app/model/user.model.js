export default (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The Username is required.'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The Email is required.'
        },
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      },
    },
    rule: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The Roles is required.'
        },
        isIn: {
          args: [['ADMIN', 'USER', 'PM']],
          msg: "Rule should be one of ADMIN, USER, PM"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The Password is required.'
        },
        len: {
          args: [8, 142],
          msg: "The password length should be between 8 and 42 characters."
        },
      },
    },
  })

  return User;
}