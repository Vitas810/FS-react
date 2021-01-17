const fs = require('fs').promises;
const path = require('path');

const requestHandler = (req, res) => {
  fs.readFile(path.join(__dirname, 'category.json')).then((content) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(content);
  });
};
module.exports = { requestHandler };
