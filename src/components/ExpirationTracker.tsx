
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodItem } from '@/data/mockData';
import { format } from 'date-fns';
import { AlertTriangle, Clock } from "lucide-react";

interface ExpirationTrackerProps {
  foodItems: FoodItem[];
}

const ExpirationTracker: React.FC<ExpirationTrackerProps> = ({
  foodItems,
}) => {
  const today = new Date();
  const expiringItems = foodItems
    .filter(item => {
      const diffTime = item.expirationDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 5; // Items expiring in 5 days or less
    })
    .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime());

  const getDaysUntilExpiration = (date: Date) => {
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpirationText = (days: number) => {
    if (days < 0) return 'Expired';
    if (days === 0) return 'Expires today';
    if (days === 1) return 'Expires tomorrow';
    return `Expires in ${days} days`;
  };

  return (
    <Card className="shadow-lg border-refrigerator-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-500" />
          Expiration Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expiringItems.length > 0 ? (
          <div className="space-y-3">
            {expiringItems.map(item => {
              const daysLeft = getDaysUntilExpiration(item.expirationDate);
              return (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-3 rounded-md ${
                    daysLeft <= 0 
                      ? 'bg-red-100 text-red-800'
                      : daysLeft <= 2
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {daysLeft <= 2 && (
                      <AlertTriangle className={`h-5 w-5 ${daysLeft <= 0 ? 'text-red-500' : 'text-amber-500'}`} />
                    )}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm">
                        {format(item.expirationDate, 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {getExpirationText(daysLeft)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Clock className="h-10 w-10 mb-3 text-muted" strokeWidth={1.5} />
            <p>No items expiring soon.</p>
            <p className="text-sm">All your food items are fresh!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpirationTracker;
