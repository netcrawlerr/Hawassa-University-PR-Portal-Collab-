import {
  getAllUsers,
  addUser,
  getUser,
  getUserByID,
  deleteUserFromDB,
  userDBUpdateProfile,
  adminUpdateUserDB,
} from "../Database/database.js";

import bcrypt from "bcrypt";
import { log } from "console";
import jwt from "jsonwebtoken";
import { promisify } from "util";

// Login
const login = async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = await getUser(username);
  console.log("User is", user);

  if (
    user &&
    username === user.username &&
    (await bcrypt.compare(password, user.password))
  ) {
    // Saturday March 4 2024 Work Starts Here by adding jwttokens
    const id = user.id;
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRIES_IN,
    });

    console.log("Token is", token);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    // setup cookie
    res.cookie("jwt", token, cookieOptions);

    console.log("Finished Setting up Cookies");
    res.status(200).redirect("/userDashboard");
  } else {
    res.render("login", {
      loginErrorMessage: "incorrect credentials",
    });
    console.log("Couldn't authenticate");
  }
  next();
};

// Register User
const register = async (req, res, next) => {
  const { username, password, firstName, lastName, email, position } = req.body;
  const allUsers = await getAllUsers();
  const allUsernames = [...allUsers.map((user) => user.username)];

  if (allUsernames.includes(username)) {
    return res.status(400).render("../views/Admin/register", {
      message: "Username already Taken",
    });
  } else {
    console.log("Username can be used");
    const addedUser = await addUser(
      username,
      password,
      firstName,
      lastName,
      email,
      position
    );
    console.log("Adding User ....");
    console.log(addedUser);
    console.log("User Added");
    res.redirect("/userDashboard");
  }

  next();
};

const userUpdateProfile = async (req, res, next) => {
  const { username, firstName, lastName, email } = req.body;
  console.log("From userUpdateProfile", username, firstName, lastName, email);
  const user = await userDBUpdateProfile(username, firstName, lastName, email);
  res.redirect("/profile", 200, { user });

  next();
};

const adminEditUser = async (req, res) => {
  const { username, firstName, lastName, password, position, email } = req.body;
  const users = await getAllUsers();

  console.log(
    "Data received from frontend:",
    username,
    lastName,
    password,
    position,
    email
  );

  const user = await adminUpdateUserDB(
    username,
    firstName,
    lastName,
    password,
    position,
    email
  );

  console.log("User object retrieved from the database:", user);
  res.render("../views/Admin/editUser", { users, user });
};

const deleteUser = async (req, res, next) => {
  const { username } = req.body;
  const user = await getUser(username);
  console.log("User to be deleted", user);

  if (user && username === user.username) {
    const deletedUser = await deleteUserFromDB(username);
    console.log("User Deleted");
    res.redirect("/deleteUser?message=User Deleted");
  } else {
    console.log("Cant delete user");
    res.redirect("/deleteUser?message=User Not Found");
  }
  next();
};

const editUser = async (req, res, next) => {
  const { username, firstName, lastName, password, position, email } = req.body;

  console.log(
    "EDIT USER",
    username,
    firstName,
    lastName,
    password,
    position,
    email
  );
  const user = await getUser(username);
  const users = await getAllUsers();

  console.log("From editUser user to be edited by admin", user);

  if (user) {
    res.render("../views/Admin/editUser", { user, users });
  } else {
    res.render("../views/Admin/editUser", { users, message: "User not found" });
  }

  next();
};
/**
 * <> Middleware setup
 * <> Routing
 * <> Protecting Pages
 * <> Hierarchical Dashboard
 * <> Submitting
 * <> Fetching
 * <> Updating
 * <> Editing Options
 * <> compiling Options
 *
 *
 *
 */

const isLoggedIn = async (req, res, next) => {
  // console.log("Cookies:", req.cookies);
  if (req.cookies.jwt) {
    try {
      // check if token exist for the user
      const decodedToken = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log("Decoded Token:", decodedToken);

      // Check if decodedToken is valid and has expected structure
      if (!decodedToken || !decodedToken.id) {
        return next(); // Proceed to next middleware or route
      }

      // check if user still exist
      const returnedUser = await getUserByID(decodedToken.id);
      console.log("Returned From DB: ", returnedUser);

      // Ensure returnedUser exists and has the necessary properties
      if (!returnedUser || returnedUser.length === 0) {
        return next(); // Proceed to next middleware or route
      }

      // req.user = returnedUser[0];

      /*
      setting user variable in request body so i can 
      use it to protect urls and "Display user Name"

      <> i can add other fields like 
      // first name and last name to get it later 
      */

      req.user = {
        id: returnedUser[0].id,
        username: returnedUser[0].username,
        firstName: returnedUser[0].firstName,
        lastName: returnedUser[0].lastName,
        email: returnedUser[0].email,
        position: returnedUser[0].position,
      };

      console.log("req.user set to:", req.user);
      return next();
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
};

// logout
const logout = async (req, res) => {
  // overwrite the previos cookie
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  // redirect to login page
  res.status(200).redirect("/");
};

export default {
  login,
  register,
  userUpdateProfile,
  adminEditUser,
  deleteUser,
  editUser,
  isLoggedIn,
  logout,
};
