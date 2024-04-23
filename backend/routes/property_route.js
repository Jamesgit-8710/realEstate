const express = require("express");
const { user_controller, property_controller } = require("../controllers");
const { verify_token } = require("../middleware");

const router = express.Router();

router.route('/').post(verify_token,property_controller.register_property).get(property_controller.get_property_list);

module.exports = router