const express = require("express")
const authRoutes = require("./auth.routes")
const companyRoutes = require("./company.routes")
const customersRoutes = require("./user.routes")
const clientRoutes = require("./client.routes")
const driverRoute = require("./Driver.route")
const driverDocuments = require("./driverDocumetns")
const country = require("./country.route")
const vehicleRoute = require("./vehicle.routes")
const booking = require("./booking.routes")
// const routeController = require("../controller/borderRoutes/borderRouteController").default
const borderroute = require("./routeBorder.router")
// const JWT = require("../helpers/jwt")
// const verifyUserCookieAccessToken = JWT.verifyUserCookieAccessToken;
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/user" , customersRoutes)
router.use("/client" , clientRoutes )
// router.use("/company", verifyUserCookieAccessToken, companyRoutes);
router.use("/company",  companyRoutes);
router.use("/drivers",  driverRoute);
router.use("/",  driverDocuments);
router.use("/location",  country);
router.use("/vehicles",  vehicleRoute);
router.use("/routes",  borderroute); // border routess
router.use("/bookings", booking ); // border routess

module.exports = router;
