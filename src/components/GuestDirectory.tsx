import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { 
  Search, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  TrendingUp, 
  Users,
  Filter,
  ExternalLink
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function GuestDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<any>(null);
  const [contactMessage, setContactMessage] = useState('');

  const entrepreneurs = [
    {
      id: 1,
      name: 'Sarah Wanjiku',
      businessName: 'Eco Crafts Kenya',
      industry: 'Manufacturing',
      region: 'Nairobi',
      description: 'Creating sustainable fashion and eco-friendly bags from recycled materials. Committed to environmental conservation while empowering local communities.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      website: 'www.ecocraftskenya.com',
      fundingStage: 'Funded',
      employees: 8,
      founded: '2023',
      socialLinks: {
        instagram: '@ecocraftskenya',
        facebook: 'EcoCraftsKenya'
      },
      achievements: ['100+ products sold', '3 corporate partnerships', 'Zero-waste certified'],
      contact: {
        email: 'sarah@ecocraftskenya.com',
        phone: '+254 712 345 678'
      }
    },
    {
      id: 2,
      name: 'John Muturi',
      businessName: 'TechSolutions KE',
      industry: 'Technology',
      region: 'Kisumu',
      description: 'Developing mobile applications for smallholder farmers to access market information, weather updates, and agricultural best practices.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      website: 'www.techsolutions.co.ke',
      fundingStage: 'Funded',
      employees: 5,
      founded: '2022',
      socialLinks: {
        twitter: '@techsolutionske',
        linkedin: 'techsolutions-ke'
      },
      achievements: ['500+ farmer users', 'Featured in TechCrunch Africa', 'Winner AgriTech Awards 2023'],
      contact: {
        email: 'john@techsolutions.co.ke',
        phone: '+254 701 987 654'
      }
    },
    {
      id: 3,
      name: 'Grace Mwangi',
      businessName: 'Mama Grace Catering',
      industry: 'Services',
      region: 'Kiambu',
      description: 'Premium catering services specializing in authentic Kenyan cuisine for corporate events, weddings, and social gatherings.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      website: 'www.mamagracecatering.com',
      fundingStage: 'Growth',
      employees: 12,
      founded: '2021',
      socialLinks: {
        instagram: '@mamagracecatering',
        facebook: 'MamaGraceCatering'
      },
      achievements: ['200+ events catered', 'Featured in Daily Nation', 'ISO certified kitchen'],
      contact: {
        email: 'grace@mamagracecatering.com',
        phone: '+254 733 456 789'
      }
    },
    {
      id: 4,
      name: 'David Kimani',
      businessName: 'Solar Innovations',
      industry: 'Technology',
      region: 'Nakuru',
      description: 'Providing affordable solar energy solutions for rural communities and small businesses across Kenya.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
      website: 'www.solarinnovations.co.ke',
      fundingStage: 'Funded',
      employees: 15,
      founded: '2020',
      socialLinks: {
        twitter: '@solarinnovke',
        linkedin: 'solar-innovations-ke'
      },
      achievements: ['1000+ homes powered', 'Rural electrification award', '50+ jobs created'],
      contact: {
        email: 'david@solarinnovations.co.ke',
        phone: '+254 720 654 321'
      }
    }
  ];

  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    const matchesSearch = entrepreneur.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entrepreneur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entrepreneur.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'all' || entrepreneur.region === regionFilter;
    const matchesIndustry = industryFilter === 'all' || entrepreneur.industry === industryFilter;
    
    return matchesSearch && matchesRegion && matchesIndustry;
  });

  const regions = [...new Set(entrepreneurs.map(e => e.region))];
  const industries = [...new Set(entrepreneurs.map(e => e.industry))];

  const getFundingStageColor = (stage: string) => {
    switch (stage) {
      case 'Funded':
        return 'bg-green-100 text-green-800';
      case 'Growth':
        return 'bg-blue-100 text-blue-800';
      case 'Seeking':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Entrepreneur Directory</h1>
        <p className="text-muted-foreground">Discover and connect with Kenya's innovative entrepreneurs</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{entrepreneurs.length}</p>
            <p className="text-sm text-muted-foreground">Active Entrepreneurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{regions.length}</p>
            <p className="text-sm text-muted-foreground">Counties Covered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{industries.length}</p>
            <p className="text-sm text-muted-foreground">Industries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Badge className="h-8 w-8 text-purple-500 mx-auto mb-2 rounded-full flex items-center justify-center">
              <span>87%</span>
            </Badge>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entrepreneurs or businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entrepreneur Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntrepreneurs.map((entrepreneur) => (
          <Card key={entrepreneur.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <ImageWithFallback
                src={entrepreneur.image}
                alt={entrepreneur.businessName}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{entrepreneur.businessName}</CardTitle>
                  <CardDescription>by {entrepreneur.name}</CardDescription>
                </div>
                <Badge className={getFundingStageColor(entrepreneur.fundingStage)}>
                  {entrepreneur.fundingStage}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{entrepreneur.region}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {entrepreneur.industry}
                  </Badge>
                </div>
                
                <p className="text-sm line-clamp-3">{entrepreneur.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{entrepreneur.employees} employees</span>
                  <span>Founded {entrepreneur.founded}</span>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  {entrepreneur.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://${entrepreneur.website}`} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-3 w-3 mr-1" />
                        Website
                      </a>
                    </Button>
                  )}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedEntrepreneur(entrepreneur)}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{selectedEntrepreneur?.businessName}</DialogTitle>
                        <DialogDescription>
                          Connect with {selectedEntrepreneur?.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedEntrepreneur && (
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                                {selectedEntrepreneur.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold">{selectedEntrepreneur.businessName}</h3>
                              <p className="text-sm text-muted-foreground">{selectedEntrepreneur.name}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <span>{selectedEntrepreneur.region}</span>
                                <span>•</span>
                                <span>{selectedEntrepreneur.industry}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">About</h4>
                            <p className="text-sm text-muted-foreground">{selectedEntrepreneur.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Achievements</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedEntrepreneur.achievements.map((achievement: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Send a Message</h4>
                            <Textarea
                              placeholder="Introduce yourself and explain how you'd like to connect or collaborate..."
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              rows={4}
                            />
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <Button variant="outline" asChild>
                              <a href={`https://${selectedEntrepreneur.website}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Website
                              </a>
                            </Button>
                            <Button>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Message
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredEntrepreneurs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No entrepreneurs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}