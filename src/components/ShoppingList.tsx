
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShoppingItem {
  id: string;
  name: string;
  completed: boolean;
}

const ShoppingList: React.FC = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: '1', name: 'Milk', completed: false },
    { id: '2', name: 'Eggs', completed: false },
    { id: '3', name: 'Bread', completed: false },
  ]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (!newItem.trim()) return;
    
    const newShoppingItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItem,
      completed: false,
    };
    
    setItems([...items, newShoppingItem]);
    setNewItem('');
    
    toast({
      title: "Item Added",
      description: `${newItem} added to your shopping list`,
    });
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    const itemToRemove = items.find(item => item.id === id);
    setItems(items.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast({
        title: "Item Removed",
        description: `${itemToRemove.name} removed from your shopping list`,
      });
    }
  };

  const clearCompleted = () => {
    const completedCount = items.filter(item => item.completed).length;
    setItems(items.filter(item => !item.completed));
    
    if (completedCount > 0) {
      toast({
        title: "Items Cleared",
        description: `${completedCount} completed items removed from your list`,
      });
    }
  };

  const saveList = () => {
    // In a real app, this would save to a database or export a file
    // For demo purposes, we'll just show a toast notification
    toast({
      title: "Shopping List Saved",
      description: `Your shopping list with ${items.length} items has been saved`,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <Card className="shadow-lg border-refrigerator-100">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-refrigerator-500" />
            Shopping List
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearCompleted}
              disabled={!items.some(item => item.completed)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Completed
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={saveList}
              className="bg-refrigerator-500 hover:bg-refrigerator-600"
            >
              <Save className="h-4 w-4 mr-1" />
              Save List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Add shopping item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button 
            onClick={addItem}
            className="bg-refrigerator-500 hover:bg-refrigerator-600"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map(item => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between p-3 rounded-md border ${
                  item.completed ? 'bg-muted/50 border-muted' : 'bg-card border-input'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={item.completed} 
                    onCheckedChange={() => toggleItem(item.id)}
                    className="data-[state=checked]:bg-refrigerator-500 data-[state=checked]:text-white"
                  />
                  <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                    {item.name}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <ShoppingCart className="h-10 w-10 mb-3 text-muted" strokeWidth={1.5} />
            <p>Your shopping list is empty.</p>
            <p className="text-sm">Add items to your shopping list.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShoppingList;
