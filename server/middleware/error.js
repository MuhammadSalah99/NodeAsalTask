const erorrHandler = (err, req, res, next) => {
  console.log(err.stack);

  res.status(404).json({
    sucess: false,
    error: err.message,
  });
};
module.exports = erorrHandler;
