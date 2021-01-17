const error = (err, req, res, next) => {
  const { message } = err;
  res.json({ status: 'Error', message });
};

module.exports = error;
