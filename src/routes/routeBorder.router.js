const  express = require("express");
const { createRoute, getAllRoutes , updateRouteById , getRouteById , deleteRouteById , createBorder} = require("../controller/borderRoute/borderRouteController");
const verifyMiddleware = require("../middleware/verifyUniqueMiddlware");
const { border } = require("../model");
const   router = express.Router();

const check = verifyMiddleware(border)

router.post("/" , check , createRoute)
router.post("/border" , check , createBorder)
router.get("/" , getAllRoutes)
router.get('/:id', getRouteById)
router.put('/:id', updateRouteById)
router.delete('/:id', deleteRouteById)

module.exports = router;
