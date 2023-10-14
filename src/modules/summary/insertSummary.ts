import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"
import { devices } from "../email/constants"
import moment from "moment-timezone"

const uri = "mongodb://nasim:nasim%40msf@103.154.184.52:27017"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

const insertSummary = async () => {
    let k = 0

    const ASSET_IDS = devices.map(({ asset_id }) => asset_id)

    await client.connect()
    const db = client.db("BSP")

    const collectionUser = db.collection("rmsHistory2")
    const collectionThresh = db.collection("threshold")
    const collectionSummary = db.collection("summary")
    const currentDate = new Date()
    const dateString = currentDate.toISOString().substring(0, 10)

    const getTodayIST = (): string =>
        moment.tz("Asia/Kolkata").format(`YYYY-MM-DDT00:00:00.000[Z]`)

    const getYesterdayMidnightIST = (): string =>
        moment
            .tz("Asia/Kolkata")
            .subtract(1, "day")
            .startOf("day")
            .format(`YYYY-MM-DDTHH:mm:ss.000[Z]`)

    const todayIST = getTodayIST()

    const yesterdayMidnightIST = getYesterdayMidnightIST()

    const startTimeMin = "2023-07-25T13:00:00"
    const startTimeMax = "2023-07-26T00:00:00"

    const objectId = "64918764fedaff5916642880"
    const query1 = { _id: new ObjectId(objectId) }
    const thresholds = await collectionThresh.findOne(query1)

    for (const id of ASSET_IDS) {
        ++k

        const thresholds_value = collectionUser.find({
            asset_id: id,
        })
        const all = await thresholds_value.toArray()

        const filteredIndexes: number[] = all[0].time_up
            .map((dateTimeString: string, index: number) => {
                const currentDate: Date = new Date(dateTimeString)
                const timeMin: Date = new Date(yesterdayMidnightIST)
                const timeMax: Date = new Date(todayIST)

                // Check if the currentDate is within the specified range
                return currentDate >= timeMin && currentDate <= timeMax
                    ? index
                    : -1
            })
            .filter((index: number) => index !== -1)

        const x_rms_vell = []

        for (
            let i = filteredIndexes[0];
            i < filteredIndexes[filteredIndexes.length - 1];
            i++
        ) {
            x_rms_vell.push(all[0].x_rms_vel[i])
        }

        const y_rms_vell = []

        for (
            let i = filteredIndexes[0];
            i < filteredIndexes[filteredIndexes.length - 1];
            i++
        ) {
            y_rms_vell.push(all[0].y_rms_vel[i])
        }

        const z_rms_vell = []
        for (
            let i = filteredIndexes[0];
            i < filteredIndexes[filteredIndexes.length - 1];
            i++
        ) {
            z_rms_vell.push(all[0].z_rms_vel[i])
        }

        const x_rms_caution = x_rms_vell.filter(
            (value) =>
                parseInt(value) >
                (!!thresholds
                    ? thresholds[id].X_Axis_Velocity_Time_Waveform["caution"]
                    : undefined)
        )

        const y_rms_caution = y_rms_vell.filter(
            (value) =>
                parseInt(value) >
                (!!thresholds
                    ? thresholds[id].Y_Axis_Velocity_Time_Waveform["caution"]
                    : undefined)
        )

        const z_rms_caution = z_rms_vell.filter(
            (value) =>
                parseInt(value) >
                (!!thresholds
                    ? thresholds[id].Z_Axis_Velocity_Time_Waveform["caution"]
                    : undefined)
        )

        //WARNING
        const x_rms_warning = x_rms_vell.filter(
            (value) =>
                parseInt(value) >
                (!!thresholds
                    ? thresholds[id].X_Axis_Velocity_Time_Waveform["warning"]
                    : undefined)
        )

        const y_rms_warning = y_rms_vell.filter(
            (value) =>
                parseInt(value) >
                (!!thresholds
                    ? thresholds[id].Y_Axis_Velocity_Time_Waveform["warning"]
                    : undefined)
        )

        const z_rms_warning = z_rms_vell.filter(
            (value) =>
                parseInt(value) >
                (!!thresholds
                    ? thresholds[id].X_Axis_Velocity_Time_Waveform["warning"]
                    : undefined)
        )

        const caution =
            ((x_rms_caution.length +
                y_rms_caution.length +
                z_rms_caution.length) /
                (x_rms_vell.length + y_rms_vell.length + z_rms_vell.length)) *
            100

        const warning =
            ((x_rms_warning.length +
                y_rms_warning.length +
                z_rms_warning.length) /
                (x_rms_vell.length + y_rms_vell.length + z_rms_vell.length)) *
            100

        let operational = Math.floor((filteredIndexes.length / 1300) * 100)

        if (operational >= 100) {
            operational = 100
        }

        const result: {
            operational?: number
            caution?: number
            warning?: number
            date?: string
            asset_id?: string
        } = {}

        result.operational = operational
        result.caution = caution
        result.warning = warning
        result.date = dateString
        result.asset_id = id

        if (!result.operational) {
            result.operational = 0
        }

        if (!result.caution) {
            result.caution = 0
        }

        if (!result.warning) {
            result.warning = 0
        }

        await collectionSummary.insertOne(result)
    }
}

export default insertSummary
