const { Router } = require("express")
const ControllerOrder = require("../Controller/ControllerOrder")
const router = Router();

router.post("/submit", ControllerOrder.InsertOrder);

module.exports = router;