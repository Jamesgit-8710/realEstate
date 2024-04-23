const express = require("express");
const router = express.Router();

router.use("/users", require("./user_route"));
router.use("/properties", require("./property_route"));

module.exports = router;
