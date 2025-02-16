export const generateRandomId = () => {
    return Math.floor(Math.random() * 1000) + Date.now()
}

export const generateRandomNumberBeteenRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}