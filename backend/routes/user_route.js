const express = require("express");
const { user_controller } = require("../controllers");
const { verify_token } = require("../middleware");

const router = express.Router();

// router.route('/').post(user_controller.login_user).get(user_controller.verify_session).delete(user_controller.logout_user)
router.route('/login').post(user_controller.login_user)
router.route('/verify').get(verify_token, user_controller.verify_user)
router.route('/signup').post(user_controller.signup_user)

module.exports = router