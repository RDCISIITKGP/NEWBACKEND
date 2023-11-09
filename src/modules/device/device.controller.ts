import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import { DeviceModel } from "./device.model"

// Getting all the devices
export async function getDevices(_: Request, res: Response) {
    try {
        const devices = await DeviceModel.find()

        res.json(devices)

        return res.status(StatusCodes.OK)
    } catch (error: any) {
        return res.status(StatusCodes.BAD_REQUEST).send(error.message)
    }
}
