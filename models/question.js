'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Question extends Model {}

  Question.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {
    sequelize
  })

  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};