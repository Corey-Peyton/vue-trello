const express = require("express");
const passport = require("passport");

const passportAuthenticated = require("../../subscriber/passportAuthenticated");
const sameUserRequired = require("../../subscriber/sameUserRequired");
const userController = require("../../controller/user/userController");
const { getUserByUsername } = require("../../service/user/getUser");

/* eslint-disable-next-line */
const router = express.Router();

router.get("/login/success", async (req, res) => {
  const user = await getUserByUsername(req.user.username);
  res.status(200).send(user);
});
router.get("/login/failure", (req, res) => {
  res.status(401).send("401 - Unauthorized (Auth0 error)");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/login/success",
    failureRedirect: "/users/login/failure",
    failureFlash: true,
    passReqToCallback: true,
  })
);

router.get("/isConnected", passportAuthenticated, (req, res) => {
  res.status(200).send(req.user);
});

router.get("/logout", passportAuthenticated, (req, res) => {
  res.clearCookie("connect.sid");
  res.status(200).send();
});

router.post("/register", userController.register);

router.get("/", passportAuthenticated, userController.getAll);

router.get("/:username", passportAuthenticated, userController.getOne);

router.put(
  "/:username",
  passportAuthenticated,
  sameUserRequired,
  userController.update
);

router.put(
  "/:username/password",
  passportAuthenticated,
  sameUserRequired,
  userController.updatePassword
);

router.delete(
  "/:username",
  passportAuthenticated,
  sameUserRequired,
  userController.delete
);

module.exports = router;
