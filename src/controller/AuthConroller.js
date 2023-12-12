const createHttpError =  require("http-errors")
const JWT =  require("../helpers/jwt");
const db =  require("../model/index");
const bcrypt =  require("bcrypt");
const moment =  require("moment");
const { AuthSchema } = require=("../validators/AuthValidator");
const User = db.users;
const signUserAccessToken = JWT.signUserAccessToken;
const signUserRefreshToken = JWT.signUserRefreshToken;
module.exports = {
  register: async (req, res, next) => {},
  login: async (req, res, next) => {
    try {
      await AuthSchema.validateAsync(req.body).catch((error) => {
        throw createHttpError.BadRequest();
      });
      const { username, password } = req.body;
      const user = await User.findOne({
        where: { phone: username },
        attributes: ["id", "name", "phone", "email", "password"],
      }).catch((err) => {
        throw createHttpError.InternalServerError(err);
      });
      if (!user)
        throw createHttpError.Unauthorized("Invalid username/password");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        throw createHttpError.Unauthorized("Invalid username/password");
      const accessToken = await signUserAccessToken(user.id);
      // const refreshToken = await signUserRefreshToken(user.id);
      res.cookie("session", accessToken, {
        httpOnly: true,
        secure: true,
        // domain: "",
        sameSite: "None",
        // sameSite: false,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      res.status(200).send({
        status: true,
        user: {
          name: user.name,
          phone: user.phone,
          email: user.email,
        },
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ status: false, message: error.message || "" });
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      // const { token } = req.body;
      // if (!token) throw createHttpError.BadRequest();
      // const accessToken = await signAccessToken(userId);
      // const refreshToken = await signRefreshToken(userId);
      res.send({
        status: true,
        //accessToken: accessToken,
        //refreshToken: refreshToken,
      });
    } catch (err) {
      res.status(err.status || 500).send({ status: false });
    }
  },
  logout: async (req, res, next) => {
    try {
      // Delete refresh token from table refresh token
      res.clearCookie("session").status(200).send({ status: true });
    } catch (err) {
      res.status(500).send({ status: false });
    }
  },
  getUser: async (req, res, next) => {
    try {
      const id = req.payload._id;
      const data = await User.findOne({
        where: { id },
        attributes: ["id", "name", "phone", "email"],
      }).catch(() => {
        throw createHttpError.InternalServerError();
      });
      if (!data) throw createHttpError.InternalServerError();
      res.status(200).send({ status: true, data });
    } catch (err) {
      res
        .status(err.status || 500)
        .send({ status: false, message: err.message || "" });
    }
  },
};
