import { object, TypeOf, number, string } from "zod"

export const thresholdSchema = {
    body: object({
        _id: string({
            required_error: "_id is required !",
        }),
        X_Axis_Acceleration_Time_Waveform: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        Y_Axis_Acceleration_Time_Waveform: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        Z_Axis_Acceleration_Time_Waveform: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        X_Axis_Velocity_Time_Waveform: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        Y_Axis_Velocity_Time_Waveform: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        Z_Axis_Velocity_Time_Waveform: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        X_Axis_Acceleration_FFT: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        Y_Axis_Acceleration_FFT: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        Z_Axis_Acceleration_FFT: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        X_Axis_Velocity_FFT: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        Y_Axis_Velocity_FFT: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
        Z_Axis_Velocity_FFT: object({
            start: number({
                required_error: "start value is required !",
            }),
            normal: number({
                required_error: "normal value is requried !",
            }),
            caution: number({
                required_error: "caution value is required !",
            }),
            warning: number({
                required_error: "warning value is required !",
            }),
            end: number({
                required_error: "end value is required !",
            }),
        }),
    }),
}

export type ThresholdBody = TypeOf<typeof thresholdSchema.body>
