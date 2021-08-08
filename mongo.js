const mongoose = require('mongoose');
//const env = require('./environment/environment');
mongoose.Promise = global.Promise;


//const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`;

function connect(){
//    return mongoose.connect(mongoUri, {useMongoClient: true });
    return mongoose.connect( 'mongodb+srv://nagesh:kohler12345@cluster0.jfjj5.mongodb.net/einsteinvision?retryWrites=true&w=majority' || 'mongodb://localhost/mern_youtube', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}



// mongoose.connection.on('connected', () => {
//     console.log('Mongoose is connected!!!!');
   
// });
module.exports = {
    connect,
    mongoose
};