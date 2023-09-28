import mongoose from "mongoose"
import logger from "./logger"
import dotenv from "dotenv"
import moment from "moment"

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

export async function connectToDatabase() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect()
        const db = client.db("BSP")
        const collectionUser = db.collection("analytics")

        const users = await collectionUser
            .find()
            .sort({ _id: -1 })
            .limit(10)
            .toArray()

        console.log(users)

        console.log("yeh is done")
        /////////
        ////////
        ////////

        // const start = moment("2023-06-11T10:50:26.000Z").format(
        //     "YYYY-MM-DDTHH:mm:ss"
        // ) // Convert start date to matching format
        // const end = moment("2023-06-11T15:50:26.000Z").format(
        //     "YYYY-MM-DDTHH:mm:ss"
        // ) // Convert end date to matching format
        // console.log(end)
        // await client.connect()
        // const db = client.db("BSP")
        // const collectionUser = db.collection("analytics")
        // const query = {
        //     start_time: { $gte: start, $lte: end },
        // }

        // const result = await collectionUser.find(query).toArray()
        // console.log(result)

        // const REAL = await client.db("BSP").listCollections().toArray() // Returns a promise that will resolve to the list of the collections
        // console.log(typeof REAL)
        // console.log(REAL)
        // // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 })
        // console.log(
        //     "Pinged your deployment. You successfully connected to MongoDB!"
        // )
        // const databasesList = await client.db().admin().listDatabases()
        // console.log(databasesList.databases)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close()
    }
}
connectToDatabase().catch(console.dir)
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
