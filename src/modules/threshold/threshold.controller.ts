import { Request, Response } from "express"
import _ from "lodash"
import moment from "moment"
import { ObjectId } from "mongodb"
import { Document } from "mongodb"
import bcrypt from "bcryptjs"
import { METRIC_INFO, METRIC_INFO_PARSED, devices } from "../../constants"
import getLastDateOfMonth from "../../utils/getLastDateOfMonth"

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

export async function getFilteredData(req: Request, res: Response) {
    const { title: asset_id, startDate: startTime, endDate: endTime } = req.body

    await client.connect()

    const db = client.db("BSP")

    const rmsHistory4Col = db.collection("rmsHistory3")

    const lastDate = getLastDateOfMonth({
        date: new Date(endTime),
    })

    const thresholdsCursor = await rmsHistory4Col.find({
        asset_id,
        time: {
            $gte: new Date(startTime),
            $lte: lastDate,
        },
    })

    // merge the values of thresholds
    let thresholds = {
        asset_id: asset_id,
        y_rms_vel: [] as number[],
        y_rms_acl: [] as number[],
        x_rms_vel: [] as number[],
        z_rms_vel: [] as number[],
        x_rms_acl: [] as number[],
        z_rms_acl: [] as number[],
        time_up: [] as string[],
    }

    const all = await thresholdsCursor.toArray()

    if (all.length > 0) {
        console.log({ all, length: all[0]?.y_rms_vel?.length })
    }

    all.forEach((item: any) => {
        thresholds.y_rms_vel.push(...item.y_rms_acl)
        thresholds.y_rms_acl.push(...item.y_rms_acl)
        thresholds.x_rms_vel.push(...item.x_rms_vel)
        thresholds.z_rms_vel.push(...item.z_rms_vel)
        thresholds.x_rms_acl.push(...item.x_rms_acl)
        thresholds.z_rms_acl.push(...item.z_rms_acl)
        thresholds.time_up.push(...item.time_up)
    })

    const x_rms_acl = thresholds.x_rms_acl.filter((_, index) => {
        const time = new Date(thresholds.time_up[index])

        const startDate = new Date(startTime)
        const endDate = new Date(endTime)

        return time >= startDate && time <= endDate
    })

    const y_rms_acl = thresholds.y_rms_acl.filter((_, index) => {
        const time = new Date(thresholds.time_up[index])

        const startDate = new Date(startTime)
        const endDate = new Date(endTime)

        return time >= startDate && time <= endDate
    })

    const z_rms_acl = thresholds.z_rms_acl.filter((_, index) => {
        const time = new Date(thresholds.time_up[index])

        const startDate = new Date(startTime)
        const endDate = new Date(endTime)

        return time >= startDate && time <= endDate
    })

    const x_rms_vel = thresholds.x_rms_vel.filter((_, index) => {
        const time = new Date(thresholds.time_up[index])

        const startDate = new Date(startTime)
        const endDate = new Date(endTime)

        return time >= startDate && time <= endDate
    })

    const y_rms_vel = thresholds.y_rms_vel.filter((_, index) => {
        const time = new Date(thresholds.time_up[index])

        const startDate = new Date(startTime)
        const endDate = new Date(endTime)

        return time >= startDate && time <= endDate
    })

    const z_rms_vel = thresholds.z_rms_vel.filter((_, index) => {
        const time = new Date(thresholds.time_up[index])

        const startDate = new Date(startTime)
        const endDate = new Date(endTime)

        return time >= startDate && time <= endDate
    })

    const timeup = thresholds.time_up.filter((value) => {
        const time = new Date(value)

        const startDate = new Date(startTime)
        const endDate = new Date(endTime)

        return time >= startDate && time <= endDate
    })

    const allSet = [
        {
            x_rms_acl,
            y_rms_acl,
            z_rms_acl,
            x_rms_vel,
            y_rms_vel,
            z_rms_vel,
            timeup,
        },
    ]

    res.json(allSet)
}

