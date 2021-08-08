const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const ProductReferenceSchema = new Schema({
    productid: String,
    url: String,
    productName: String,
    link: String
});

// Model
const ProductReference = mongoose.model('ProductRefrence', ProductReferenceSchema);

module.exports =  ProductReference;