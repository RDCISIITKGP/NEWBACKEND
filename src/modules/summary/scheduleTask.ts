import schedule from "node-schedule"
import insertSummary from "./insertSummary"

const scheduledTask = async () => {
    schedule.scheduleJob(
        { hour: 23, minute: 30, tz: "Asia/Kolkata" },
        async () => {
            await insertSummary()

            console.log(
                "Summary Task executed at 12:00 AM",
                new Date().toLocaleTimeString()
            )
        }
    )
}

export default scheduledTask