export async function getFilteredDataFFT(req: Request, res: Response) {
    const h = req.body.title

    const start = moment(req.body.startDate).format("YYYY-MM-DDTHH:mm:ss") // Convert start date to matching format
    const end = moment(req.body.endDate).format("YYYY-MM-DDTHH:mm:ss") // Convert end date to matching format

    await client.connect()
    const db = client.db("BSP")
    const collectionUser = db.collection("analytics")
    const query = {
        start_time: { $gte: start, $lte: end },
        asset_id: h,
    }

    const result = await collectionUser.find(query).toArray()

    let start_time = []
    for (let x of result) {
        start_time.push(x.start_time)
    }
    const new_start_time = [...start_time.reverse()]

    const allSet = [
        {
            results: result,
            start_times: new_start_time,
        },
    ]

    res.json(allSet)
}

export async function getUpdatedData(req: Request, res: Response) {
    const h = req.body.title

    await client.connect()
    const db = client.db("BSP")
    const collectionUser = db.collection("rmsHistory3")
    const thresholds = await collectionUser.find({ asset_id: h })

    let all = {
        asset_id: h,
        y_rms_vel: [] as number[],
        y_rms_acl: [] as number[],
        x_rms_vel: [] as number[],
        z_rms_vel: [] as number[],
        x_rms_acl: [] as number[],
        z_rms_acl: [] as number[],
        time_up: [] as string[],
    }
    const thresholdsArray = await thresholds.toArray()

    thresholdsArray.forEach((item: any) => {
        thresholds.y_rms_vel.push(...item.y_rms_acl)
        thresholds.y_rms_acl.push(...item.y_rms_acl)
        thresholds.x_rms_vel.push(...item.x_rms_vel)
        thresholds.z_rms_vel.push(...item.z_rms_vel)
        thresholds.x_rms_acl.push(...item.x_rms_acl)
        thresholds.z_rms_acl.push(...item.z_rms_acl)
        thresholds.time_up.push(...item.time_up)
    })

    // all[0].x_rms_acl.splice(0, all[0].x_rms_acl.length - 300)
    // all[0].y_rms_acl.splice(0, all[0].y_rms_acl.length - 300)
    // all[0].z_rms_acl.splice(0, all[0].z_rms_acl.length - 300)
    // console.log("checkpoimt")
    // console.log(all[0].x_rms_acl)
    // console.log("checkpoimt")
    // console.log(all)
    const x_rms_acll = [...all.x_rms_acl.slice(-1)]
    const y_rms_acll = [...all.y_rms_acl.slice(-1)]
    const z_rms_acll = [...all.z_rms_acl.slice(-1)]
    const timeUps = [...all.time_up.slice(-1)]

    const timeUp = timeUps.map((dateTimeString) => {
        const dateObj = new Date(dateTimeString)
        const year = dateObj.getUTCFullYear()
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0") // Months are zero-based, so adding 1
        const day = dateObj.getUTCDate().toString().padStart(2, "0")
        const hours = dateObj.getUTCHours().toString().padStart(2, "0")
        const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0")
        const seconds = dateObj.getUTCSeconds().toString().padStart(2, "0")

        const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

        return dateTime
    })

    const allSet = [
        {
            x_rms_acl: x_rms_acll,
            y_rms_acl: y_rms_acll,
            z_rms_acl: z_rms_acll,
            timeup: timeUp,
        },
    ]

    res.json(allSet)
}

