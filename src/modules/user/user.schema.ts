import { object, string, TypeOf } from "zod"

export const registerUserSchema = {
    body: object({
        name: string({
            required_error: "Please enter a username",
        }),
        email: string({
            required_error: "Please enter an email",
        }),
        phone: string().optional(),
        role: string({ required_error: "Please enter a role (Admin or User)" }),
        password: string({
            required_error: "Please enter a password",
        }),
        profileImage: string().optional(),
    }),
}

export const updateUserSchema = {
    body: object({
        name: string({
            required_error: "Please enter a username",
        }),
        email: string({
            required_error: "Please enter an email",
        }),
        profileImage: string().optional(),
    }),
}

export const loginUserSchema = {
    body: object({
        email: string({
            required_error: "Please enter an email",
        }),
        password: string({
            required_error: "Please enter a password",
        }),
    }),
}

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>
export type LoginUserBody = TypeOf<typeof loginUserSchema.body>
export type UpdateUserBody = TypeOf<typeof updateUserSchema.body>
