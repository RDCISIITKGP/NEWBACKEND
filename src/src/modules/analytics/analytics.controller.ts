import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import { DataModel } from "../analytics/analytics.model"
import _ from "lodash"
import getRms from "../../utils/getRms"
import { GaugeDoc } from "../../types"
import getAvg from "../../utils/getAvg"
import getMax from "../../utils/getMax"

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

export async function getTimeWaveFormData(
    req: Request<
        {},
        {},
        { start_time: string; end_time: string; asset_id: string }
    >,
    res: Response
) {
    const { start_time, end_time, asset_id } = req.body
    console.log(start_time)
    console.log(end_time)
    console.log(asset_id)
    console.log("time wave form data")

    let xAccData: number[] = []
    let yAccData: number[] = []
    let zAccData: number[] = []

    try {
        await client.connect()
        const db = client.db("BSP")
        const CollectionUser = db.collection("analytics")
        console.log("i m running time wave form data")

        const data = await CollectionUser.find(
            {
                asset_id,
                start_time: { $gte: start_time },
                end_time: { $lte: end_time },
            },
            {
                asset_id: 1,
                _id: 0,
                start_time: 1,
                end_time: 1,
                data: {
                    "X-Axis Acceleration Time Waveform FFT": 1,
                    "Z-Axis Acceleration Time Waveform FFT": 1,
                    "Y-Axis Acceleration Time Waveform FFT": 1,
                },
            }
        )

        data.forEach((timeWaveFormDoc: { data: { [x: string]: string } }) => {
            // X-Axis Acceleration Time Waveform
            JSON.parse(
                timeWaveFormDoc.data["X-Axis Acceleration Time Waveform FFT"]
            ).forEach((xAxisInnerArr: number[]) => {
                for (
                    let i = 0;
                    i < xAxisInnerArr.length;
                    i += xAxisInnerArr.length / 25
                ) {
                    const avg = _.mean(
                        xAxisInnerArr.slice(i, i + xAxisInnerArr.length / 25)
                    )
                    xAccData.push(avg)
                }
            })

            // Y-Axis Acceleration Time Waveform
            JSON.parse(
                timeWaveFormDoc.data["Y-Axis Acceleration Time Waveform FFT"]
            ).forEach((yAxisInnerArr: number[]) => {
                for (
                    let i = 0;
                    i < yAxisInnerArr.length;
                    i += yAxisInnerArr.length / 25
                ) {
                    const avg = _.mean(
                        yAxisInnerArr.slice(i, i + yAxisInnerArr.length / 25)
                    )
                    yAccData.push(avg)
                }
            })

            // Z-Axis Acceleration Time Waveform
            JSON.parse(
                timeWaveFormDoc.data["Z-Axis Acceleration Time Waveform FFT"]
            ).forEach((zAxisInnerArr: number[]) => {
                for (
                    let i = 0;
                    i < zAxisInnerArr.length;
                    i += zAxisInnerArr.length / 25
                ) {
                    const avg = _.mean(
                        zAxisInnerArr.slice(i, i + zAxisInnerArr.length / 25)
                    )
                    zAccData.push(avg)
                }
            })
        })

        const parsedData = data.map(
            (item: { asset_id: any; start_time: any; end_time: any }) => ({
                asset_id: item.asset_id,
                start_time: item.start_time,
                end_time: item.end_time,
                data: {
                    X_Axis_Acceleration_Time_Waveform: xAccData,
                    Y_Axis_Acceleration_Time_Waveform: yAccData,
                    Z_Axis_Acceleration_Time_Waveform: zAccData,
                },
            })
        )
        console.log(parsedData)
        return res.status(StatusCodes.OK).json(parsedData)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).send("error")
    }
}

export async function getGaugesData(
    req: Request<
        {},
        {},
        { start_time: string; end_time: string; asset_id: string }
    >,
    res: Response
) {
    const { start_time, end_time, asset_id } = req.body
    console.log("gauge data")

    let xAccTimeWavFormArr: number[] = []
    let yAccTimeWavFormArr: number[] = []
    let zAccTimeWavFormArr: number[] = []

    try {
        await client.connect()
        const db = client.db("BSP")
        const collectionUser = db.collection("rmsHistory")
        console.log("i m running rms data")

        const data = await collectionUser
            .find(
                {
                    asset_id,
                    start_time: { $gte: start_time },
                    end_time: { $lte: end_time },
                },
                {
                    asset_id: 1,
                    _id: 0,
                    start_time: 1,
                    end_time: 1,
                    data: {
                        "X-Axis Acceleration Time Waveform FFT": 1,
                        "Z-Axis Acceleration Time Waveform FFT": 1,
                        "Y-Axis Acceleration Time Waveform FFT": 1,
                    },
                }
            )
            .limit(1)

        if (data.length > 0) {
            // X-Axis Acceleration Time Waveform
            let tempXAcc: number[] = []
            let tempYAcc: number[] = []
            let tempZAcc: number[] = []

            JSON.parse(
                data[0].data["X-Axis Acceleration Time Waveform FFT"]
            ).forEach((xAxisInnerArr: number[]) => {
                tempXAcc.push(...xAxisInnerArr)
            })

            // Y-Axis Acceleration Time Waveform
            JSON.parse(
                data[0].data["Y-Axis Acceleration Time Waveform FFT"]
            ).forEach((yAxisInnerArr: number[]) => {
                tempYAcc.push(...yAxisInnerArr)
            })

            // Z-Axis Acceleration Time Waveform
            JSON.parse(
                data[0].data["Z-Axis Acceleration Time Waveform FFT"]
            ).forEach((zAxisInnerArr: number[]) => {
                tempZAcc.push(...zAxisInnerArr)
            })

            const rmsDataDoc = {
                X_Axis_Acceleration_Time_Waveform: getRms(tempXAcc),
                Y_Axis_Acceleration_Time_Waveform: getRms(tempYAcc),
                Z_Axis_Acceleration_Time_Waveform: getRms(tempZAcc),
            }

            const avgDataDoc = {
                X_Axis_Acceleration_Time_Waveform: getAvg(tempXAcc),
                Y_Axis_Acceleration_Time_Waveform: getAvg(tempYAcc),
                Z_Axis_Acceleration_Time_Waveform: getAvg(tempZAcc),
            }
            const maxDataDoc = {
                X_Axis_Acceleration_Time_Waveform: getMax(tempXAcc),
                Y_Axis_Acceleration_Time_Waveform: getMax(tempYAcc),
                Z_Axis_Acceleration_Time_Waveform: getMax(tempZAcc),
            }

            return res.status(StatusCodes.OK).json({
                rms: rmsDataDoc,
                avg: avgDataDoc,
                max: maxDataDoc,
            })
        } else
            res.status(StatusCodes.OK).json({
                rms: 0,
                avg: 0,
                max: 0,
            })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).send("error")
    }
}
