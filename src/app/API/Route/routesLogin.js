const express = require('express')
const router = express.Router();
const ControllerLogin = require('../Controller/ControllerLogin');
const ControllerMiddleware = require('../Controller/ControllerMiddleware')

router.post("/", ControllerLogin.getData);
router.get("/protected", ControllerMiddleware.getAuthorToken,  ControllerLogin.getData);
router.put("/update", ControllerLogin.editUser);
router.delete("/delete", ControllerLogin.deleteUser);
router.post("/insert", ControllerLogin.createUser);


module.exports = router
