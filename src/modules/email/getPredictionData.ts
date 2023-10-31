import { devices } from "./constants"
import axios from "axios"
import moment from "moment-timezone"

interface DataItem {
    et: number
    knn: number
    rf: number
    bp: number
    start_time: string
}

const getPredictionData = async () => {
    let jsonData = []

    const getTodayIST = (): string =>
        moment.tz("Asia/Kolkata").format(`YYYY-MM-DDT00:00:00+1`)

    const getYesterdayMidnightIST = (): string =>
        moment
            .tz("Asia/Kolkata")
            .subtract(1, "day")
            .startOf("day")
            .format(`YYYY-MM-DDT00:00:00+1`)

    const todayIST = getTodayIST()

    const yesterdayMidnightIST = getYesterdayMidnightIST()

    // get the data for every asset id
    for (const device of devices) {
        try {
            const response = await axios.post(
                "http://103.154.184.52:4000/api/threshold/check",
                {
                    title: device?.asset_id,
                    startDate: yesterdayMidnightIST,
                    endDate: todayIST,
                }
            )

            const bpData: number[] = response.data.map(
                (item: DataItem) => item.bp
            )

            const timestamps: string[] = response.data.map(
                (item: DataItem) => item.start_time
            )

            // Setting best prediction data
            for (let i = 0; i < bpData.length; i++) {
                if (jsonData.length <= i) {
                    jsonData[i] = {}
                }

                if (bpData.length > i) {
                    jsonData[i] = {
                        ...jsonData[i],
                        [`${device.exhauster_name} ${device.asset_location}`]:
                            bpData[i],
                    }
                }
            }

            // Setting timestamp
            for (let i = 0; i < timestamps.length; i++) {
                if (jsonData.length <= i) {
                    jsonData[i] = {}
                }

                if (timestamps.length > i) {
                    jsonData[i] = {
                        ...jsonData[i],
                        [`timestamp (${device.exhauster_name} ${device.asset_location})`]:
                            timestamps[i],
                    }
                }
            }
        } catch (error) {}
    }

    return jsonData
}

export default getPredictionData
