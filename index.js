const connectDB = require('./config/db');
const express = require('express');
require('dotenv').config()
const cors = require('cors');


connectDB();

const app = express();
app.use(cors());
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/req',require('./Routes/rentRequest'));
app.use('/api/auth', require('./Routes/userRoutes')); 
app.use('/api/books', require('./Routes/booksRoutes')); 

app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
  });