const express = require('express')
const router = express.Router();
const ControllerLogin = require('../Controller/ControllerLogin');
const ControllerMiddleware = require('../Controller/ControllerMiddleware');

router.post("/", ControllerLogin.getData);

router.get("/protected", ControllerMiddleware.getAuthorToken,  (req, res) => {
    res.status(200).send(`Hello, ${req.user.username}!`);
});

//router.get("/detail/:id", ControllerLogin.getDetailUser);

router.put("/update", ControllerLogin.editUser);
//router.delete("/delete", ControllerLogin.delete);
router.post("/insert", ControllerLogin.createUser);

module.exports = router
