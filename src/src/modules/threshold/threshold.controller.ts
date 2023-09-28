import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import _ from "lodash"
import { ThresholdModel } from "./threshold.model"
import { ThresholdBody } from "./threshold.schema"
import moment from "moment"
import { ObjectId } from "mongodb"
//////////////////////////////////////////////////////
////////////////////////////////////////////////////
//MONGODB
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
//////////////////////////////////////////////////////
//////////////////////////////////////

////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////FILTERED DATA
export async function getFilteredData(req: Request, res: Response) {
    const h = req.body.title
    const start = req.body.startDate
    const end = req.body.endDate
    console.log(start)
    console.log(end)

    await client.connect()
    const db = client.db("BSP")
    const collectionUser = db.collection("rmsHistory2")
    const thresholds = await collectionUser.find({ asset_id: h })
    const all = await thresholds.toArray()
    //////////////////////////////////////////////////
    const dateString2: string = start
    const [datePart, offsetPart] = dateString2.split("+")

    const formattedDateString: string = `${datePart}Z`

    console.log("Formatted Date:", formattedDateString)
    console.log("Offset Part:", offsetPart)

    // You can also create a specific date and time
    const specificDate: Date = new Date(formattedDateString)

    // You can convert the date to a string to store it in MongoDB
    const dateString: string = specificDate.toISOString()

    // To retrieve the date from MongoDB and convert it back to a Date object
    const startTime: Date = new Date(dateString)

    /////////////////////////////////////////////////END TIME STARTETED
    const dateString3: string = end
    const [datePart3, offsetPart3] = dateString3.split("+")

    const formattedDateString3: string = `${datePart3}Z`

    console.log("Formatted Date:", formattedDateString3)
    console.log("Offset Part:", offsetPart3)
    const specificDate1: Date = new Date(formattedDateString3)
    const dateString1: string = specificDate1.toISOString()
    const endTime: Date = new Date(dateString1)

    ////////////////////////////////

    const filteredTimes: string[] = all[0].time_up.filter(
        (dateTimeString: string) => {
            const currentDate: Date = new Date(dateTimeString)
            return currentDate >= startTime && currentDate <= endTime
        }
    )

    const times: string[] = filteredTimes.map((dateTimeString: string) => {
        const dateObj: Date = new Date(dateTimeString)
        const formattedDateTime: string = dateObj
            .toISOString()
            .replace("T", " ")
            .slice(0, -1)
        return formattedDateTime
    })

    const one: any = filteredTimes[0]
    const two: any = filteredTimes[filteredTimes.length - 1]

    const startIndex: number = all[0].time_up.findIndex(
        (date: string) => date === one
    )
    const endIndex: number = all[0].time_up.findIndex(
        (date: string) => date === two
    )

    console.log(endIndex)

    const x_rms_acll: any[] = [
        ...all[0].x_rms_acl.slice(startIndex, endIndex + 1),
    ]
    const y_rms_acll: any[] = [
        ...all[0].y_rms_acl.slice(startIndex, endIndex + 1),
    ]
    const z_rms_acll: any[] = [
        ...all[0].z_rms_acl.slice(startIndex, endIndex + 1),
    ]

    const x_rms_vell: any[] = [
        ...all[0].x_rms_vel.slice(startIndex, endIndex + 1),
    ]

    const y_rms_vell: any[] = [
        ...all[0].y_rms_vel.slice(startIndex, endIndex + 1),
    ]
    const z_rms_vell: any[] = [
        ...all[0].z_rms_vel.slice(startIndex, endIndex + 1),
    ]

    const allSet = [
        {
            x_rms_acl: x_rms_acll,
            y_rms_acl: y_rms_acll,
            z_rms_acl: z_rms_acll,
            x_rms_vel: x_rms_vell,
            y_rms_vel: y_rms_vell,
            z_rms_vel: z_rms_vell,
            timeup: times,
        },
    ]

    console.log(allSet)

    res.json(allSet)

    ////////////////////////////////////////
    ///////////////////////////////////////////
}
//////////////////////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////%FILTERED DATA

export async function getFilteredDataFFT(req: Request, res: Response) {
    const h = req.body.title
    console.log("FILTERING REQUEST STARTED ")
    console.log("FILTERING REQUEST STARTED ")
    console.log("FILTERING REQUEST STARTED ")

    console.log("FILTERING REQUEST STARTED ")
    // const start = req.body.startDate
    // const end = req.body.endDate
    console.log(req.body.startDate)
    console.log(req.body.endDate)
    const start = moment(req.body.startDate).format("YYYY-MM-DDTHH:mm:ss") // Convert start date to matching format
    const end = moment(req.body.endDate).format("YYYY-MM-DDTHH:mm:ss") // Convert end date to matching format
    console.log(end)
    await client.connect()
    const db = client.db("BSP")
    const collectionUser = db.collection("analytics")
    const query = {
        start_time: { $gte: start, $lte: end },
        asset_id: h,
    }

    const result = await collectionUser.find(query).toArray()
    console.log(result)
    let start_time = []
    for (let x of result) {
        start_time.push(x.start_time)
    }
    const new_start_time = [...start_time.reverse()]

    ///////////////////////////FFT X ACC

    const allSet = [
        {
            results: result,
            start_times: new_start_time,
        },
    ]

    /////////////////////////////////////// testedsubject
    ////////////////////////////////////////

    ////////////////////////////////////////
    ///////////////////////////////////////////

    res.json(allSet)
}

