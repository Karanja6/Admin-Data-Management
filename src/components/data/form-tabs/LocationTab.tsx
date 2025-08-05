import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { MapPin, MapIcon } from 'lucide-react';
import { FormData } from '../types';

interface LocationTabProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export function LocationTab({ formData, onInputChange }: LocationTabProps) {
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  const handleLocationSelect = () => {
    // Mock location selection - in real implementation, this would use Google Maps API
    onInputChange('latitude', '-1.2921');
    onInputChange('longitude', '36.8219');
    onInputChange('locationDescription', 'Nairobi Central Business District');
    setShowLocationDialog(false);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="region">Region/State *</Label>
          <Input
            id="region"
            value={formData.region}
            onChange={(e) => onInputChange('region', e.target.value)}
            placeholder="Enter region or state"
          />
        </div>
        <div>
          <Label htmlFor="county">County/District</Label>
          <Input
            id="county"
            value={formData.county}
            onChange={(e) => onInputChange('county', e.target.value)}
            placeholder="Enter county or district"
          />
        </div>
      </div>

      <div>
        <Label>Business Location</Label>
        <Card className="p-4 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {formData.latitude && formData.longitude 
                  ? `Location: ${formData.locationDescription || 'Selected'}`
                  : 'No location selected'
                }
              </span>
            </div>
            <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <MapIcon className="w-4 h-4 mr-2" />
                  {formData.latitude ? 'Change Location' : 'Select Location'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Select Business Location</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Search Address</Label>
                    <Input placeholder="Search for address..." />
                  </div>
                  {/* Mock Map Interface */}
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Interactive map would appear here</p>
                      <p className="text-xs text-muted-foreground">Click to pin your business location</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={handleLocationSelect}>Confirm Location</Button>
                    <Button variant="outline" onClick={() => setShowLocationDialog(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {formData.latitude && formData.longitude && (
            <div className="mt-3 text-xs text-muted-foreground space-y-1">
              <div>Latitude: {formData.latitude}</div>
              <div>Longitude: {formData.longitude}</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}