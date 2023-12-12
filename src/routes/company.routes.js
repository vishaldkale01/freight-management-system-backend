const  express = require("express")
const CompanyController = require("../controller/SuperAdmin/company/CompanyController");
const upload = require("../middleware/fileupload");
// import JWT from "../helpers/jwt";
// import upload from "../middlewares/upload";
const router = express.Router();
router.post("/", upload.single("image") ,  CompanyController.addCompany);
// router.put("/:id", upload.single("image"), CompanyController.updateCompany);
router.get("/", CompanyController.getCompanies);
router.get("/:id", CompanyController.getCompany);
module.exports = router
// export default router;
