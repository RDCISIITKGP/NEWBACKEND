import nodemailer, { Transporter } from "nodemailer"
import { google } from "googleapis"
import SMTPTransport from "nodemailer/lib/smtp-transport"

// Environment Variables
const DRIVE_API_CLIENT_ID =
    "775638868772-ee1vaevmh75v7fcgsc8eldvevafdja9b.apps.googleusercontent.com"
const DRIVE_API_CLIENT_SECRET = "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"
const DRIVE_API_REFRESH_TOKEN =
    "1//04_urUI5WdlclCgYIARAAGAQSNgF-L9IrNVCwjZOFAQ3pQ-n2EyxySwlEWpaUoTRElBbdPndEm_KKQUaqqTsWvAhhUZ0baI5Avw"

const REDIRECT_URI = "https://developers.google.com/oauthplayground"

const OAuth2 = google.auth.OAuth2

// Create Transporter for nodemailer
const createTransporter = async (): Promise<
    Transporter<SMTPTransport.SentMessageInfo> | undefined
> => {
    try {
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
    } catch (error) {
        console.error("createTransporter.ts", { error })
        return undefined
    }
}

export default createTransporter
