const Episode7 = require('episode-7');
const jwt     = require('jsonwebtoken');
const rp      = require('request-promise');
const oAuthToken = require('./oauth-token');

function* updateToken(pvsUrl) {

  let argumentError;
  if (pvsUrl == null) {
    argumentError = new Error('updateToken requires EINSTEIN_VISION_URL, the base API URL (first arg)');
    return Promise.reject(argumentError);
  }

  var reqUrl = pvsUrl; /*`${pvsUrl}v1/oauth2/token`;*/
  
  var rsa_payload = {
    "sub":"",
    "aud":reqUrl
  }

  var rsa_options = {
    header:{
      "alg":"RS256",
      "typ":"JWT"
     },
     expiresIn: '25h'
  }

  /*var token = jwt.sign( 
    rsa_payload,
    privateKey,
    rsa_options
  );*/

  var options = {
    url: reqUrl,
    method: 'GET',
    headers: {
        'Content-Type': 'text/html',
        'accept': 'text/html, application/json, multipart/form-data'
    },
    /*body:`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer`/*&assertion=${encodeURIComponent(token)}`*/
  }
    console.log("Attempting yield...");
    /*const response = yield Episode7.call(rp.post, options);
  /*const granted = JSON.parse(response);
  const accessToken = granted.access_token;*/
  oAuthToken.set("");
    return {"":""};//response
}

module.exports = updateToken;