'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}
  
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "format email yang anda masukan salah"
        },
        checkEmail(value, next) {
          User.findAll({
            where:{
              email: value
            }
          })
            .then(users => {
              if (users.length > 0) {
                next('email sudah terdaftar')
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        checkUsername(value, next) {
          User.findAll({
            where: {
              username: value
            }
          })
            .then(users => {
              if (users.length > 0) {
                next('username telah terdaftar')
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Hero, {
      through: models.UserHero
    })
  };
  return User;
};