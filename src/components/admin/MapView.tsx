import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  MapPin, 
  Search, 
  Filter, 
  Users, 
  DollarSign, 
  TrendingUp,
  Phone,
  Mail,
  Building,
  Calendar
} from 'lucide-react';
import { Application } from '../../App';

interface MapViewProps {
  applications: Application[];
}

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  status: Application['status'];
  applicant: string;
  amount: number;
  valueChain: string;
  application: Application;
}

export function MapView({ applications }: MapViewProps) {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [valueChainFilter, setValueChainFilter] = useState('all');

  // Mock coordinates for demonstration - in real implementation, these would come from the application data
  const generateMockCoordinates = (country: string, region: string) => {
    const countryBounds = {
      'Kenya': { lat: -1.2921, lng: 36.8219, variance: 2 },
      'Uganda': { lat: 0.3476, lng: 32.5825, variance: 1.5 },
      'Rwanda': { lat: -1.9403, lng: 29.8739, variance: 1 },
      'Ethiopia': { lat: 9.1450, lng: 40.4897, variance: 3 },
      'Tanzania': { lat: -6.3690, lng: 34.8888, variance: 2.5 }
    };
    
    const bounds = countryBounds[country as keyof typeof countryBounds] || countryBounds['Kenya'];
    return {
      lat: bounds.lat + (Math.random() - 0.5) * bounds.variance,
      lng: bounds.lng + (Math.random() - 0.5) * bounds.variance
    };
  };

  const mapMarkers: MapMarker[] = applications.map(app => {
    const coords = generateMockCoordinates(app.country, app.region);
    return {
      id: app.id,
      lat: coords.lat,
      lng: coords.lng,
      status: app.status,
      applicant: app.applicantName,
      amount: app.requestedAmount,
      valueChain: app.valueChain,
      application: app
    };
  });

  const filteredMarkers = mapMarkers.filter(marker => {
    const matchesSearch = marker.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         marker.valueChain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || marker.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || marker.application.country === countryFilter;
    const matchesValueChain = valueChainFilter === 'all' || marker.application.valueChain === valueChainFilter;
    
    return matchesSearch && matchesStatus && matchesCountry && matchesValueChain;
  });

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'under_review': return 'bg-blue-500';
      case 'shortlisted': return 'bg-purple-500';
      case 'rejected': return 'bg-red-500';
      case 'flagged': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: Application['status']) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'under_review': return 'outline';
      case 'shortlisted': return 'secondary';
      case 'rejected': return 'destructive';
      case 'flagged': return 'destructive';
      default: return 'outline';
    }
  };

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-xl font-semibold">{statusCounts.approved || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-semibold">{statusCounts.pending || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-xl font-semibold">{statusCounts.under_review || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-xl font-semibold">{statusCounts.rejected || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Map Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
                <SelectItem value="Uganda">Uganda</SelectItem>
                <SelectItem value="Rwanda">Rwanda</SelectItem>
                <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                <SelectItem value="Tanzania">Tanzania</SelectItem>
              </SelectContent>
            </Select>
            <Select value={valueChainFilter} onValueChange={setValueChainFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="AudioVisual">AudioVisual</SelectItem>
                <SelectItem value="Performing Arts">Performing Arts</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Visual Arts">Visual Arts</SelectItem>
                <SelectItem value="Crafts">Crafts</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Geographic Distribution</span>
              <Badge variant="outline">{filteredMarkers.length} locations</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mock Map Interface */}
            <div className="relative bg-muted rounded-lg h-96 overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20">
                <div className="absolute top-4 left-4 text-xs text-muted-foreground">
                  East Africa Region
                </div>
                
                {/* Mock Country Borders */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                  <path
                    d="M50 50 L150 40 L200 80 L180 150 L120 170 L60 140 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />
                  <text x="100" y="100" className="text-xs fill-current text-muted-foreground">Kenya</text>
                  
                  <path
                    d="M150 40 L250 35 L270 100 L200 80 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />
                  <text x="200" y="60" className="text-xs fill-current text-muted-foreground">Ethiopia</text>
                </svg>

                {/* Application Markers */}
                {filteredMarkers.map((marker) => {
                  const x = (marker.lng + 180) * (400 / 360);
                  const y = (90 - marker.lat) * (300 / 180);
                  
                  return (
                    <button
                      key={marker.id}
                      className={`absolute w-3 h-3 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer ${getStatusColor(marker.status)}`}
                      style={{ 
                        left: `${Math.max(5, Math.min(95, (x / 400) * 100))}%`, 
                        top: `${Math.max(5, Math.min(95, (y / 300) * 100))}%` 
                      }}
                      onClick={() => {
                        setSelectedMarker(marker);
                        setShowProfile(true);
                      }}
                      title={`${marker.applicant} - ${marker.status}`}
                    />
                  );
                })}
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <Button size="sm" variant="outline" className="w-8 h-8 p-0">+</Button>
                <Button size="sm" variant="outline" className="w-8 h-8 p-0">-</Button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <h4 className="text-sm font-medium">Legend</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Approved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Under Review</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Rejected</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {filteredMarkers.slice(0, 10).map((marker) => (
              <div
                key={marker.id}
                className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                onClick={() => {
                  setSelectedMarker(marker);
                  setShowProfile(true);
                }}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {marker.applicant.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{marker.applicant}</p>
                  <p className="text-xs text-muted-foreground">{marker.valueChain}</p>
                  <p className="text-xs text-muted-foreground">${marker.amount.toLocaleString()}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(marker.status)} className="text-xs">
                  {marker.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Applicant Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Applicant Profile</DialogTitle>
          </DialogHeader>
          {selectedMarker && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback>
                    {selectedMarker.applicant.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedMarker.applicant}</h3>
                  <p className="text-muted-foreground">{selectedMarker.application.businessName}</p>
                  <Badge variant={getStatusBadgeVariant(selectedMarker.status)} className="mt-2">
                    {selectedMarker.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMarker.application.applicantEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMarker.application.applicantPhone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMarker.application.region}, {selectedMarker.application.country}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMarker.application.valueChain}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">${selectedMarker.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{new Date(selectedMarker.application.submissionDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Business Overview</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedMarker.application.loanPurpose || 'No description provided'}
                </p>
              </div>

              <div className="flex space-x-3">
                <Button>View Full Application</Button>
                <Button variant="outline">Contact Applicant</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}