export async function getRMSData(
    req: Request<{}, {}, {}, { asset_id: string }>,
    res: Response
) {
    const asset_id = req.query.asset_id

    console.log({ asset_id })
    await client.connect()
    const db = client.db("BSP")
    const collectionUser = db.collection("rmsHistory3")

    const currentYear = new Date().getFullYear()

    const yearStart = new Date(currentYear, 0, 1, 0, 0, 0, 0)

    const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59, 999)

    // see if the 'year' of createdAt matches with the current year
    const thresholds = await collectionUser.find({
        asset_id,
        time: {
            $gte: yearStart,
            $lte: yearEnd,
        },
    })

    // merge the values of thresholds
    let combinedthredholds = {
        asset_id: asset_id,
        y_rms_vel: [] as number[],
        y_rms_acl: [] as number[],
        x_rms_vel: [] as number[],
        z_rms_vel: [] as number[],
        x_rms_acl: [] as number[],
        z_rms_acl: [] as number[],
        time_up: [] as string[],
    }

    const all = await thresholds.toArray()

    all.forEach((item: any) => {
        combinedthredholds.y_rms_vel.push(...item.y_rms_acl)
        combinedthredholds.y_rms_acl.push(...item.y_rms_acl)
        combinedthredholds.x_rms_vel.push(...item.x_rms_vel)
        combinedthredholds.z_rms_vel.push(...item.z_rms_vel)
        combinedthredholds.x_rms_acl.push(...item.x_rms_acl)
        combinedthredholds.z_rms_acl.push(...item.z_rms_acl)
        combinedthredholds.time_up.push(...item.time_up)
    })

    const collection = db.collection("analytics")
    const collectionSummary = db.collection("summary")
    const currentDate = new Date()
    const dateString = currentDate.toISOString().substring(0, 10)

    const query2 = {
        asset_id,
    }

    // Getting recent summary
    const summary = await collectionSummary
        .find(query2)
        .sort({ _id: -1 })
        .limit(1)
        .toArray()

    console.log({ summary })

    const query = { asset_id } // Define the query to filter documents by asset_id

    const options = {
        sort: { _id: -1 }, // Sort in descending order based on _id field (assuming it represents document creation time)
        limit: 10, // Limit the result to 2 documents
    }

    const result = await collection.find(query, options).toArray()

    const collectionUser3 = db.collection("threshold")
    const objectId = "64918764fedaff5916642880"
    const query3 = { _id: new ObjectId(objectId) }
    const thresholds3 = await collectionUser3.findOne(query3)

    // const time1 = result[0].start_time
    // const time2 = result[1].start_time
    const start_time = []

    for (let x of result) {
        start_time.push(x.start_time)
    }

    const new_start_time = [...start_time.reverse()]

    const data1 = [...result[0].data["X-Axis Acceleration FFT"]]
    const dataString1 = data1.join("") // Join array elements into a single string
    const parsedData1 = JSON.parse(dataString1)
    const FFT_acc_x = parsedData1[0] // Access the inner array

    const data2 = [...result[0].data["Y-Axis Acceleration FFT"]]
    const dataString2 = data2.join("") // Join array elements into a single string
    const parsedData2 = JSON.parse(dataString2)
    const FFT_acc_y = parsedData2[0] // Access the inner array

    const data3 = [...result[0].data["Z-Axis Acceleration FFT"]]
    const dataString3 = data3.join("") // Join array elements into a single string
    const parsedData3 = JSON.parse(dataString3)
    const FFT_acc_z = parsedData3[0] // Access the inner array

    const data4 = [...result[0].data["X-Axis Velocity FFT"]]
    const dataString4 = data4.join("") // Join array elements into a single string
    const parsedData4 = JSON.parse(dataString4)
    const FFT_vel_x = parsedData4[0] // Access the inner array

    const data5 = [...result[0].data["Y-Axis Velocity FFT"]]
    const dataString5 = data5.join("") // Join array elements into a single string
    const parsedData5 = JSON.parse(dataString5)
    const FFT_vel_y = parsedData5[0] // Access the inner array

    const data6 = [...result[0].data["Z-Axis Velocity FFT"]]
    const dataString6 = data6.join("") // Join array elements into a single string
    const parsedData6 = JSON.parse(dataString6)
    const FFT_vel_z = parsedData6[0] // Access the inner array

    // all[0].x_rms_acl.splice(0, all[0].x_rms_acl.length - 300)
    // all[0].y_rms_acl.splice(0, all[0].y_rms_acl.length - 300)
    // all[0].z_rms_acl.splice(0, all[0].z_rms_acl.length - 300)
    // console.log("checkpoimt")
    // console.log(all[0].x_rms_acl)
    // console.log("checkpoimt")
    // console.log(all)
    const x_rms_acll = [...combinedthredholds.x_rms_acl.splice(-300)]
    const y_rms_acll = [...combinedthredholds.y_rms_acl.splice(-300)]
    const z_rms_acll = [...combinedthredholds.z_rms_acl.splice(-300)]
    const x_rms_vell = [...combinedthredholds.x_rms_vel.splice(-300)]
    const y_rms_vell = [...combinedthredholds.y_rms_vel.splice(-300)]
    const z_rms_vell = [...combinedthredholds.z_rms_vel.splice(-300)]

    const timeUp = [...combinedthredholds.time_up.splice(-300)]
    const times = timeUp.map((dateTimeString) => {
        const dateObj = new Date(dateTimeString)
        const year = dateObj.getUTCFullYear()
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0") // Months are zero-based, so adding 1
        const day = dateObj.getUTCDate().toString().padStart(2, "0")
        const hours = dateObj.getUTCHours().toString().padStart(2, "0")
        const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0")
        const seconds = dateObj.getUTCSeconds().toString().padStart(2, "0")

        const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

        return dateTime
    })

    const allSet = [
        {
            x_rms_acl: x_rms_acll,
            y_rms_acl: y_rms_acll,
            z_rms_acl: z_rms_acll,
            x_rms_vel: x_rms_vell,
            y_rms_vel: y_rms_vell,
            z_rms_vel: z_rms_vell,
            timeup: times,
            results: result,
            asset_id,
            start_times: new_start_time,
            FFT_xacc: FFT_acc_x,
            FFT_yacc: FFT_acc_y,
            FFT_zacc: FFT_acc_z,
            FFT_xvel: FFT_vel_x,
            FFT_yvel: FFT_vel_y,
            FFT_zvel: FFT_vel_z,
            threshold: thresholds3,
            summary: summary,
        },
    ]

    res.json(allSet)
}

