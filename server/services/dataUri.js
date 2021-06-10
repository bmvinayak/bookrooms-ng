const DatauriParser = require('datauri/parser');
const path = require('path');
const myDataUriParser = new DatauriParser();

exports.transformToBase64 = (file) => 
    myDataUriParser.format(path.extname(file.originalname).toString(), file.buffer);