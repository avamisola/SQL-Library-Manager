'use strict';
const Sequelize = require('sequelize');

//create Book model
module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
      title: {
        type: Sequelize.STRING,
        //Title required
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title is required'
          },
        },
      },
      author: {
        type: Sequelize.STRING,
        //Author required
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Author is required'
          },
        },
      },
      genre: Sequelize.STRING,
      year: {
        type: Sequelize.INTEGER,
        //Year must be numeric
        validate: {
            isNumeric: {
                msg: "Year not a number"
            },
        },
      },
    }, { sequelize });

    return Book;
};