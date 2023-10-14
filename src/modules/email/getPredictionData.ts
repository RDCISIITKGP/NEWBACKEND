import { devices } from "./constants"
import axios from "axios"

interface DataItem {
    et: number
    knn: number
    rf: number
    bp: number
    start_time: string
}

const getPredictionData = async () => {
    let jsonData = []

    // get the data for every asset id
    for (const device of devices) {
        try {
            const response = await axios.post(
                "http://103.154.184.52:4000/api/threshold/metrics",
                { title: device?.asset_id }
            )

            const bpData: number[] = response.data[0].result.map(
                (item: DataItem) => item.bp
            )

            const timestamps: string[] = response.data[0].result.map(
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
