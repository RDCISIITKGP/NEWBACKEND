import nodemailer from "nodemailer"
import { google } from "googleapis"

// Environment Variables
const DRIVE_API_CLIENT_ID =
    "775638868772-aa7vl63a8d7hejc2rdb520gm78os2659.apps.googleusercontent.com"
const DRIVE_API_CLIENT_SECRET = "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"
const DRIVE_API_REFRESH_TOKEN =
    "1//04ljwn48TxFq5CgYIARAAGAQSNgF-L9IrXWkVIIbs2UVdq6WWRWQSw6QNXWbv2oa9rAK5IgM440B0MG4j6E2oONMmY6Vx5xsqUg"

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
            accessToken: String(accessToken),
            clientId: DRIVE_API_CLIENT_ID,
            clientSecret: DRIVE_API_CLIENT_SECRET,
            refreshToken: DRIVE_API_REFRESH_TOKEN,
            pass: "mazf ocqu lxyv shka",
        },
    })
    return transporter
}

export default createTransporter