export async function getThresholds(req: Request, res: Response) {
    await client.connect()
    const db = client.db("BSP")
    // 64918764fedaff5916642880
    const collectionUser = db.collection("threshold")
    const objectId = "64918764fedaff5916642880"
    const query = { _id: new ObjectId(objectId) }
    const thresholds = await collectionUser.findOne(query)

    res.json(thresholds)
}

export async function getSavedData(req: Request, res: Response) {
    const h = { ...req.body.update }
    delete h._id // Exclude the _id field from the update
    const k = req.body.update
    if (h || k) {
        console.log(req.body)
        console.log(h)
        console.log(k)
    }
    await client.connect()
    const db = client.db("BSP")
    // 64918764fedaff5916642880
    const collectionUser = db.collection("threshold")
    const objectId = new ObjectId("64918764fedaff5916642880")
    const filter = { _id: objectId }
    const update = { $set: h } // Replace with your update operation

    const result = await collectionUser.updateOne(filter, update)

    console.log(`Matched count: ${result.matchedCount}`)
    console.log(`Modified count: ${result.modifiedCount}`)

    const query = { _id: new ObjectId(objectId) }
    const thresholds = await collectionUser.findOne(query)

    res.json(thresholds)
}

export const getMetrics = async (
    req: Request<
        {},
        {},
        {},
        {
            assetId: string
            startTime?: string
            endTime?: string
            isRealtime: string
        }
    >,
    res: Response
) => {
    const { assetId, endTime, isRealtime, startTime } = req.query

    const realtime = JSON.parse(isRealtime)

    console.log({ assetId, endTime, isRealtime, startTime })

    await client.connect()

    // Getting predictions 2 data
    const db = client.db("BSP")

    const predictions2Collection = db.collection("predictions_2")

    let predictions2Cursor

    if (realtime) {
        console.log("realtime")
        predictions2Cursor = predictions2Collection
            .find({ "Asset Id": assetId })
            .sort({ _id: -1 })
            .limit(10)
    } else {
        console.log("not realtime")
        predictions2Cursor = predictions2Collection.find({
            "Asset Id": assetId,
            "Start Time of the document": {
                $gte: startTime,
                $lte: endTime,
            },
        })
    }

    const thresholds: Document[] = await predictions2Cursor.toArray()

    // Looping through all the documents
    const returnData = thresholds.map((threshold) => {
        const finalStatePredicted = threshold["Final State Predicted: "]

        console.log({ finalStatePredicted })

        // @ts-ignore
        const bp = METRIC_INFO[finalStatePredicted?.toLowerCase()]

        // Start time
        const start_time = threshold["Start Time of the document"]

        // Extra trees
        const a_v_et = threshold["Anomalous Vibration_et"]
        const m_et = threshold["Misalignment_et"]
        const l_et = threshold["Looseness_et"]

        let et

        if (
            finalStatePredicted?.toLowerCase() === "healthy" ||
            finalStatePredicted?.toLowerCase() === "no data found" ||
            finalStatePredicted?.toLowerCase() === "no rms values found"
        ) {
            // @ts-ignore
            et = METRIC_INFO[finalStatePredicted?.toLowerCase()]
        } else if (a_v_et > m_et && a_v_et > l_et) {
            // Anomalous Vibration is the maximum
            // Perform operations for Anomalous Vibration

            et = METRIC_INFO_PARSED.anomalous
        } else if (m_et > a_v_et && m_et > l_et) {
            // Misalignment is the maximum
            // Perform operations for Misalignment

            et = METRIC_INFO_PARSED.misalignment
        } else if (l_et > a_v_et && l_et > m_et) {
            // Looseness is the maximum
            // Perform operations for Looseness

            et = METRIC_INFO_PARSED.looseness
        } else {
            et = METRIC_INFO_PARSED.healthy
            // Two or more variables are equal (or all are equal)
            // You can handle this case as needed
        }

        // K nearest neighbour
        const a_v_knn = threshold["Anomalous Vibration_knn"]
        const m_knn = threshold["Misalignment_knn"]
        const l_knn = threshold["Looseness_knn"]

        let knn

        if (
            finalStatePredicted?.toLowerCase() === "healthy" ||
            finalStatePredicted?.toLowerCase() === "no data found" ||
            finalStatePredicted?.toLowerCase() === "no rms values found"
        ) {
            // @ts-ignore
            knn = METRIC_INFO[finalStatePredicted?.toLowerCase()]
        } else if (a_v_knn > m_knn && a_v_knn > l_knn) {
            // Anomalous Vibration is the maximum
            // Perform operations for Anomalous Vibration

            knn = METRIC_INFO_PARSED.anomalous
        } else if (m_knn > a_v_knn && m_knn > l_knn) {
            // Misalignment is the maximum
            // Perform operations for Misalignment

            knn = METRIC_INFO_PARSED.misalignment
        } else if (l_knn > a_v_knn && l_knn > m_knn) {
            // Looseness is the maximum
            // Perform operations for Looseness

            knn = METRIC_INFO_PARSED.looseness
        } else {
            knn = METRIC_INFO_PARSED.healthy
            // Two or more variables are equal (or all are equal)
            // You can handle this case as needed
        }

        // Random forest
        const a_v_rf = threshold["Anomalous Vibration_rf"]
        const m_rf = threshold["Misalignment_rf"]
        const l_rf = threshold["Looseness_rf"]

        let rf

        if (
            finalStatePredicted?.toLowerCase() === "healthy" ||
            finalStatePredicted?.toLowerCase() === "no data found" ||
            finalStatePredicted?.toLowerCase() === "no rms values found"
        ) {
            // @ts-ignore
            rf = METRIC_INFO[finalStatePredicted?.toLowerCase()]
        } else if (a_v_rf > m_rf && a_v_rf > l_rf) {
            // Anomalous Vibration is the maximum
            // Perform operations for Anomalous Vibration

            rf = METRIC_INFO_PARSED.anomalous
        } else if (m_rf > a_v_rf && m_rf > l_rf) {
            // Misalignment is the maximum
            // Perform operations for Misalignment

            rf = METRIC_INFO_PARSED.misalignment
        } else if (l_rf > a_v_rf && l_rf > m_rf) {
            // Looseness is the maximum
            // Perform operations for Looseness

            rf = METRIC_INFO_PARSED.looseness
        } else {
            rf = METRIC_INFO_PARSED.healthy
            // Two or more variables are equal (or all are equal)
            // You can handle this case as needed
        }

        return {
            bp,
            start_time,
            et,
            knn,
            rf,
        }
    })

    console.log({ returnData })

    res.send(realtime ? returnData?.reverse() : returnData)
}

