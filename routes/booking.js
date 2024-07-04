const express = require("express");
const { bookRoom } = require("../controllers/booking");

const router = express.Router();

router.post("/reservations", bookRoom);

module.exports = router;
