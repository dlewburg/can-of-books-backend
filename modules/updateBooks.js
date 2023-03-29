'use strict';

const Book = require('../models/book');

async function updateBooks(request, response, next){
  try {
    let id = request.params.bookID;
    let data = request.body;

    // ! 3 args
    // ! 1st - is the id
    // ! 2nd - data
    // ! 3rd - options object { new: true, overwrite: true }

    const updatedBook = await Book.findByIdAndUpdate(id, data, {new: true, overwrite: true } );

    response.status(200).send(updatedBook);

    //ID - the cat to update, DATA - the information to update the book with
  } catch (error) {
    next (error);
  }
}

module.exports = updateBooks;
