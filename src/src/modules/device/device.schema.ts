import { object, string, TypeOf } from "zod"

export const deviceSchema = {
    body: object({
        asset_id: string({
            required_error: "please enter the asset_id for the device",
        }),
        exhauster_name: string({
            required_error: "exhauster_name is required",
        }),
        asset_name: string({
            required_error: "asset_name is required",
        }),
        asset_location: string({
            required_error: "asset_location is required",
        }),
        asset_mac_id: string({
            required_error: "asset_mac_id is required",
        }),
    }),
}

export type DevicePostBody = TypeOf<typeof deviceSchema.body>
