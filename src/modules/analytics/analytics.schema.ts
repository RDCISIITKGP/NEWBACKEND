import { object, string, TypeOf } from "zod"
import mongoose from "mongoose"

export const registerUserSchema = {
    body: object({
        username: string({
            required_error: "username is required",
        }),
        email: string({
            required_error: "email is required",
        }).email("must be a valid email"),
        password: string({
            required_error: "username is required",
        })
            .min(6, "Passwords must be atleast 6 characters long")
            .max(64, "Passwords should not be longer than 64 characters."),
        confirmPassword: string({
            required_error: "username is required",
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }),
}

export const analyticsSchema = new mongoose.Schema({
    asset_id: String,
    start_time: String,
    end_time: String,
    data: {
        "X-Axis Acceleration FFT": String,
        "Z-Axis Acceleration FFT": String,
        "X-Axis Acceleration Time Waveform FFT": String,
        "Z-Axis Velocity FFT": String,
        "Z-Axis Acceleration Time Waveform FFT": String,
        "Y-Axis Velocity FFT": String,
        "X-Axis Velocity FFT": String,
        "Y-Axis Acceleration Time Waveform FFT": String,
        "Y-Axis Acceleration FFT": String,
    },
})

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>
