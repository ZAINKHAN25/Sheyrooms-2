const express = require("express");
const { listAll, getRoom } = require("../controllers/room");

const router = express.Router();

router.get("/rooms", listAll);
router.get("/room/:id", getRoom);

module.exports = router;
