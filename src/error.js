const error = function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    console.log(err);
    res.sendStatus(500);
    
  }

module.exports = error;
