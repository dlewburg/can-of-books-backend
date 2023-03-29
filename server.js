'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getBooks = require('./modules/getBooks');
const postBooks = require('./modules/postBooks');
const deleteBooks = require('./modules/deleteBooks');

const app = express();
app.use(cors());

app.use(express.json());


const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received');

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/books', getBooks);

app.delete('/books/:bookID', deleteBooks);


app.post('/books', postBooks);

// Endpoint to Update books

// app.put('/cats/:catID', updateBooks;

// async function updateBooks(request, response, next){
//   try {
//     let id = request.params.bookID;
//     let data = request.body;

//     // ! 3 args
//     // ! 1st - is the id
//     // ! 2nd - data
//     // ! 3rd - options object { new: true, overwrite: true }

//     const updatedBook = await Book.findByIdAndUpdate(id, data, {new: true, overwrite: true } );

//     response.status(200).send(updatedBook);

//     //ID - the cat to update, DATA - the information to update the book with
//   } catch (error) {
//     next (error);
//   }
// }



app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


/*
Endpoint to delete a book from the database
!! must have path parameter
!! path parameter is going to be set with a variable to capture the ID
!!use the ':' to signify that is it a path parameter




**** LOOKING FOR AXIOS DELETE **** //ID will be the books ID

async function deleteBook(request, response, next) {
  try{


    let id = request.params.catID //path parameter takes in a value and it must be give in url after endpoint


    await Book.findByIdAndDelete(id);


    response.status(204).send('Cat Deleted')


  }catch(error){
    next(error);
  }
}


***** ADDING BOOKS BACK ENDPOINT******

app.post('/books', postBook); // body is used for posting -- built with JSON and put everything in quotes

*** put in module *** request.body needs more middleware -- put in "app.use(express.json());" at the top of the page right below the cors**************BRING IT IN

async function postBook (request, response, next) {

  try{

    let createdBook = await Book.create(request.body)


    response.status(201).send(createdBook)
  } catch (error){
    next(error)
  }
}



*/
