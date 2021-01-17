const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const error = require('./error/error');

const app = express();
const typeRoutes = require('./routes/routes');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/types', typeRoutes);
app.use(error);

app.get('/', (req, res, next) => {
  res.send('Hello JS');
});

app.listen(8080, () => console.log('listening on port 8080'));
