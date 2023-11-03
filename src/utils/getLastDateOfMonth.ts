const getLastDateOfMonth = ({ date }: { date: Date }) => {
    const lastDate = new Date(date)
    lastDate.setDate(1)
    lastDate.setMonth(lastDate.getMonth() + 1)
    lastDate.setDate(1)
    return lastDate
}

export default getLastDateOfMonth
