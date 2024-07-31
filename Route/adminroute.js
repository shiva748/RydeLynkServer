const express = require("express");
const Router = express.Router();
const {
  citysearch,
  a_Login,
  a_authenticate,
  a_searchOperator,
  a_logout,
  getOperatormedia,
  a_verifyOperator,
  a_suspendOperator,
  a_activateOperator,
  a_SearchDrivers,
  getDrivermedia,
  a_approveDriver,
  a_suspendDriver,
  a_activateDriver,
  a_SearchCab,
  getCabmedia,
  a_approveCab,
  a_verifyCab,
  a_suspendCab,
  a_SearchUser,
  getUsermedia,
  a_deleteDriver,
  a_deleteOperator,
  a_deleteCab,
} = require("../Controller/controller");
const verifyToken = require("../Middleware/adminauth");
// === === === login === === === //

Router.post("/login", a_Login);

Router.get("/profile", verifyToken, a_authenticate);

Router.get("/logout", verifyToken, a_logout);

Router.post("/suggest/city", verifyToken, citysearch);

Router.post("/operator/search", verifyToken, a_searchOperator);

Router.post("/operator/verify", verifyToken, a_verifyOperator);

Router.post("/operator/suspend", verifyToken, a_suspendOperator);

Router.post("/operator/activate", verifyToken, a_activateOperator);

Router.get("/operator/media/:OperatorId/:File", verifyToken, getOperatormedia);

Router.post("/operator/delete", verifyToken, a_deleteOperator);

Router.post("/driver/search", verifyToken, a_SearchDrivers);

Router.get("/driver/media/:DriverId/:File", verifyToken, getDrivermedia);

Router.post("/driver/approve", verifyToken, a_approveDriver);

Router.post("/driver/suspend", verifyToken, a_suspendDriver);

Router.post("/driver/activate", verifyToken, a_activateDriver);

Router.post("/driver/delete", verifyToken, a_deleteDriver);

Router.post("/cab/search", verifyToken, a_SearchCab);

Router.get("/cab/media/:CabId/:File", verifyToken, getCabmedia);

Router.post("/cab/verify", verifyToken, a_verifyCab);

Router.post("/cab/suspend", verifyToken, a_suspendCab);

Router.post("/cab/delete", verifyToken, a_deleteCab);

Router.post("/user/search", verifyToken, a_SearchUser);

Router.get("/user/media/:UserId/:File", verifyToken, getUsermedia);

module.exports = Router;
