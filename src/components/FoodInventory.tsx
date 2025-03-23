
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/calendar";
import { PlusCircle, Search, Apple, Carrot, Milk, Beef, Coffee, UtensilsCrossed, Sandwich } from "lucide-react";
import { FoodItem } from '@/data/mockData';
import { format } from 'date-fns';

interface FoodInventoryProps {
  foodItems: FoodItem[];
  onAddItem: (item: FoodItem) => void;
  onRemoveItem: (id: string) => void;
}

const FoodInventory: React.FC<FoodInventoryProps> = ({
  foodItems,
  onAddItem,
  onRemoveItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // New food item state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'fruits' | 'vegetables' | 'dairy' | 'meat' | 'beverages' | 'leftovers' | 'condiments'>('fruits');
  const [newItemExpiration, setNewItemExpiration] = useState<Date>(new Date());
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);
  const [newItemUnit, setNewItemUnit] = useState<'pcs' | 'kg' | 'g' | 'l' | 'ml' | 'pack'>('pcs');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fruits':
        return <Apple className="h-4 w-4 text-fresh-500" />;
      case 'vegetables':
        return <Carrot className="h-4 w-4 text-fresh-600" />;
      case 'dairy':
        return <Milk className="h-4 w-4 text-refrigerator-300" />;
      case 'meat':
        return <Beef className="h-4 w-4 text-rose-500" />;
      case 'beverages':
        return <Coffee className="h-4 w-4 text-amber-600" />;
      case 'leftovers':
        return <UtensilsCrossed className="h-4 w-4 text-purple-500" />;
      case 'condiments':
        return <Sandwich className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    
    // Ensure we're using a proper Date object
    const expirationDate = new Date(newItemExpiration);
    
    const newItem: FoodItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: newItemCategory,
      expirationDate: expirationDate,
      quantity: newItemQuantity,
      unit: newItemUnit,
    };
    
    onAddItem(newItem);
    
    // Reset form
    setNewItemName('');
    setNewItemCategory('fruits');
    setNewItemExpiration(new Date());
    setNewItemQuantity(1);
    setNewItemUnit('pcs');
  };

  const getDaysUntilExpiration = (date: Date) => {
    const today = new Date();
    // Ensure date is a Date object
    const expirationDate = date instanceof Date ? date : new Date(date);
    const diffTime = expirationDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card className="shadow-lg border-refrigerator-100">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Food Inventory</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Food Item</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">Name</label>
                  <Input 
                    id="name" 
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right">Category</label>
                  <Select 
                    value={newItemCategory}
                    onValueChange={(value: any) => setNewItemCategory(value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="leftovers">Leftovers</SelectItem>
                      <SelectItem value="condiments">Condiments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Expiration</label>
                  <div className="col-span-3">
                    <DatePicker
                      selected={newItemExpiration}
                      onSelect={setNewItemExpiration}
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="quantity" className="text-right">Quantity</label>
                  <Input 
                    id="quantity" 
                    type="number"
                    min="1"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
                    className="col-span-1" 
                  />
                  <Select 
                    value={newItemUnit}
                    onValueChange={(value: any) => setNewItemUnit(value)}
                  >
                    <SelectTrigger className="col-span-1">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcs">pcs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="l">l</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="pack">pack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search food items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="meat">Meat</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
              <SelectItem value="leftovers">Leftovers</SelectItem>
              <SelectItem value="condiments">Condiments</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Category</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="w-[100px] text-center">Quantity</TableHead>
                <TableHead className="w-[150px] text-center">Expires</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const daysLeft = getDaysUntilExpiration(item.expirationDate);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getCategoryIcon(item.category)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-center">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center">
                          <span className={`text-xs rounded-full px-2 py-0.5 ${
                            daysLeft <= 2 
                              ? 'bg-red-100 text-red-800'
                              : daysLeft <= 5
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {daysLeft} days left
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {format(item.expirationDate, 'MMM dd, yyyy')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="h-8 w-8 p-0"
                        >
                          🗑️
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No food items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodInventory;