export const getLatestMetrics = async (req: Request, res: Response) => {
    await client.connect()

    // Getting predictions 2 data
    const db = client.db("BSP")

    const predictions2Collection = db.collection("predictions_2")

    let thresholds = []

    for (let i = 0; i < devices.length; i++) {
        const { asset_id } = devices[i]

        const prediction2Cursor = predictions2Collection
            .find({
                "Asset Id": asset_id,
            })
            .sort({ _id: -1 })
            .limit(1)

        const threshold: Document[] = await prediction2Cursor.toArray()

        thresholds.push(threshold[0])
    }

    let returnData = {}

    // Looping through all the documents
    for (let i = 0; i < thresholds.length; i++) {
        const threshold = thresholds[i]

        const finalStatePredicted = threshold["Final State Predicted: "]

        // @ts-ignore
        const bp = METRIC_INFO[finalStatePredicted?.toLowerCase()]

        // Extra trees
        const a_v_et = threshold["Anomalous Vibration_et"]
        const m_et = threshold["Misalignment_et"]
        const l_et = threshold["Looseness_et"]

        let et

        if (
            finalStatePredicted?.toLowerCase() === "healthy" ||
            finalStatePredicted?.toLowerCase() === "no data found" ||
            finalStatePredicted?.toLowerCase() === "no rms values found"
        ) {
            // @ts-ignore
            et = METRIC_INFO[finalStatePredicted?.toLowerCase()]
        } else if (a_v_et > m_et && a_v_et > l_et) {
            // Anomalous Vibration is the maximum
            // Perform operations for Anomalous Vibration

            et = METRIC_INFO_PARSED.anomalous
        } else if (m_et > a_v_et && m_et > l_et) {
            // Misalignment is the maximum
            // Perform operations for Misalignment

            et = METRIC_INFO_PARSED.misalignment
        } else if (l_et > a_v_et && l_et > m_et) {
            // Looseness is the maximum
            // Perform operations for Looseness

            et = METRIC_INFO_PARSED.looseness
        } else {
            et = METRIC_INFO_PARSED.healthy
            // Two or more variables are equal (or all are equal)
            // You can handle this case as needed
        }

        // K nearest neighbour
        const a_v_knn = threshold["Anomalous Vibration_knn"]
        const m_knn = threshold["Misalignment_knn"]
        const l_knn = threshold["Looseness_knn"]

        let knn

        if (
            finalStatePredicted?.toLowerCase() === "healthy" ||
            finalStatePredicted?.toLowerCase() === "no data found" ||
            finalStatePredicted?.toLowerCase() === "no rms values found"
        ) {
            // @ts-ignore
            knn = METRIC_INFO[finalStatePredicted?.toLowerCase()]
        } else if (a_v_knn > m_knn && a_v_knn > l_knn) {
            // Anomalous Vibration is the maximum
            // Perform operations for Anomalous Vibration

            knn = METRIC_INFO_PARSED.anomalous
        } else if (m_knn > a_v_knn && m_knn > l_knn) {
            // Misalignment is the maximum
            // Perform operations for Misalignment

            knn = METRIC_INFO_PARSED.misalignment
        } else if (l_knn > a_v_knn && l_knn > m_knn) {
            // Looseness is the maximum
            // Perform operations for Looseness

            knn = METRIC_INFO_PARSED.looseness
        } else {
            knn = METRIC_INFO_PARSED.healthy
            // Two or more variables are equal (or all are equal)
            // You can handle this case as needed
        }

        // Random forest
        const a_v_rf = threshold["Anomalous Vibration_rf"]
        const m_rf = threshold["Misalignment_rf"]
        const l_rf = threshold["Looseness_rf"]

        let rf

        if (
            finalStatePredicted?.toLowerCase() === "healthy" ||
            finalStatePredicted?.toLowerCase() === "no data found" ||
            finalStatePredicted?.toLowerCase() === "no rms values found"
        ) {
            // @ts-ignore
            rf = METRIC_INFO[finalStatePredicted?.toLowerCase()]
        } else if (a_v_rf > m_rf && a_v_rf > l_rf) {
            // Anomalous Vibration is the maximum
            // Perform operations for Anomalous Vibration

            rf = METRIC_INFO_PARSED.anomalous
        } else if (m_rf > a_v_rf && m_rf > l_rf) {
            // Misalignment is the maximum
            // Perform operations for Misalignment

            rf = METRIC_INFO_PARSED.misalignment
        } else if (l_rf > a_v_rf && l_rf > m_rf) {
            // Looseness is the maximum
            // Perform operations for Looseness

            rf = METRIC_INFO_PARSED.looseness
        } else {
            rf = METRIC_INFO_PARSED.healthy
            // Two or more variables are equal (or all are equal)
            // You can handle this case as needed
        }

        const assetId = threshold["Asset Id"]

        returnData = {
            ...returnData,
            [assetId]: {
                bp,
                et,
                knn,
                rf,
            },
        }
    }

    res.send(returnData)
}

