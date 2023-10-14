import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import { connectToDatabase, disconnectFromDatabase } from "./utils/database"
import dataRoute from "./modules/analytics/analytics.route"
import deviceRoute from "./modules/device/device.route"
import userRoute from "./modules/user/user.route"
import thresholdRoute from "./modules/threshold/threshold.route"
import scheduleEmailtask from "./modules/email/scheduleTask"
import scheduleSummarytask from "./modules/summary/scheduleTask"

//options for cors midddleware
const options = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false,
}

dotenv.config()

// Initializing express app.
const app = express()
const PORT = process.env.PORT

app.use(cookieParser())
app.use(express.json())
app.use(cors(options))
app.use(helmet())

// Routes
app.use("/api/analytics", dataRoute)
app.use("/api/devices", deviceRoute)
app.use("/api/users", userRoute)
app.use("/api/threshold", thresholdRoute)

const server = app.listen(4000, async () => {
    await connectToDatabase()

    await scheduleEmailtask()

    await scheduleSummarytask()

    console.log(`Server listening at http://localhost/4000`)
})

const signals = ["SIGTERM", "SIGINT"]

const gracefulShutdown = (signal: any) => {
    process.on(signal, async () => {
        console.log("Goodbye, got signal", signal)
        server.close()

        // disconnect from the db.
        await disconnectFromDatabase()

        console.log("My work here is done ")

        process.exit(0)
    })
}

// Running graceful shutdown if we get the signal.
for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
}
