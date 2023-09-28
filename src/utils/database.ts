import mongoose from "mongoose"
import logger from "./logger"
import dotenv from "dotenv"
import moment from "moment-timezone"
const { ObjectId } = require("mongodb")
import { Document } from "mongodb"

///////////////////////////////////////
//nasim:nasim%40msf@103.154.184.52:27017/
////////////////////////////////////////////////////
//My code
const { MongoClient, ServerApiVersion } = require("mongodb")
const uri = "mongodb://nasim:nasim%40msf@103.154.184.52:27017"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

let k = 0
export async function connectToDatabase() {
    try {
        console.log("running you idiot code")
        // await client.connect()
        // const db = client.db("BSP")

        // const collection = db.collection("predictions_2")
        // const query = {
        //     "Final State Predicted: ": {
        //         $nin: [
        //             "HEALTHY",
        //             "LOOSENESS FAULT DETECTED",
        //             "ANOMALOUS VIBRATION DETECTED",
        //             "NO RMS VALUES FOUND",
        //         ],
        //     },
        // }

        // // Use the distinct method with the query to find unique values in the "Final State Predicted" field
        // const thresholds = await collection.find(query).toArray()
        // console.log(thresholds)

        /////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////REAL OBSERVATION
        ////////////////////////////////////////////////////////////////
        // const unique_id = [
        //     "6d7f45c0-3039-11ed-81ef-d732cfd46ac3",
        //     "6d9083d0-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8fc080-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a6950-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7ea980-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8fe790-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8f4b50-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7ea981-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a1b31-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7f45c2-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8f7261-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a4241-3039-11ed-81ef-d732cfd46ac3",
        //     "6d973a90-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8fe791-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8b7ac0-3039-11ed-81ef-d732cfd46ac3",
        //     "6d9083d1-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a1b33-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8e8800-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a1b32-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a4240-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7f45c1-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7ea982-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a1b30-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7f93e0-3039-11ed-81ef-d732cfd46ac3",
        // ]
        // await client.connect()
        // const db = client.db("BSP")

        // const collection = db.collection("analytics")

        // ////////////////////////////
        // const collectionUser = db.collection("rmsHistory2")
        // /////////////////////////////////////
        // const collectionThresh = db.collection("threshold")
        // //////////////////////////////
        // const collectionSummary = db.collection("summary")
        // ///////////////////////////////////
        // const currentDate = new Date()
        // const dateString = currentDate.toISOString().substring(0, 10)
        // //////////////////////////////
        // function getTodayIST(): string {
        //     const todayIST = moment
        //         .tz("Asia/Kolkata")
        //         .format("YYYY-MM-DDTHH:mm:ss")
        //     return todayIST
        // }

        // function getYesterdayMidnightIST(): string {
        //     const yesterdayMidnightIST = moment
        //         .tz("Asia/Kolkata")
        //         .subtract(1, "day")
        //         .startOf("day")
        //         .format("YYYY-MM-DDTHH:mm:ss")
        //     return yesterdayMidnightIST
        // }

        // const todayIST = getTodayIST()
        // console.log(todayIST) // Output format: "YYYY-MM-DDTHH:mm:ss"

        // const yesterdayMidnightIST = getYesterdayMidnightIST()
        // console.log(yesterdayMidnightIST)
        // const startTimeMin = "2023-09-21T13:00:00"
        // const startTimeMax = "2023-09-22T00:00:00"

        // ///
        // ////
        // const objectId = "64918764fedaff5916642880"
        // const query1 = { _id: new ObjectId(objectId) }
        // const thresholds = await collectionThresh.findOne(query1)

        // ////
        // const result: {
        //     operational?: number
        //     caution?: number
        //     warning?: number
        //     date?: string
        //     asset_id?: string
        // } = {}

        // for (const id of unique_id) {
        //     ++k

        //     console.log(`process running for this id ${id}`)
        //     const query = {
        //         start_time: { $gte: startTimeMin, $lte: startTimeMax },
        //         asset_id: id,
        //     }

        //     const count = await collection.countDocuments(query)
        //     console.log("process1 completed")

        //     ///////////////////////////////////////

        //     ////////////////////////////////
        //     const thresholds_value = await collectionUser.find({
        //         asset_id: id,
        //     })
        //     const all = await thresholds_value.toArray()
        //     console.log("process2 completed")

        //     const x_rms_vell = [...all[0].x_rms_vel]
        //     const y_rms_vell = [...all[0].y_rms_vel]
        //     const z_rms_vell = [...all[0].z_rms_vel]

        //     /////   CAUTION
        //     const x_rms_caution = x_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].X_Axis_Velocity_Time_Waveform["caution"]
        //     )
        //     const y_rms_caution = y_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].Y_Axis_Velocity_Time_Waveform["caution"]
        //     )
        //     const z_rms_caution = z_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].Z_Axis_Velocity_Time_Waveform["caution"]
        //     )

        //     console.log("process3 completed")

        //     //WARNING
        //     const x_rms_warning = x_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].X_Axis_Velocity_Time_Waveform["warning"]
        //     )
        //     const y_rms_warning = y_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].Y_Axis_Velocity_Time_Waveform["warning"]
        //     )
        //     const z_rms_warning = z_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].X_Axis_Velocity_Time_Waveform["warning"]
        //     )
        //     ///////////////

        //     console.log(x_rms_caution.length)
        //     console.log(y_rms_caution.length)
        //     console.log(z_rms_caution.length)

        //     const caution =
        //         ((x_rms_caution.length +
        //             y_rms_caution.length +
        //             z_rms_caution.length) /
        //             (x_rms_vell.length +
        //                 y_rms_vell.length +
        //                 z_rms_vell.length)) *
        //         100

        //     const warning =
        //         ((x_rms_warning.length +
        //             y_rms_warning.length +
        //             z_rms_warning.length) /
        //             (x_rms_vell.length +
        //                 y_rms_vell.length +
        //                 z_rms_vell.length)) *
        //         100

        //     console.log(caution)
        //     console.log(warning)

        //     console.log("process4 completed")

        //     const operational = (count / 30) * 100
        //     result.operational = operational
        //     result.caution = caution
        //     result.warning = warning
        //     result.date = dateString
        //     result.asset_id = id
        //     ///////////////////

        //     const insertResult = await collectionSummary.insertOne(result)
        //     console.log("Data inserted successfully:", insertResult)

        ///////////////////////
        ///
        // }

        console.log("yeh is done")
        /////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////REAL OBSERVATION
        /////////////////////////////////////////////////////////////////////

        /////////////////

        // Function to schedule the function to run at 11:30 PM IST

        // const unique_id = [
        //     "6d7f45c0-3039-11ed-81ef-d732cfd46ac3",
        //     "6d9083d0-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8fc080-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a6950-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7ea980-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8fe790-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8f4b50-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7ea981-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a1b31-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7f45c2-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8f7261-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a4241-3039-11ed-81ef-d732cfd46ac3",
        //     "6d973a90-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8fe791-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8b7ac0-3039-11ed-81ef-d732cfd46ac3",
        //     "6d9083d1-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a1b33-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8e8800-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a1b32-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a4240-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7f45c1-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7ea982-3039-11ed-81ef-d732cfd46ac3",
        //     "6d8a1b30-3039-11ed-81ef-d732cfd46ac3",
        //     "6d7f93e0-3039-11ed-81ef-d732cfd46ac3",
        // ]
        // await client.connect()
        // const db = client.db("BSP")

        // const collection = db.collection("analytics")

        // ////////////////////////////
        // const collectionUser = db.collection("rmsHistory2")
        // /////////////////////////////////////
        // const collectionThresh = db.collection("threshold")
        // //////////////////////////////
        // const collectionSummary = db.collection("summary")
        // ///////////////////////////////////
        // const currentDate = new Date()
        // const dateString = currentDate.toISOString().substring(0, 10)
        // //////////////////////////////
        // function getTodayIST(): string {
        //     const todayIST = moment
        //         .tz("Asia/Kolkata")
        //         .format("YYYY-MM-DDTHH:mm:ss")
        //     return todayIST
        // }

        // function getYesterdayMidnightIST(): string {
        //     const yesterdayMidnightIST = moment
        //         .tz("Asia/Kolkata")
        //         .subtract(1, "day")
        //         .startOf("day")
        //         .format("YYYY-MM-DDTHH:mm:ss")
        //     return yesterdayMidnightIST
        // }

        // const todayIST = getTodayIST()
        // console.log(todayIST) // Output format: "YYYY-MM-DDTHH:mm:ss"

        // const yesterdayMidnightIST = getYesterdayMidnightIST()
        // console.log(yesterdayMidnightIST)
        // const startTimeMin = "2023-07-25T13:00:00"
        // const startTimeMax = "2023-07-26T00:00:00"

        // ///
        // ////
        // const objectId = "64918764fedaff5916642880"
        // const query1 = { _id: new ObjectId(objectId) }
        // const thresholds = await collectionThresh.findOne(query1)

        // ////
        // const result: {
        //     operational?: number
        //     caution?: number
        //     warning?: number
        //     date?: string
        //     asset_id?: string
        // } = {}

        // for (const id of unique_id) {
        //     ++k

        //     console.log(`process running for this id ${id}`)
        //     const query = {
        //         start_time: { $gte: startTimeMin, $lte: startTimeMax },
        //         asset_id: id,
        //     }

        //     const count = await collection.countDocuments(query)
        //     console.log("process1 completed")

        //     ///////////////////////////////////////

        //     ////////////////////////////////
        //     const thresholds_value = await collectionUser.find({
        //         asset_id: id,
        //     })
        //     const all = await thresholds_value.toArray()
        //     console.log("process2 completed")

        //     const x_rms_vell = [...all[0].x_rms_vel]
        //     const y_rms_vell = [...all[0].y_rms_vel]
        //     const z_rms_vell = [...all[0].z_rms_vel]

        //     /////   CAUTION
        //     const x_rms_caution = x_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].X_Axis_Velocity_Time_Waveform["caution"]
        //     )
        //     const y_rms_caution = y_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].Y_Axis_Velocity_Time_Waveform["caution"]
        //     )
        //     const z_rms_caution = z_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].Z_Axis_Velocity_Time_Waveform["caution"]
        //     )

        //     console.log("process3 completed")

        //     //WARNING
        //     const x_rms_warning = x_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].X_Axis_Velocity_Time_Waveform["warning"]
        //     )
        //     const y_rms_warning = y_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].Y_Axis_Velocity_Time_Waveform["warning"]
        //     )
        //     const z_rms_warning = z_rms_vell.filter(
        //         (value) =>
        //             parseInt(value) >
        //             thresholds[id].X_Axis_Velocity_Time_Waveform["warning"]
        //     )
        //     ///////////////

        //     console.log(x_rms_caution.length)
        //     console.log(y_rms_caution.length)
        //     console.log(z_rms_caution.length)

        //     const caution =
        //         ((x_rms_caution.length +
        //             y_rms_caution.length +
        //             z_rms_caution.length) /
        //             (x_rms_vell.length +
        //                 y_rms_vell.length +
        //                 z_rms_vell.length)) *
        //         100

        //     const warning =
        //         ((x_rms_warning.length +
        //             y_rms_warning.length +
        //             z_rms_warning.length) /
        //             (x_rms_vell.length +
        //                 y_rms_vell.length +
        //                 z_rms_vell.length)) *
        //         100

        //     console.log(caution)
        //     console.log(warning)

        //     console.log("process4 completed")

        //     const operational = (count / 30) * 100
        //     result.operational = operational
        //     result.caution = caution
        //     result.warning = warning
        //     result.date = dateString
        //     result.asset_id = id
        /////////////////////
        // Insert the data into the collection

        // const insertResult = await collectionSummary.insertOne(result)
        // console.log("Data inserted successfully:", insertResult)

        /////////////////////////
        /////
        // }

        // console.log("yeh is done")
        ////
        /////////////
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close()
    }
}

