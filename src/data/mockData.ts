
// Food items with categories, expiration dates, and quantities
export interface FoodItem {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'dairy' | 'meat' | 'beverages' | 'leftovers' | 'condiments';
  expirationDate: Date;
  quantity: number;
  unit: 'pcs' | 'kg' | 'g' | 'l' | 'ml' | 'pack';
  image?: string;
}

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Milk',
    category: 'dairy',
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    quantity: 1,
    unit: 'l',
  },
  {
    id: '2',
    name: 'Eggs',
    category: 'dairy',
    expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    quantity: 12,
    unit: 'pcs',
  },
  {
    id: '3',
    name: 'Chicken Breast',
    category: 'meat',
    expirationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    quantity: 500,
    unit: 'g',
  },
  {
    id: '4',
    name: 'Apples',
    category: 'fruits',
    expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    quantity: 6,
    unit: 'pcs',
  },
  {
    id: '5',
    name: 'Yogurt',
    category: 'dairy',
    expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    quantity: 4,
    unit: 'pcs',
  },
  {
    id: '6',
    name: 'Tomatoes',
    category: 'vegetables',
    expirationDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    quantity: 4,
    unit: 'pcs',
  },
  {
    id: '7',
    name: 'Orange Juice',
    category: 'beverages',
    expirationDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    quantity: 1,
    unit: 'l',
  },
  {
    id: '8',
    name: 'Lettuce',
    category: 'vegetables',
    expirationDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    quantity: 1,
    unit: 'pcs',
  },
  {
    id: '9',
    name: 'Pasta Leftovers',
    category: 'leftovers',
    expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    quantity: 1,
    unit: 'pack',
  },
];

// Recipe suggestions based on food items
export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  cookingTime: number; // in minutes
  image?: string;
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Vegetable Omelette',
    ingredients: ['Eggs', 'Tomatoes', 'Lettuce', 'Milk'],
    instructions: 'Beat eggs with milk, pour into a hot pan, add chopped vegetables, cook until set.',
    cookingTime: 15,
  },
  {
    id: '2',
    name: 'Chicken Salad',
    ingredients: ['Chicken Breast', 'Lettuce', 'Tomatoes'],
    instructions: 'Cook chicken, slice it, mix with chopped vegetables.',
    cookingTime: 25,
  },
  {
    id: '3',
    name: 'Fruit Yogurt',
    ingredients: ['Yogurt', 'Apples'],
    instructions: 'Dice apples, mix with yogurt.',
    cookingTime: 5,
  },
  {
    id: '4',
    name: 'Pasta with Chicken',
    ingredients: ['Pasta Leftovers', 'Chicken Breast'],
    instructions: 'Heat pasta, cook and slice chicken, mix together.',
    cookingTime: 20,
  },
];

// Default refrigerator settings
export interface RefrigeratorSettings {
  fridgeTemperature: number; // in Celsius
  freezerTemperature: number; // in Celsius
  powerSavingMode: boolean;
  quickCoolEnabled: boolean;
}

export const defaultSettings: RefrigeratorSettings = {
  fridgeTemperature: 4,
  freezerTemperature: -18,
  powerSavingMode: false,
  quickCoolEnabled: false,
};
