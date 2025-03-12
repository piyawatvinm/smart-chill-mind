
import React, { useState } from 'react';
import TemperatureControl from '@/components/TemperatureControl';
import FoodInventory from '@/components/FoodInventory';
import ExpirationTracker from '@/components/ExpirationTracker';
import RecipeSuggestions from '@/components/RecipeSuggestions';
import ShoppingList from '@/components/ShoppingList';
import { foodItems as initialFoodItems, recipes, defaultSettings, FoodItem } from '@/data/mockData';
import { Snowflake } from "lucide-react";

const Index = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);

  const handleUpdateSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
  };

  const handleAddFoodItem = (item: FoodItem) => {
    setFoodItems(prev => [...prev, item]);
  };

  const handleRemoveFoodItem = (id: string) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen pb-12 bg-gradient-to-b from-refrigerator-50 to-white">
      <header className="py-8 mb-6 bg-white refrigerator-shadow">
        <div className="container">
          <div className="flex items-center justify-center">
            <Snowflake className="h-10 w-10 text-refrigerator-500 mr-3" />
            <h1 className="text-3xl font-bold text-refrigerator-800">Smart Refrigerator</h1>
          </div>
          <p className="text-center mt-2 text-muted-foreground">
            Monitor, manage, and make the most of your food
          </p>
        </div>
      </header>

      <main className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Column 1 */}
          <div className="md:col-span-1 space-y-6">
            <TemperatureControl 
              settings={settings} 
              onUpdateSettings={handleUpdateSettings} 
            />
            <ExpirationTracker foodItems={foodItems} />
          </div>
          
          {/* Column 2-3 */}
          <div className="md:col-span-2 space-y-6">
            <FoodInventory 
              foodItems={foodItems}
              onAddItem={handleAddFoodItem}
              onRemoveItem={handleRemoveFoodItem}
            />
            <RecipeSuggestions 
              recipes={recipes}
              foodItems={foodItems}
            />
          </div>
          
          {/* Column 4 */}
          <div className="md:col-span-1 space-y-6">
            <ShoppingList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
