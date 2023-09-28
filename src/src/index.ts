const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const helmet = require("helmet")
const {
    connectToDatabase,
    disconnectFromDatabase,
} = require("./utils/database")
import mongoose from "mongoose"
import dataRoute from "./modules/analytics/analytics.route"
import { analyticsSchema } from "./modules/analytics/analytics.schema"
import deviceRoute from "./modules/device/device.route"
import userRoute from "./modules/user/user.route"
import thresholdRoute from "./modules/threshold/threshold.route"

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

// app.get('/fakeUser', async (req, res) => {
//     const user = new User({ email: 'colt@gmail.com', username: 'Colt' });
//     const newUser = await User.register(user, 'chicken');
//     res.send(newUser);

// })

const server = app.listen(4000, async () => {
    await connectToDatabase()

    console.log(`Server listening at http://localhost/4000`)
})

// OnChange Streams
// mongoose.connection.once("open", () => {
//     console.log("MongoDB database connected")

//     const analyticsChangeStream = mongoose.connection
//         .collection("analytics")
//         .watch()

//     analyticsChangeStream.on("change", (change) => {
//         if (change.operationType === "insert") {
//             const newDocument = change.fullDocument
//             console.log("New document inserted: ", newDocument)
//         }
//     })
// })

const signals = ["SIGTERM", "SIGINT"]

const gracefulShutdown = (signal: any) => {
    process.on(signal, async () => {
        console.log("Goodbye, got signal", signal)
        server.close()

        await disconnectFromDatabase()

        // disconnect from the db.

        console.log("My work here is done ")

        process.exit(0)
    })
}

// Running graceful shutdown if we get the signal.
for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
}

// const mongoose = require('mongoose');
// //mongodb://127.0.0.1:27017/yelp-camp
//  const dbUrl = process.env.DB_URL;

// const port = process.env.PORT || 3000

// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// ////////////////////////////////////////////////////////////

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// })
