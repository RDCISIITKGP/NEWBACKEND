import { getModelForClass, prop } from "@typegoose/typegoose"

export class Threshold {
    @prop({ required: true, type: () => Object })
    @prop({ required: true, type: () => Object })
    public X_Axis_Acceleration_Time_Waveform: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public Y_Axis_Acceleration_Time_Waveform: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public Z_Axis_Acceleration_Time_Waveform: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public X_Axis_Velocity_Time_Waveform: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public Y_Axis_Velocity_Time_Waveform: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public Z_Axis_Velocity_Time_Waveform: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public X_Axis_Acceleration_FFT: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public Y_Axis_Acceleration_FFT: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public Z_Axis_Acceleration_FFT: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public X_Axis_Velocity_FFT: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public Y_Axis_Velocity_FFT: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
    @prop({ required: true, type: () => Object })
    public Z_Axis_Velocity_FFT: {
        start: number
        normal: number
        caution: number
        warning: number
        end: number
    }
}

export const ThresholdModel = getModelForClass(Threshold, {
    schemaOptions: { versionKey: false, collection: "threshold" },
})
