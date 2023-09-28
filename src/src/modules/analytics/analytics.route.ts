import express from "express"
import { getGaugesData, getTimeWaveFormData } from "./analytics.controller"

const router = express.Router()

// router.put("/timeWaveForm", getTimeWaveFormData)
// router.put("/rms", getGaugesData)

export default router
