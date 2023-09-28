import express from "express"
const router = express.Router()
import {
    getMe,
    getUsers,
    loginUser,
    registerUser,
    deleteUser,
    updateUser,
} from "./user.controller"
import { request } from "http"
const { protect } = require("../../middlewares/auth.middleware")

/**
 @desc - Inserts a new user into the database.
 @params - Email, Password, Name.
 @returns - The new user created (_id, name, email, token). 
 */
router.post("/", registerUser)

/**
 @desc - Logs in a registered user.
 @params - Email, Password.
 @returns - The new user created (_id, name, email, token). 
 */
router.post("/login", loginUser)

/**
 @desc - Gets the currently logged in user.
 @headers - Authentication token.
 @returns - The logged in user. 
 @middleware - Checks and verifies the jwt authentication token.
 */
router.get("/me", protect, getMe)

/**
 @desc - Gets all the current users.
 @returns - All the current users of the application. 
 */
router.get("/all", getUsers)

/**
 @desc - Deletes the user with the given id.
 @headers - Authentication token.
 @returns - Returns the if of the user deleted. 
 @middleware - Checks and verifies the jwt authentication token.
 */
router.delete("/:id", protect, deleteUser)

/**
 @desc - Updates the user with the given id.
 @headers - Authentication token.
 @returns - Returns the new user updated. 
 @middleware - Checks and verifies the jwt authentication token.
 */
router.delete("/:id", protect, updateUser)

export default router
