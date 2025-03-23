
// Keys for local storage
export const STORAGE_KEYS = {
  FOOD_ITEMS: 'smart-refrigerator-food-items',
  SETTINGS: 'smart-refrigerator-settings',
  SHOPPING_LIST: 'smart-refrigerator-shopping-list',
};

// Date reviver function to convert date strings back to Date objects
const dateReviver = (_key: string, value: any): any => {
  // Check if the value is a string with date format
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(value)) {
    return new Date(value);
  }
  return value;
};

// Generic save function
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving data to localStorage with key ${key}:`, error);
  }
};

// Generic load function
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    // Use the date reviver to convert date strings back to Date objects
    return JSON.parse(serializedData, dateReviver) as T;
  } catch (error) {
    console.error(`Error loading data from localStorage with key ${key}:`, error);
    return defaultValue;
  }
};
