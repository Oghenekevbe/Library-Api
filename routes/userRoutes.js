const express = require("express");
const { getUsers, getUser, updateUser, deleteUser, loginUser, registerUser } = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();



router.route("/")
    .get(validateToken, getUsers);

router.route("/:id")
    .get(validateToken, getUser)
    .put(validateToken, updateUser)
    .delete(validateToken, deleteUser);
router.post("/register", registerUser);

router.post("/login", loginUser);


module.exports = router;