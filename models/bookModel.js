const mongoose = require('mongoose');
const format = require('date-fns/format');
const { Schema } = mongoose;

const book = new Schema({
    
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
      cover: 
      {
        type: String,
        default :"https://twinklelearning.in/uploads/noimage.jpg"
      },
    hoverable: 
    {
        type: Boolean,
        default: true,
      },

    title: 
    {
        type: String,
        required: [true, 'Please add a name'],
    },
    author: 
    {
        type: String,
        required: [true, 'Please add an author'] 
    },
    amount: 
    {
        type: String,
        required: [true, 'Please add a rent amount'],
    },
    date: 
    {
        type: String,
        default: format(new Date(), 'dd-MM-yyyy'), 
    },
    contact: 
    {
        type: String,
        required: [true, 'Please add a contact number'],
    },
    description:{
        type: String,
        required: [true, 'Please add a description'],
    }
});

module.exports = mongoose.model('book', book);
