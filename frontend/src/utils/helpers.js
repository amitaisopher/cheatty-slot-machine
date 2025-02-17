export function storeValueToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getValueFromLocalStorage(key, defaultValue = null) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomElementFromArray(array) {
  return array[getRandomInt(0, array.length - 1)];
}