import sendEmail from "./sendEmail"
import schedule from "node-schedule"

const scheduleTask = async () => {
    schedule.scheduleJob(
        { hour: 0, minute: 0, tz: "Asia/Kolkata" },
        async () => {
            await sendEmail()

            console.log(
                "Email Task executed at 12:00 AM",
                new Date().toLocaleTimeString()
            )
        }
    )
}

export default scheduleTask
