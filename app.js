const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const error = require('./error/error');
const path = require('path');
const app = express();
const typeRoutes = require('./routes/routes');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, x-auth-token, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/types', typeRoutes);
app.use(error);

app.get('/', (req, res, next) => {
  res.send('Hello JS');
});

app.listen(8080, () => console.log('listening on port 8080'));
