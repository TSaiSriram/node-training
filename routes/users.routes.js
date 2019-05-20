const router = require("express").Router();
const userService = require("../services/users.service");
const updateValdation = require("../validation/update.validation");
const deleteValdation = require("../validation/delete.validate");
const expressJoi = require("express-joi-validator");
const verifyToken = require("../middleware/jwtTokenVerify");
/* GET all users  users listing. */
router.get("/allPosts", verifyToken.checkToken, userService.allPosts);
//Create send data
router.get("/allUsers", verifyToken.checkToken, userService.getUsers)
//User Search
router.post("/search", verifyToken.checkToken, userService.postSearchUsers);
// Update a single user
router.put(
  "/update/:userId",
  verifyToken.checkToken,
  expressJoi(updateValdation.updateUser),
  userService.putUser
);
//Soft delete a single user
router.delete(
  "/delete/:userId",
  verifyToken.checkToken,
  expressJoi(deleteValdation.deleteUser),
  userService.deleteUser
);


module.exports = router;
