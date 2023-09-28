import { DataModel} from "./analytics.model"

export async function getAnalyticsData() {
    return DataModel.find()
}
