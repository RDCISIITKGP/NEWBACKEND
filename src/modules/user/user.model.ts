import { getModelForClass, prop } from "@typegoose/typegoose"

export class User {
    @prop({ required: true, type: () => String })
    public name: string

    @prop({ required: true, type: () => String, unique: true })
    public email: string

    @prop({ type: () => String })
    public phone: string

    @prop({ required: true, type: () => String, enum: ["Admin", "User"] })
    public role: string

    @prop({ required: true, type: () => String })
    public password: string

    @prop({ type: () => String, default: "profileImage" })
    public profileImage: string
}

export const UserModel = getModelForClass(User, {
    schemaOptions: { versionKey: false, collection: "trialUsers" },
})
