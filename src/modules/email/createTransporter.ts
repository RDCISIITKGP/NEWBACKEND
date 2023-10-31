import nodemailer from "nodemailer"
import { google } from "googleapis"

// Environment Variables
const DRIVE_API_CLIENT_ID =
    "775638868772-aa7vl63a8d7hejc2rdb520gm78os2659.apps.googleusercontent.com"
const DRIVE_API_CLIENT_SECRET = "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"
const DRIVE_API_REFRESH_TOKEN =
    "1//047BPiMrq7oCkCgYIARAAGAQSNgF-L9IraTzN68YJ6vSq8YdYtKQK6Vzl_28QFhikAX8MB4E68ujqmv4QWwi_SmyHJ1duiwyOiA"

const REDIRECT_URI = "https://developers.google.com/oauthplayground"

const OAuth2 = google.auth.OAuth2

// Create Transporter for nodemailer
const createTransporter = async () => {
    const oauth2Client = new OAuth2({
        clientId: DRIVE_API_CLIENT_ID,
        clientSecret: DRIVE_API_CLIENT_SECRET,
        redirectUri: REDIRECT_URI,
    })

    oauth2Client.setCredentials({
        refresh_token: DRIVE_API_REFRESH_TOKEN,
    })

    const accessToken = await oauth2Client.getAccessToken()

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "eyevibmail@gmail.com",
            accessToken: String(accessToken?.token),
            clientId: DRIVE_API_CLIENT_ID,
            clientSecret: DRIVE_API_CLIENT_SECRET,
            refreshToken: DRIVE_API_REFRESH_TOKEN,
            pass: "gdsb peoi kypx ojzo",
        },
    })
    return transporter
}

export default createTransporter
