'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class UserHero extends Model {}

  UserHero.init({
    UserId: DataTypes.INTEGER,
    HeroId: DataTypes.INTEGER
  }, {
    sequelize
  })

  UserHero.associate = function(models) {
    // associations can be defined here
  };
  return UserHero;
};