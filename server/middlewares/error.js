 export class Errorhandler extends Error {
  // Custom Error Handler class banako to handle message and statusCode
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // Yedi error message ya status code chaina bhane default set garne
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // 1. Duplicate Value Error (jastai same email register garda)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new Errorhandler(message, 400);
  }
  // 2. JWT Token Invalid vayo bhane
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid, try again";
    err = new Errorhandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is expired, try again";
    err = new Errorhandler(message, 400);
  }
  // 4. Mongodb ID format milyena bhane (CastError)
  if (err.name === "CastError") {
    const message = "Resource not found. Invalid: " + err.path;
    err = new Errorhandler(message, 400);
  }
  // Validation errors (jastai required fields missing) lai euta string ma combine garne
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((value) => value.message)
        .join(", ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default errorMiddleware;
