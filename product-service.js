const ProductReference = require('./product-model');
//const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
    ProductReference.find({productid:req.params.id}).then(function (productref) {
     return res.send({"productref":productref});
    });
}

module.exports = {
    get
};