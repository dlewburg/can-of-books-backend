'use strict';

const Book = require('../models/book');

async function getBooks(request, response, next) {
  try {
    let allBooks = await Book.find({});

    response.status(200).send(allBooks);

  } catch (error) {
    next(error);
  }

};

module.exports = getBooks;
