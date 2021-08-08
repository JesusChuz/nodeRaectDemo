const pify = require('pify');
const fs   = require('fs');

function analyzeFile(filePath) {
  console.log("Analyzing", filePath);
  return pify(fs.stat)(filePath).then(data => data);
}

module.exports = analyzeFile;