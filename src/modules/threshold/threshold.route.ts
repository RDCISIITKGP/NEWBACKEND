import express from "express"
import {
    // getThresholds,
    // setThresholds,
    getRMSData,
    getUpdatedData,
    getFilteredData,
    getFilteredDataFFT,
    getThresholds,
    getSavedData,
    getMetrics,
    getFiltMetrics,
    getUsers,
    register,
} from "./threshold.controller"

const router = express.Router()

//My code

// router.get("/", getThresholds)
router.post("/", getThresholds)
router.post("/filter", getFilteredData)
router.post("/filterfft", getFilteredDataFFT)
router.get("/rms", getRMSData)
router.post("/update", getUpdatedData)
router.post("/save", getSavedData)
router.post("/metrics", getMetrics)
router.post("/check", getFiltMetrics)
router.post("/users", getUsers)
router.post("/register", register)
// router.put("/", setThresholds)

export default router
