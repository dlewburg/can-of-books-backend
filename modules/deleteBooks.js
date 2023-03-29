'use strict';

const Book = require('../models/book');

async function deleteBooks(request, response, next) {
  try {
    let id = request.params.bookID;
    await Book.findByIdAndDelete(id);

    response.status(204).send('Book Deleted');

  } catch (error) {
    next(error);
  }

}

module.exports = deleteBooks;
