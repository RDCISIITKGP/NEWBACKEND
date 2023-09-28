import express from "express"
import { getDevices } from "./device.controller"

const router = express.Router()

// @desc - Route to get all the device masters
// @returns - Lists of all device masters
// router.get("/", getDevices)

export default router
