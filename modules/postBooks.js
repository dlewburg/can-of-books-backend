'use strict';

const Book = require('../models/book');

async function postBooks(request, response, next) {
  try {
    let createBook = await Book.create(request.body);

    response.status(201).send(createBook);

  } catch (error) {
    next(error);
  }

}

module.exports = postBooks;
