import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Globe, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { FormData } from '../types';

interface SocialsTabProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export function SocialsTab({ formData, onInputChange }: SocialsTabProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Website</span>
          </Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => onInputChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div>
          <Label htmlFor="facebook" className="flex items-center space-x-2">
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </Label>
          <Input
            id="facebook"
            value={formData.facebook}
            onChange={(e) => onInputChange('facebook', e.target.value)}
            placeholder="Facebook page or profile URL"
          />
        </div>
        <div>
          <Label htmlFor="instagram" className="flex items-center space-x-2">
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </Label>
          <Input
            id="instagram"
            value={formData.instagram}
            onChange={(e) => onInputChange('instagram', e.target.value)}
            placeholder="Instagram profile URL"
          />
        </div>
        <div>
          <Label htmlFor="twitter" className="flex items-center space-x-2">
            <Twitter className="w-4 h-4" />
            <span>Twitter/X</span>
          </Label>
          <Input
            id="twitter"
            value={formData.twitter}
            onChange={(e) => onInputChange('twitter', e.target.value)}
            placeholder="Twitter/X profile URL"
          />
        </div>
        <div>
          <Label htmlFor="youtube" className="flex items-center space-x-2">
            <Youtube className="w-4 h-4" />
            <span>YouTube</span>
          </Label>
          <Input
            id="youtube"
            value={formData.youtube}
            onChange={(e) => onInputChange('youtube', e.target.value)}
            placeholder="YouTube channel URL"
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => onInputChange('linkedin', e.target.value)}
            placeholder="LinkedIn profile URL"
          />
        </div>
        <div>
          <Label htmlFor="tiktok">TikTok</Label>
          <Input
            id="tiktok"
            value={formData.tiktok}
            onChange={(e) => onInputChange('tiktok', e.target.value)}
            placeholder="TikTok profile URL"
          />
        </div>
      </div>
    </div>
  );
}