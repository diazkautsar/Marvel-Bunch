'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hero = sequelize.define('Hero', {
    name: DataTypes.STRING,
    link_image: DataTypes.STRING
  }, {});
  Hero.associate = function(models) {
    // associations can be defined here
  };
  return Hero;
};