const path = require('path');
const sendImageToVisionApi = require('./send-image-to-vision-api');
const fs = require('fs');
var fetch = require('node-fetch');
var FormData = require('form-data');
// Mutable variable to support rewire in tests.
const sharp = require('sharp');
var Episode7 = require('episode-7'); //?
let m1l, m1p, m2l, m2p, m3l, m3p, predictions1, imgVar;
function fileUpload(request, response, next) {
    const fileFile = request.files.file;
    const filePath = fileFile.path;
    const croppedPath = 'cropped.jpg';
    const pathStart = fileFile.name.substring(0, fileFile.name.lastIndexOf("."));
    const fileExt = path.extname(filePath).replace(/^\./, '');
    var data = new FormData();
    data.append('file', fs.createReadStream(filePath));
    data.append('name', fileFile.name);
    console.log('data to send:', data);
    return fetch('http://productidentification.eastus.azurecontainer.io/api/model1', {
        method: 'POST',
        body: data // The file
    })
        .then(response => response.json())
        .then(function (predictions) {
            console.log("predictions1", predictions);
            //response.setHeader('Content-Type', 'application/json'); 
            m1p = predictions.prob;
            m1l = predictions.pred;
            predictions1 = predictions;
            sharp(filePath).extract({ width: (parseInt(predictions.xmax) - parseInt(predictions.xmin)), height: (parseInt(predictions.ymax) - parseInt(predictions.ymin)), left: parseInt(predictions.xmin), top: parseInt(predictions.ymin) }).toFile(croppedPath)
                .then(function (new_file_info) {
                    console.log("Image cropped and saved to", croppedPath);
                    console.log("fetch2 starting\n");
                    var data2 = new FormData();
                    data2.append('file', fs.createReadStream(filePath));
                    data2.append('name', fileFile.name);
                    return fetch('http://productidentification.eastus.azurecontainer.io/api/model3', {
                        method: 'POST',
                        body: data2 // The file
                    })
                        .then(response => response.json())
                        .then(function (predictions) {
                            console.log("predictions2", predictions);
                            //response.setHeader('Content-Type', 'application/json'); 
                            m2p = predictions.prob;
                            m2l = predictions.pred;

                            var newData = new FormData();
                            newData.append('file', fs.createReadStream(croppedPath));
                            return fetch('http://productidentification.eastus.azurecontainer.io/api/model3', {
                                method: 'POST',
                                body: newData // The file
                            })
                                .then(response => response.json())
                                .then(function (predictions) {
                                    console.log("predictions3", predictions);
                                    //response.setHeader('Content-Type', 'application/json'); 
                                    m3p = predictions.prob;
                                    m3l = predictions.pred;
                                    const respDict =
                                    {
                                        "mod1p": m1l,
                                        "mod1pr": m1p,
                                        "mod2p": m2l,
                                        "mod2pr": m2p,
                                        "mod3p": m3l,
                                        "mod3pr": m3p
                                    };
                                    console.log("Stack JSON", respDict);
                                    return fetch('http://productidentification.eastus.azurecontainer.io/api/stackmodel', {
                                        method: 'POST',
                                        body: respDict // The json
                                    })
                                        .then(function (posted) {
                                            console.log("POST response", posted);
                                            //response.status(200).send(predictions);
                                            //response.setHeader('Content-Type', 'application/json'); 
                                            let newObject = predictions1;
                                            /*if (posted.includes("subscriptable")) {  
                                            /}
                                            else {
                                                newObject.pred = posted;
                                            }*/
                                            if (parseFloat(m3p) > parseFloat(m2p)) newObject.pred = (parseFloat(m3p) > parseFloat(m1p)) ? m3l : m1l;
                                            else newObject.pred = (parseFloat(m2p) > parseFloat(m1p)) ? m2l : m1l;
                                            newObject.resize = 416;//predictions.resize;
                                            response.status(200).send(newObject);
                                        }).catch(function (err) {
                                            console.log("An error occured when running StackModel");
                                        });
                                }).catch(function (err) {
                                    console.log("An error occured when fetching model 3");
                                });
                        }).catch(function (err) {
                            console.log("An error occured when fetching model 2");
                        });
                    }).catch(function (err) {
                        console.log("An error occured when cropping image");
                    });
                })
                .catch(function (err) {
                    console.log("An error occured when fetching model 1");
                });
            

    /*    
    })
        .catch( error => next(error));*/


    


    /*})
    .catch( error => next(error));*/
}

module.exports = fileUpload;
console.log("File upload was included");