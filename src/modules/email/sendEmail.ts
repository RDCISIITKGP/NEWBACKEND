import { dateTimeFormat } from "./constants"
import createTransporter from "./createTransporter"
import createWorkbook from "./createWorkbook"
import getAdminEmails from "./getAdminEmails"
import getPredictionData from "./getPredictionData"

// send email function
const sendEmail = async () => {
    // get the admins
    const admins = await getAdminEmails()

    // get the predictionData
    const predictionData = await getPredictionData()

    // get the workbook
    const workbook = await createWorkbook({ jsonData: predictionData })

    const currentTime = dateTimeFormat.format(new Date())

    let mailOptions = {
        from: "eyevibmail@gmail.com",
        to: admins.join(", "),
        subject: `EveVib Predictions : ${currentTime}`,
        text: "Hello Admin,\n\nAttached is your daily summary report.\n\nSummary Information:\n0: Healthy\n1: Looseness\n2: Misalignment\n3: Anomalous Vibration\n4: No RMS Values Found\n5: No Data Found\n\nPlease note that these numbers correspond to the status of the reported data.\n\nIf you have any further queries or need additional information, please feel free to contact us at eyevibmail@gmail.com.\n\nWarm Regards,\nEYEVIB",
        attachments: [
            {
                filename: `predictions ${currentTime}.xlsx`,
                content: workbook,
            },
        ],
    }

    const transporter = await createTransporter()

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log("Email sent: " + info.response)
        }
    })
}

export default sendEmail
