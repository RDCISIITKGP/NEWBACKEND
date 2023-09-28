import { getModelForClass, prop } from "@typegoose/typegoose"

export class Device {
    @prop({ required: true, type: () => String })
    public asset_id: string

    @prop({ required: true, type: () => String })
    public exhauster_name: string

    @prop({ required: true, type: () => String })
    public asset_name: string

    @prop({ required: true, type: () => String })
    public asset_location: string

    @prop({ required: true, type: () => String })
    public asset_mac_id: string
}

export const DeviceModel = getModelForClass(Device, {
    schemaOptions: { versionKey: false, collection: "device_master" },
})
