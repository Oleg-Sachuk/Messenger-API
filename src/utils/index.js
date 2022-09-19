'use strict'

const asyncFilter = async (arr, predicate) => {
    const results = await Promise.all(arr.map(predicate));

    return arr.filter((_v, index) => results[index]);
}

const splitIntoChunks = (inputArray, size) => {
    return inputArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / size)
        if (!resultArray[chunkIndex]) resultArray[chunkIndex] = []

        resultArray[chunkIndex].push(item)
        return resultArray
    }, []);
}

module.exports = {
    asyncFilter,
    splitIntoChunks,
}