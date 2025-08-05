import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { GuestSidebar } from './GuestSidebar';
import { GuestDirectory } from './GuestDirectory';
import { Settings } from './Settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '../App';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Building2,
  Heart,
  MessageSquare,
  Share2,
  ExternalLink
} from 'lucide-react';

interface GuestCommunityProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (updatedUser: User) => void;
}

type GuestView = 'community' | 'directory' | 'settings';

export function GuestCommunity({ user, onLogout, onUserUpdate }: GuestCommunityProps) {
  const [activeView, setActiveView] = useState<GuestView>('community');

  // Featured entrepreneurs data
  const featuredEntrepreneurs = [
    {
      id: '1',
      name: 'Sarah Mwangi',
      businessName: 'EcoFarm Solutions',
      businessType: 'Agriculture',
      location: 'Nairobi, Kenya',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b74fe7b3?w=150&h=150&fit=crop&crop=face',
      bio: 'Revolutionizing sustainable farming practices across Kenya with smart irrigation systems.',
      fundingReceived: 75000,
      jobsCreated: 12,
      featured: true
    },
    {
      id: '2',
      name: 'James Kiprotich',
      businessName: 'TechCraft Kenya',
      businessType: 'Technology',
      location: 'Mombasa, Kenya',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Building mobile applications that solve everyday problems for African communities.',
      fundingReceived: 120000,
      jobsCreated: 8,
      featured: true
    },
    {
      id: '3',
      name: 'Grace Njeri',
      businessName: 'Artisan Crafts Co.',
      businessType: 'Manufacturing',
      location: 'Kisumu, Kenya',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Empowering local artisans through fair trade and modern e-commerce platforms.',
      fundingReceived: 45000,
      jobsCreated: 25,
      featured: true
    }
  ];

  const communityPosts = [
    {
      id: '1',
      author: 'Sarah Mwangi',
      authorPicture: 'https://images.unsplash.com/photo-1494790108755-2616b74fe7b3?w=150&h=150&fit=crop&crop=face',
      businessName: 'EcoFarm Solutions',
      content: 'Just completed our first quarter with a 40% increase in crop yields using our smart irrigation system! Excited to scale this to more farms across Kenya. 🌱',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      author: 'James Kiprotich',
      authorPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      businessName: 'TechCraft Kenya',
      content: 'Our new mobile payment app just reached 10,000 downloads! Thank you to everyone who supported us through the HEVA program. The journey is just beginning! 💪',
      timestamp: '5 hours ago',
      likes: 42,
      comments: 15
    },
    {
      id: '3',
      author: 'Grace Njeri',
      authorPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      businessName: 'Artisan Crafts Co.',
      content: 'Proud to announce our partnership with 15 new artisan groups in Western Kenya. Together, we\'re preserving traditional crafts while building sustainable livelihoods.',
      timestamp: '1 day ago',
      likes: 18,
      comments: 6,
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=250&fit=crop'
    }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'community':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1>Community Showcase</h1>
              <p className="text-muted-foreground">
                Discover inspiring entrepreneurs building the future of Kenya
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-sm text-muted-foreground">Active Entrepreneurs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Building2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">189</p>
                  <p className="text-sm text-muted-foreground">Funded Businesses</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Jobs Created</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-sm text-muted-foreground">Counties Reached</p>
                </CardContent>
              </Card>
            </div>

            {/* Featured Entrepreneurs */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Entrepreneurs</CardTitle>
                <CardDescription>
                  Meet some of our most successful HEVA-funded entrepreneurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredEntrepreneurs.map((entrepreneur) => (
                    <div key={entrepreneur.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={entrepreneur.profilePicture} alt={entrepreneur.name} />
                          <AvatarFallback>
                            {entrepreneur.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{entrepreneur.name}</h3>
                          <p className="text-sm text-muted-foreground">{entrepreneur.businessName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{entrepreneur.businessType}</Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{entrepreneur.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm">{entrepreneur.bio}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Funding</p>
                          <p className="font-medium">KSh {entrepreneur.fundingReceived.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Jobs Created</p>
                          <p className="font-medium">{entrepreneur.jobsCreated}</p>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Community Updates</CardTitle>
                <CardDescription>
                  Latest updates and success stories from our entrepreneur community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="border-b border-border/50 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.authorPicture} alt={post.author} />
                        <AvatarFallback>
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-medium">{post.author}</h4>
                          <p className="text-sm text-muted-foreground">{post.businessName} • {post.timestamp}</p>
                        </div>
                        
                        <p className="text-sm">{post.content}</p>
                        
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );
      
      case 'directory':
        return <GuestDirectory />;
        
      case 'settings':
        return (
          <Settings 
            user={user} 
            onUserUpdate={onUserUpdate} 
            onLogout={onLogout} 
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      sidebar={<GuestSidebar activeView={activeView} onViewChange={setActiveView} />}
    >
      <div className="p-6">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
}