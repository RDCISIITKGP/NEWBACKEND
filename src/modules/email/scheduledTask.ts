import sendEmail from "./sendEmail"
import schedule from "node-schedule"

const scheduledTask = async () => {
    schedule.scheduleJob(
        { hour: 0, minute: 0, tz: "Asia/Kolkata" },
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
