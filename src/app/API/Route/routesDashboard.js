const express = require("express");
const route = express.Router();
const ControllerDashboard = require("../Controller/ControllerDashBoard");

route.get("/totalItem", ControllerDashboard.getCountItem);
route.get("/totalCustomer", ControllerDashboard.getCountCustomer);
route.get("/totalStaff", ControllerDashboard.getCountStaff)

module.exports = route;