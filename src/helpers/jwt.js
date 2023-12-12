const createHttpError = require("http-errors")
const JWT = require("jsonwebtoken")
module.exports = {
  signUserAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        _id: userId,
      };
      const secret = process.env.USER_ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "",
        audience: "",
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createHttpError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  signUserRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = { _id: userId };
      const secret = process.env.USER_REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "",
        audience: "",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createHttpError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyUserCookieAccessToken: (req, res, next) => {
    if (!req.cookies.session) return next(createHttpError.Unauthorized());
    const token = req.cookies.session;
    JWT.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createHttpError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  verifyUserCookieRefreshToken: (token) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        token,
        process.env.USER_REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createHttpError.Unauthorized());
          const userId = payload._id;
          resolve(userId);
        }
      );
    });
  },
};
