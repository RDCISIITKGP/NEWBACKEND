import sendEmail from "./sendEmail"
import schedule from "node-schedule"

const scheduledTask = async () => {
    schedule.scheduleJob(
        { hour: 23, minute: 20, tz: "Asia/Kolkata" },
        async () => {
            await sendEmail()

            console.log(
                "Task executed at 12:00 AM",
                new Date().toLocaleTimeString()
            )
        }
    )
}

export default scheduledTask
