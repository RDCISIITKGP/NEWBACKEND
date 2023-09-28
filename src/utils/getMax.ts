const getMax = (arr: number[]) => {
    return Math.max(...arr.map(item => Math.abs(item)))
}

export default getMax
