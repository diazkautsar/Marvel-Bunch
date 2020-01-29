'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserHero = sequelize.define('UserHero', {
    UserId: DataTypes.INTEGER,
    HeroId: DataTypes.INTEGER
  }, {});
  UserHero.associate = function(models) {
    // associations can be defined here
  };
  return UserHero;
};