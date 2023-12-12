const express = require("express");
const AuthConroller = require ("../controller/AuthConroller");
const JWT  = require("../helpers/jwt");
const verifyUserCookieAccessToken = JWT.verifyUserCookieAccessToken;
const router = express.Router();
router.post("/user/login", AuthConroller.login);
router.get("/user", verifyUserCookieAccessToken, AuthConroller.getUser);
router.post("/user/logout", verifyUserCookieAccessToken, AuthConroller.logout);
module.exports = router;
