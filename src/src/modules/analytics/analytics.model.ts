import { getModelForClass, prop, pre } from "@typegoose/typegoose"

export class Data {
    @prop({ required: true, type: () => String })
    public asset_id: string

    @prop({ required: true, type: () => String })
    public start_time: string

    @prop({ required: true, type: () => String })
    public end_time: string

    @prop({ required: true, type: () => Object })
    public data: {
        "X-Axis Acceleration FFT": string
        "Z-Axis Acceleration FFT": string
        "X-Axis Acceleration Time Waveform FFT": string
        "Z-Axis Velocity FFT": string
        "Z-Axis Acceleration Time Waveform FFT": string
        "Y-Axis Velocity FFT": string
        "X-Axis Velocity FFT": string
        "Y-Axis Acceleration Time Waveform FFT": string
        "Y-Axis Acceleration FFT": string
    }
}

export const DataModel = getModelForClass(Data, {
    schemaOptions: { versionKey: false, collection: "analytics" },
})
