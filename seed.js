'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}

  await Book.create({
    title: 'One Fist, Two Fish, Red Fish, Blue Fish',
    description: 'A children\'s book about fish.' ,
    status: true
  });

  console.log('Book 1 added!');

  await Book.create({
    title: 'The Cat in the Hat',
    description: 'Original children\'s story about a cat in a hat.' ,
    status: true
  });

  console.log('Book 2 added!');

  await Book.create({
    title: 'Green Eggs and Ham',
    description: 'Dr. Seuss book about Sam forcing someone to eat green eggs and ham.' ,
    status: false
  });

  console.log('Book 3 added!');

  mongoose.disconnect();
}

seed();