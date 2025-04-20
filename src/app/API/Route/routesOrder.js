const { Router } = require("express")
const ControllerOrder = require("../Controller/ControllerOrder")
const router = Router();

router.post("/submit", ControllerOrder.InsertOrder);
router.post("/detailOrder", ControllerOrder.InsertDetailOrder);
router.get("/user/:id", ControllerOrder.GetOrderByID);
router.get("/:id", ControllerOrder.GetDetailOfOrder);

module.exports = router;