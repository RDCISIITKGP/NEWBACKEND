const getRms = (arr: number[]) => {
    let sumOfSquares = arr.reduce((sum, number) => sum + Math.pow(number, 2), 0)
    let mean = sumOfSquares / arr.length
    let rms = Math.sqrt(mean)
    return rms
}

export default getRms
