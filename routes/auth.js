import express from "express";
import authController from "../controllers/auth.js";

const app = express();
app.use(express.urlencoded({ extended: false }));

const routerAuth = express.Router();

routerAuth.post("/login", authController.login, (req, res) => {
  console.log("login Route");
});


routerAuth.post("/register", authController.register, (req, res) => {
  console.log("register Route");
});

routerAuth.post("/deleteUser", authController.deleteUser, (req, res) => {
  console.log("delete User Route");
});

routerAuth.post("/editUser", authController.editUser, (req, res) => {
  console.log("Edit User Route");
});

routerAuth.post(
  "/updateProfile",
  authController.userUpdateProfile,
  (req, res) => {
    console.log("user update profile");
  }
);

routerAuth.post(
  "/adminUpdateUser",
  authController.adminEditUser,
  (req, res) => {
    console.log("admin update user");
  }
);

routerAuth.post("/editUser", authController.editUser, (req, res) => {
  console.log("Admin select User to edit");
});

routerAuth.get("/logout", authController.logout, (req, res) => {
  console.log("Log Out Route");
});

export default routerAuth;
