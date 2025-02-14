export function storeValueToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getValueFromLocalStorage(key, defaultValue = null) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}