const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const typeRoutes = require('./routes/types');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/types', typeRoutes);

app.use((err, req, res, next) => {
  const { message } = err;
  res.json({ status: 'Error', message });
});
app.get('/', (req, res, next) => {
  res.send('Hello JS');
});

app.listen(8080, () => console.log('listening on port 8080'));
