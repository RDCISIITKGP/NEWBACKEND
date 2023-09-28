const getAvg = (arr: number[]) => {
    let sum = arr.reduce((sum, number) => Math.abs(sum) + Math.abs(number), 0)
    let avg = sum / arr.length
    return avg
}

export default getAvg
