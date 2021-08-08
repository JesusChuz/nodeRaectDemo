const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const predictionSchema = new Schema( {'label':String, 'probability':String} )
const FeedBackSchema = new Schema({
    reponse: String,
    url: String,
    message:String,
    email:String,
    predictions: [predictionSchema],
    selectProduct:String
});

// Model
const FeedBack = mongoose.model('FeedBack', FeedBackSchema);

module.exports =  FeedBack;


