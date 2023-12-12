const  express = require("express");
const { createRoute, getAllRoutes , updateRouteById , getRouteById , deleteRouteById} = require("../controller/borderRoute/borderRouteController");
const   router = express.Router();

router.post("/" , createRoute)
router.get("/" , getAllRoutes)
router.get('/:id', getRouteById)
router.put('/:id', updateRouteById)
router.delete('/:id', deleteRouteById)

module.exports = router;
