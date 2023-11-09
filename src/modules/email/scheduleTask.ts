import sendEmail from "./sendEmail"
import schedule from "node-schedule"

const scheduleTask = async () => {
    schedule.scheduleJob(
        { hour: 0, minute: 20, tz: "Asia/Kolkata" },
        async () => await sendEmail()
    )
}

export default scheduleTask