////////////////////////////////////////////////
//////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////\
export async function getUpdatedData(req: Request, res: Response) {
    const h = req.body.title
    console.log("new id is here")
    console.log("new id is here")
    console.log(h)
    console.log("new id is here")
    console.log("new id is here")
    await client.connect()
    const db = client.db("BSP")
    const collectionUser = db.collection("rmsHistory2")
    const thresholds = await collectionUser.find({ asset_id: h })
    const all = await thresholds.toArray()
    // all[0].x_rms_acl.splice(0, all[0].x_rms_acl.length - 300)
    // all[0].y_rms_acl.splice(0, all[0].y_rms_acl.length - 300)
    // all[0].z_rms_acl.splice(0, all[0].z_rms_acl.length - 300)
    // console.log("checkpoimt")
    // console.log(all[0].x_rms_acl)
    // console.log("checkpoimt")
    // console.log(all)
    const x_rms_acll = [...all[0].x_rms_acl.slice(-1)]
    const y_rms_acll = [...all[0].y_rms_acl.slice(-1)]
    const z_rms_acll = [...all[0].z_rms_acl.slice(-1)]
    const timeUps = [...all[0].time_up.slice(-1)]
    console.log("checkout this")

    console.log("checkout this")
    const timeUp = timeUps.map((dateTimeString) => {
        const dateObj = new Date(dateTimeString)
        const year = dateObj.getUTCFullYear()
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0") // Months are zero-based, so adding 1
        const day = dateObj.getUTCDate().toString().padStart(2, "0")
        const hours = dateObj.getUTCHours().toString().padStart(2, "0")
        const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0")
        const seconds = dateObj.getUTCSeconds().toString().padStart(2, "0")

        const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

        console.log(dateTime)
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
///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

export async function getRMSData(req: Request, res: Response) {
    const h = req.body.title
    await client.connect()
    const db = client.db("BSP")
    const collectionUser = db.collection("rmsHistory2")
    const thresholds = await collectionUser.find({ asset_id: h })
    const all = await thresholds.toArray()
    /////
    const collection = db.collection("analytics")

    const query = { asset_id: h } // Define the query to filter documents by asset_id
    const options = {
        sort: { _id: -1 }, // Sort in descending order based on _id field (assuming it represents document creation time)
        limit: 10, // Limit the result to 2 documents
    }

    const result = await collection.find(query, options).toArray()

    ////////////////////////
    const collectionUser3 = db.collection("threshold")
    const objectId = "64918764fedaff5916642880"
    const query3 = { _id: new ObjectId(objectId) }
    const thresholds3 = await collectionUser3.findOne(query3)
    console.log(thresholds3)
    // const time1 = result[0].start_time
    // const time2 = result[1].start_time
    const start_time = []
    for (let x of result) {
        start_time.push(x.start_time)
    }

    console.log(start_time)
    const new_start_time = [...start_time.reverse()]

    console.log(new_start_time)

    ///////////////////////////FFT X ACC
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
    const x_rms_acll = [...all[0].x_rms_acl.splice(-300)]
    const y_rms_acll = [...all[0].y_rms_acl.splice(-300)]
    const z_rms_acll = [...all[0].z_rms_acl.splice(-300)]
    const x_rms_vell = [...all[0].x_rms_vel.splice(-300)]
    const y_rms_vell = [...all[0].y_rms_vel.splice(-300)]
    const z_rms_vell = [...all[0].z_rms_vel.splice(-300)]
    const timeUp = [...all[0].time_up.splice(-300)]
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
            asset_id: req.body.title,
            start_times: new_start_time,
            FFT_xacc: FFT_acc_x,
            FFT_yacc: FFT_acc_y,
            FFT_zacc: FFT_acc_z,
            FFT_xvel: FFT_vel_x,
            FFT_yvel: FFT_vel_y,
            FFT_zvel: FFT_vel_z,
            threshold: thresholds3,
        },
    ]

    /////////////////////////////////////// testedsubject
    ////////////////////////////////////////

    ////////////////////////////////////////
    ///////////////////////////////////////////

    res.json(allSet)
}
//////////////////////////////////////

export async function getThresholds(req: Request, res: Response) {
    console.log("yeghhh ")
    await client.connect()
    const db = client.db("BSP")
    // 64918764fedaff5916642880
    const collectionUser = db.collection("threshold")
    const objectId = "64918764fedaff5916642880"
    const query = { _id: new ObjectId(objectId) }
    const thresholds = await collectionUser.findOne(query)
    console.log(thresholds)

    res.json(thresholds)
}

export async function getSavedData(req: Request, res: Response) {
    console.log("yeghhh ")
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
    console.log(thresholds)
    res.json(thresholds)
}
