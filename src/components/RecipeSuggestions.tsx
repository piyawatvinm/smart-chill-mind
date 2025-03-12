
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recipe, FoodItem } from '@/data/mockData';
import { ChefHat, Clock, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RecipeSuggestionsProps {
  recipes: Recipe[];
  foodItems: FoodItem[];
}

const RecipeSuggestions: React.FC<RecipeSuggestionsProps> = ({
  recipes,
  foodItems,
}) => {
  // Get all ingredient names for comparison
  const availableIngredients = foodItems.map(item => item.name.toLowerCase());

  // Filter recipes with available ingredients
  const availableRecipes = recipes.filter(recipe => {
    const requiredIngredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
    return requiredIngredients.every(ingredient => 
      availableIngredients.some(available => available.includes(ingredient.toLowerCase()))
    );
  });

  // Check if we have partial matches for more recipe suggestions
  const partialMatchRecipes = recipes.filter(recipe => {
    if (availableRecipes.includes(recipe)) return false;
    
    const requiredIngredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
    const matchedIngredientsCount = requiredIngredients.filter(ingredient => 
      availableIngredients.some(available => available.includes(ingredient.toLowerCase()))
    ).length;
    
    return matchedIngredientsCount >= Math.ceil(requiredIngredients.length / 2);
  });

  const getMissingIngredients = (recipe: Recipe) => {
    return recipe.ingredients.filter(ingredient => 
      !availableIngredients.some(available => 
        available.includes(ingredient.toLowerCase())
      )
    );
  };

  return (
    <Card className="shadow-lg border-refrigerator-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-fresh-600" />
          Recipe Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {availableRecipes.length > 0 || partialMatchRecipes.length > 0 ? (
          <div className="space-y-6">
            {availableRecipes.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-3">
                  Ready to Cook
                </h3>
                <div className="space-y-3">
                  {availableRecipes.map(recipe => (
                    <div key={recipe.id} className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-fresh-800">{recipe.name}</h3>
                          <div className="flex items-center gap-1 mt-1 text-sm text-fresh-600">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{recipe.cookingTime} mins</span>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-fresh-700 border-fresh-200 bg-green-50 hover:bg-green-100">
                              View Recipe
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{recipe.name}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Ingredients</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {recipe.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Instructions</h4>
                                <p>{recipe.instructions}</p>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Cooking time: {recipe.cookingTime} minutes</span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {partialMatchRecipes.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-3">
                  Almost Ready (Missing Some Ingredients)
                </h3>
                <div className="space-y-3">
                  {partialMatchRecipes.map(recipe => {
                    const missingIngredients = getMissingIngredients(recipe);
                    return (
                      <div key={recipe.id} className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-amber-800">{recipe.name}</h3>
                            <div className="flex items-center gap-1 mt-1 text-sm">
                              <Clock className="h-3.5 w-3.5 text-amber-600" />
                              <span className="text-amber-600">{recipe.cookingTime} mins</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Info className="h-4 w-4 text-amber-600" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Missing ingredients:</p>
                                  <ul className="list-disc pl-5 mt-1">
                                    {missingIngredients.map((ingredient, i) => (
                                      <li key={i}>{ingredient}</li>
                                    ))}
                                  </ul>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-amber-700 border-amber-200 bg-amber-50 hover:bg-amber-100">
                                  View Recipe
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{recipe.name}</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Ingredients</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {recipe.ingredients.map((ingredient, i) => (
                                        <li key={i} className={missingIngredients.includes(ingredient) ? 'text-red-500' : ''}>
                                          {ingredient}
                                          {missingIngredients.includes(ingredient) && ' (missing)'}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Instructions</h4>
                                    <p>{recipe.instructions}</p>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>Cooking time: {recipe.cookingTime} minutes</span>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <ChefHat className="h-10 w-10 mb-3 text-muted" strokeWidth={1.5} />
            <p>No recipe suggestions available.</p>
            <p className="text-sm">Add more ingredients to get recipe suggestions.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeSuggestions;