///////////////////////////////////////////////////
////////////////////////////////////////////////////

//////////////////////////////////////////////////
// const { MongoClient } = require("mongodb")
// const uri =
//     "mongodb+srv://test:test@cluster0.0m748e0.mongodb.net/?retryWrites=true&w=majority"
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// //////////////////////////////////////////////////////

// dotenv.config()

// mongoose.set("strictQuery", true)

// const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || ""

// Function to connect to the mongodb database.
// export const connectToDatabase = async () => {
//     try {
//         console.log("connection is done. dont worry")
//         await client.connect()
//         const databasesList = await client.db().admin().listDatabases()
//         console.log(databasesList)
//     } catch (e) {
//         console.log("error aa gya bhai")
//         console.error(e)
//     } finally {
//         await client.close()
//     }
// }

export const disconnectFromDatabase = async () => {
    await mongoose.connection.close()

    logger.info("Disconnected from database.")

    return
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

////////IMP CODE
// const unique_id = ["6d9083d0-3039-11ed-81ef-d732cfd46ac3"]
// await client.connect()
// const db = client.db("BSP")
// const collection = db.collection("analytics")
// ////////////////////////////
// const collectionUser = db.collection("rmsHistory2")
// /////////////////////////////////////
// const collectionThresh = db.collection("threshold")
// //////////////////////////////
// const collectionSummary = db.collection("summary")
// ///////////////////////////////////
// const currentDate = new Date()
// const dateString = currentDate.toISOString().substring(0, 10)
// //////////////////////////////
// function getTodayIST(): string {
//     const todayIST = moment
//         .tz("Asia/Kolkata")
//         .format("YYYY-MM-DDTHH:mm:ss")
//     return todayIST
// }

// function getYesterdayMidnightIST(): string {
//     const yesterdayMidnightIST = moment
//         .tz("Asia/Kolkata")
//         .subtract(1, "day")
//         .startOf("day")
//         .format("YYYY-MM-DDTHH:mm:ss")
//     return yesterdayMidnightIST
// }

// const todayIST = getTodayIST()
// console.log(todayIST) // Output format: "YYYY-MM-DDTHH:mm:ss"

// const yesterdayMidnightIST = getYesterdayMidnightIST()
// console.log(yesterdayMidnightIST)
// const startTimeMin = "2023-06-04T00:00:00"
// const startTimeMax = "2023-06-05T00:00:00"

// ///
// ////
// const objectId = "64918764fedaff5916642880"
// const query1 = { _id: new ObjectId(objectId) }
// const thresholds = await collectionThresh.findOne(query1)

// ////
// const result: {
//     operational?: number
//     caution?: number
//     warning?: number
//     date?: string
//     asset_id?: string
// } = {}

// for (const id of unique_id) {
//     const query = {
//         start_time: { $gte: yesterdayMidnightIST, $lte: todayIST },
//         asset_id: id,
//     }

//     const count = await collection.countDocuments(query)

//     ///////////////////////////////////////

//     ////////////////////////////////
//     const thresholds_value = await collectionUser.find({ asset_id: id })
//     const all = await thresholds_value.toArray()

//     const x_rms_vell = [...all[0].x_rms_vel]
//     const y_rms_vell = [...all[0].y_rms_vel]
//     const z_rms_vell = [...all[0].z_rms_vel]

//     /////   CAUTION
//     const x_rms_caution = x_rms_vell.filter(
//         (value) =>
//             parseInt(value) >
//             thresholds[id].X_Axis_Velocity_Time_Waveform["caution"]
//     )
//     const y_rms_caution = y_rms_vell.filter(
//         (value) =>
//             parseInt(value) >
//             thresholds[id].Y_Axis_Velocity_Time_Waveform["caution"]
//     )
//     const z_rms_caution = z_rms_vell.filter(
//         (value) =>
//             parseInt(value) >
//             thresholds[id].Z_Axis_Velocity_Time_Waveform["caution"]
//     )

//     //WARNING
//     const x_rms_warning = x_rms_vell.filter(
//         (value) =>
//             parseInt(value) >
//             thresholds[id].X_Axis_Velocity_Time_Waveform["warning"]
//     )
//     const y_rms_warning = y_rms_vell.filter(
//         (value) =>
//             parseInt(value) >
//             thresholds[id].Y_Axis_Velocity_Time_Waveform["warning"]
//     )
//     const z_rms_warning = z_rms_vell.filter(
//         (value) =>
//             parseInt(value) >
//             thresholds[id].X_Axis_Velocity_Time_Waveform["warning"]
//     )
//     ///////////////

//     console.log(x_rms_caution.length)
//     console.log(y_rms_caution.length)
//     console.log(z_rms_caution.length)

//     const caution =
//         ((x_rms_caution.length +
//             y_rms_caution.length +
//             z_rms_caution.length) /
//             (x_rms_vell.length +
//                 y_rms_vell.length +
//                 z_rms_vell.length)) *
//         100

//     const warning =
//         ((x_rms_warning.length +
//             y_rms_warning.length +
//             z_rms_warning.length) /
//             (x_rms_vell.length +
//                 y_rms_vell.length +
//                 z_rms_vell.length)) *
//         100

//     console.log(caution)
//     console.log(warning)

//     const operational = (count / 25) * 100
//     result.operational = operational
//     result.caution = caution
//     result.warning = warning
//     result.date = dateString
//     result.asset_id = id
//     /////////////////////
//     // Insert the data into the collection
//     const insertResult = await collectionSummary.insertOne(result)

//     console.log("Data inserted successfully:", insertResult)
//     /////////////////////////
//     /////
// }

// console.log("yeh is done")
