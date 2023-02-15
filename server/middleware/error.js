const erorrHandler = (err, req, res, next) => {
  console.log(err.stack);

  res.status(err.statusCode || 500).json({
    sucess: false,
    error: err.message || "Server Error",
  });
};
module.exports = erorrHandler;
