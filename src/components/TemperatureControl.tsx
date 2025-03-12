
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Thermometer, Snowflake, Power, Zap } from "lucide-react";
import { RefrigeratorSettings } from '@/data/mockData';
import { useToast } from "@/components/ui/use-toast";

interface TemperatureControlProps {
  settings: RefrigeratorSettings;
  onUpdateSettings: (settings: RefrigeratorSettings) => void;
}

const TemperatureControl: React.FC<TemperatureControlProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const { toast } = useToast();
  const [isTemperatureChanging, setIsTemperatureChanging] = useState(false);

  const handleFridgeTempChange = (value: number[]) => {
    setIsTemperatureChanging(true);
    onUpdateSettings({
      ...settings,
      fridgeTemperature: value[0],
    });
    
    setTimeout(() => setIsTemperatureChanging(false), 1000);
    toast({
      title: "Temperature Updated",
      description: `Fridge temperature set to ${value[0]}°C`,
    });
  };

  const handleFreezerTempChange = (value: number[]) => {
    setIsTemperatureChanging(true);
    onUpdateSettings({
      ...settings,
      freezerTemperature: value[0],
    });
    
    setTimeout(() => setIsTemperatureChanging(false), 1000);
    toast({
      title: "Temperature Updated",
      description: `Freezer temperature set to ${value[0]}°C`,
    });
  };

  const togglePowerSaving = () => {
    onUpdateSettings({
      ...settings,
      powerSavingMode: !settings.powerSavingMode,
    });
    
    toast({
      title: settings.powerSavingMode ? "Power Saving Disabled" : "Power Saving Enabled",
      description: settings.powerSavingMode 
        ? "Regular power mode is now active" 
        : "Refrigerator is now in power saving mode",
    });
  };

  const toggleQuickCool = () => {
    onUpdateSettings({
      ...settings,
      quickCoolEnabled: !settings.quickCoolEnabled,
    });
    
    toast({
      title: settings.quickCoolEnabled ? "Quick Cool Disabled" : "Quick Cool Enabled",
      description: settings.quickCoolEnabled 
        ? "Regular cooling mode is now active" 
        : "Quick cool mode will rapidly lower temperature",
    });
  };

  return (
    <Card className="shadow-lg border-refrigerator-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-refrigerator-600" />
          Temperature Control
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-refrigerator-500" />
                <span>Fridge Temperature</span>
              </div>
              <span 
                className={`font-medium text-lg ${isTemperatureChanging ? 'animate-temp-change text-refrigerator-600' : 'text-refrigerator-500'}`}
              >
                {settings.fridgeTemperature}°C
              </span>
            </div>
            <Slider
              defaultValue={[settings.fridgeTemperature]}
              min={1}
              max={7}
              step={1}
              onValueChange={handleFridgeTempChange}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-refrigerator-700" />
                <span>Freezer Temperature</span>
              </div>
              <span 
                className={`font-medium text-lg ${isTemperatureChanging ? 'animate-temp-change text-refrigerator-700' : 'text-refrigerator-600'}`}
              >
                {settings.freezerTemperature}°C
              </span>
            </div>
            <Slider
              defaultValue={[settings.freezerTemperature]}
              min={-24}
              max={-16}
              step={1}
              onValueChange={handleFreezerTempChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-between pt-2 items-center">
            <div className="flex items-center gap-2">
              <Power className="h-4 w-4 text-fresh-600" />
              <span>Power Saving Mode</span>
            </div>
            <Switch 
              checked={settings.powerSavingMode} 
              onCheckedChange={togglePowerSaving}
              className="data-[state=checked]:bg-fresh-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-refrigerator-500" />
              <span>Quick Cool</span>
            </div>
            <Switch 
              checked={settings.quickCoolEnabled} 
              onCheckedChange={toggleQuickCool}
              className="data-[state=checked]:bg-refrigerator-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureControl;
