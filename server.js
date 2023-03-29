'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getBooks = require('./modules/getBooks');
const postBooks = require('./modules/postBooks');
const deleteBooks = require('./modules/deleteBooks');
const updateBooks = require('./modules/updateBooks');

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

app.put('/books/:bookID', updateBooks);


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});



// Endpoint to delete a book from the database
// !! must have path parameter
// !! path parameter is going to be set with a variable to capture the ID
// !!use the ':' to signify that is it a path parameter
