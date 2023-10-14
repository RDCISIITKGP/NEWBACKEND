import logger from "./logger"
import { MongoClient, ServerApiVersion } from "mongodb"

const URI = "mongodb://nasim:nasim%40msf@103.154.184.52:27017"

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

const connectToDatabase = async () => {
    try {
        await client.connect()

        logger.info("Connected to database")
    } catch (err) {
        console.error({ error: err })
    }
}

const disconnectFromDatabase = async () => {
    await client.close()

    logger.info("Disconnected from database.")

    return
}

export { connectToDatabase, disconnectFromDatabase }
