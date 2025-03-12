
// Keys for local storage
export const STORAGE_KEYS = {
  FOOD_ITEMS: 'smart-refrigerator-food-items',
  SETTINGS: 'smart-refrigerator-settings',
  SHOPPING_LIST: 'smart-refrigerator-shopping-list',
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
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Error loading data from localStorage with key ${key}:`, error);
    return defaultValue;
  }
};
