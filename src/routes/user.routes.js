const  express = require("express");
const { createUser, getUsers, findUserById, updateUser } = require("../controller/customers/customersController");
const router = express.Router();
// router.post(
//   "/",
//   upload.single("image"),
//   verifyUserCookieAccessToken,
//   UserController.addUser
// );
router.post("/customers" , createUser)
router.get("/" , getUsers)
router.get('/users/:id', findUserById)
router.put('/:id', updateUser)
// router.put(
//   "/:id",a
//   upload.single("image"),
//   verifyUserCookieAccessToken,
//   UserController.updateUser
// );
// router.put("/password/:id", UserController.resetPassword);
// router.get("/", UserController.getUsers);
// router.get("/:id", UserController.getUser);
// router.delete("/:id", verifyUserCookieAccessToken, UserController.deleteUser);
// router.get("/constituency/:id", UserController.getUsersByConstituency);
module.exports = router;
