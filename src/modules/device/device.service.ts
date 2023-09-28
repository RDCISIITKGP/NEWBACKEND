import { DeviceModel} from "./device.model"

export async function getDeviceMasters() {
    return DeviceModel.find()
}
