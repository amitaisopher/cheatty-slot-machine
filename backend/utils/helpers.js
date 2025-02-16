export const generateRandomId = () => {
    return Math.floor(Math.random() * 1000) + Date.now()
}

export const generateRandomNumberBeteenRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomElementFromArray(array) {
    return array[generateRandomNumberBeteenRange(0, array.length - 1)];
  }

// check every element in the array is the same
export function checkIfAllElementsAreEqual(array) {
    return array.every((element) => element === array[0]);
}