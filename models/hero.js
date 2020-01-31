'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Hero extends Model {}

  Hero.init({
    name: DataTypes.STRING,
    link_image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: 'URL SALAH'
        }
      }
    }
  }, {
    sequelize
  })

  Hero.associate = function(models) {
    // associations can be defined here
    Hero.belongsToMany(models.User, {
      through: models.UserHero
    })
    Hero.hasMany(models.UserHero)
  };
  return Hero;
};