export async function getFiltMetrics(req: Request, res: Response) {
    const h = req.body.title

    await client.connect()
    const db = client.db("BSP")
    const collectionUser = db.collection("predictions_2")

    const startDate = req.body.startDate.split("+")[0]
    const endDate = req.body.endDate.split("+")[0]

    const query = {
        "Start Time of the document": { $gte: startDate },
        "End Time of the document": { $lte: endDate },
        "Asset Id": h,
    }

    console.log({ query })

    function isObjectEmpty(obj: Record<string, any>): boolean {
        return Object.keys(obj).length === 0
    }

    const thresholds = await collectionUser.find(query).toArray()

    const result = thresholds.map((document: Document) => {
        const anomalousVibrationEt = document["Anomalous Vibration_et"]
        const anomalousVibrationKnn = document["Anomalous Vibration_knn"]
        const anomalousVibrationRf = document["Anomalous Vibration_rf"]
        const bestPredictions = document["Final State Predicted: "]
        const misalignmentEt = document.Misalignment_et
        const misalignmentKnn = document.Misalignment_knn
        const misalignmentRf = document.Misalignment_rf
        const loosenessEt = document.Looseness_et
        const loosenessKnn = document.Looseness_knn
        const loosenessRf = document.Looseness_rf

        const start_time = document["Start Time of the document"]
        let bp = 0

        if (bestPredictions == "HEALTHY") {
            bp = 0
        } else if (bestPredictions == "LOOSENESS FAULT DETECTED") {
            bp = 1
        } else if (bestPredictions == "MISCELLANEOUS VIBRATION DETECTED") {
            bp = 2
        } else if (bestPredictions == "ANOMALOUS VIBRATION DETECTED") {
            bp = 3
        } else if (bestPredictions == "NO RMS VALUES FOUND") {
            bp = 4
        } else {
            bp = 5
        }

        let et = 0
        let knn = 0
        let rf = 0

        //////////////////////////////////////PASTE HERE
        if (bestPredictions == "HEALTHY") {
            bp = 0
        } else if (bestPredictions == "LOOSENESS FAULT DETECTED") {
            bp = 1
        } else if (bestPredictions == "MISCELLANEOUS VIBRATION DETECTED") {
            bp = 2
        } else if (bestPredictions == "ANOMALOUS VIBRATION DETECTED") {
            bp = 3
        } else if (bestPredictions == "NO RMS VALUES FOUND") {
            bp = 4
        } else {
            bp = 5
        }

        if (
            loosenessEt == 0 &&
            misalignmentEt == 0 &&
            anomalousVibrationEt == 0
        ) {
            ////////////////////////////////
            if (bestPredictions == "HEALTHY") {
                et = 0
            } else if (bestPredictions == "LOOSENESS FAULT DETECTED") {
                et = 1
            } else if (bestPredictions == "MISCELLANEOUS VIBRATION DETECTED") {
                et = 2
            } else if (bestPredictions == "ANOMALOUS VIBRATION DETECTED") {
                et = 3
            } else if (bestPredictions == "NO RMS VALUES FOUND") {
                et = 4
            } else {
                et = 5
            }
            ///////////////////////////////
        } else if (
            loosenessEt > misalignmentEt &&
            loosenessEt > anomalousVibrationEt
        ) {
            et = 1
        } else if (
            misalignmentEt > loosenessEt &&
            misalignmentEt > anomalousVibrationEt
        ) {
            et = 2
        } else if (
            anomalousVibrationEt > loosenessEt &&
            anomalousVibrationEt > misalignmentEt
        ) {
            et = 3
        } else {
            et = 0
        }

        /////////////////ET

        if (
            loosenessKnn == 0 &&
            misalignmentKnn == 0 &&
            anomalousVibrationKnn == 0
        ) {
            ////////////////////////////////
            if (bestPredictions == "HEALTHY") {
                knn = 0
            } else if (bestPredictions == "LOOSENESS FAULT DETECTED") {
                knn = 1
            } else if (bestPredictions == "MISCELLANEOUS VIBRATION DETECTED") {
                knn = 2
            } else if (bestPredictions == "ANOMALOUS VIBRATION DETECTED") {
                knn = 3
            } else if (bestPredictions == "NO RMS VALUES FOUND") {
                knn = 4
            } else {
                knn = 5
            }
            ///////////////////////////////
        } else if (
            loosenessKnn > misalignmentKnn &&
            loosenessKnn > anomalousVibrationKnn
        ) {
            knn = 1
        } else if (
            misalignmentKnn > loosenessKnn &&
            misalignmentKnn > anomalousVibrationKnn
        ) {
            knn = 2
        } else if (
            anomalousVibrationKnn > loosenessKnn &&
            anomalousVibrationKnn > misalignmentKnn
        ) {
            knn = 3
        } else {
            knn = 0
        }

        ///////////////////////////////KNN
        if (
            loosenessRf == 0 &&
            misalignmentRf == 0 &&
            anomalousVibrationRf == 0
        ) {
            ////////////////////////////////
            if (bestPredictions == "HEALTHY") {
                rf = 0
            } else if (bestPredictions == "LOOSENESS FAULT DETECTED") {
                rf = 1
            } else if (bestPredictions == "MISCELLANEOUS VIBRATION DETECTED") {
                rf = 2
            } else if (bestPredictions == "ANOMALOUS VIBRATION DETECTED") {
                rf = 3
            } else if (bestPredictions == "NO RMS VALUES FOUND") {
                rf = 4
            } else {
                rf = 5
            }
            ///////////////////////////////
        } else if (
            loosenessRf > misalignmentRf &&
            loosenessRf > anomalousVibrationRf
        ) {
            rf = 1
        } else if (
            misalignmentRf > loosenessRf &&
            misalignmentRf > anomalousVibrationRf
        ) {
            rf = 2
        } else if (
            anomalousVibrationRf > loosenessRf &&
            anomalousVibrationRf > misalignmentRf
        ) {
            rf = 3
        } else {
            rf = 0
        }
        ///////////RF

        if (isObjectEmpty(document)) {
            et = 5
            rf = 5
            knn = 5
            bp = 5
        }

        return { et, knn, rf, bp, start_time }
    })

    res.send(result)
}

export async function getUsers(req: Request, res: Response) {
    await client.connect()
    const db = client.db("BSP")
    // 64918764fedaff5916642880
    const collectionUser = db.collection("users")
    const cursor = collectionUser.find()
    const users = await cursor.toArray()

    res.send(users)
}

export async function register(req: Request, res: Response) {
    await client.connect()
    const db = client.db("BSP")
    // 64918764fedaff5916642880
    const collectionUser = db.collection("users")
    const fullName = req.body.fullName
    const password = req.body.pass
    const email = req.body.email
    const phone = req.body.phone

    const role = req.body.role

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    ////////
    const documentToUpload = {
        // Define the fields and values of your document here
        name: fullName,
        email: email,
        phone: phone,
        role: role,
        password: hashedPassword,
        profileImage:
            "https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.p…",
    }

    console.log(documentToUpload)
    const result = await collectionUser.insertOne(documentToUpload)
    res.send(result)

    console.log("Document uploaded with ID:", result.insertedId)
}
