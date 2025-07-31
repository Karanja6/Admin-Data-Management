import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  Camera, 
  TrendingUp,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CommunityShowcaseProps {
  isOverview?: boolean;
}

export function CommunityShowcase({ isOverview = false }: CommunityShowcaseProps) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Wanjiku',
      business: 'Eco Crafts Kenya',
      avatar: '',
      location: 'Nairobi',
      industry: 'Manufacturing',
      time: '2 hours ago',
      content: 'Excited to share that we just completed our first batch of 100 eco-friendly bags! The HEVA funding helped us purchase better equipment and materials. Sales are picking up and we\'re already planning the next batch! 🌿',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop',
      likes: 24,
      comments: 8,
      metrics: {
        sales: '+40%',
        production: '100 units',
        employees: 3
      },
      tags: ['Sustainability', 'Manufacturing', 'Growth']
    },
    {
      id: 2,
      author: 'John Muturi',
      business: 'TechSolutions KE',
      avatar: '',
      location: 'Kisumu',
      industry: 'Technology',
      time: '1 day ago',
      content: 'Just launched our mobile app for local farmers! Thanks to HEVA\'s support, we were able to hire a developer and complete the project. Already have 50+ farmers signed up in the first week.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      likes: 18,
      comments: 12,
      metrics: {
        users: '50+',
        revenue: 'KSh 15K',
        growth: '+120%'
      },
      tags: ['Technology', 'Agriculture', 'Innovation']
    }
  ]);

  const [newPost, setNewPost] = useState({
    content: '',
    image: null,
    metrics: {
      sales: '',
      production: '',
      employees: ''
    }
  });

  if (isOverview) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Community
            <Badge variant="secondary">{posts.length} Updates</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {posts.slice(0, 2).map((post) => (
              <div key={post.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-xs">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{post.business}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.content}</p>
                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Community Showcase</h1>
          <p className="text-muted-foreground">Share your business journey and connect with other entrepreneurs</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Add Update
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Share Business Update</DialogTitle>
              <DialogDescription>
                Let the community know about your progress and achievements
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your business progress, milestones, challenges, or insights..."
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                rows={4}
              />
              
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Sales Growth</label>
                  <Input 
                    placeholder="+25%" 
                    value={newPost.metrics.sales}
                    onChange={(e) => setNewPost({
                      ...newPost, 
                      metrics: {...newPost.metrics, sales: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Production</label>
                  <Input 
                    placeholder="50 units" 
                    value={newPost.metrics.production}
                    onChange={(e) => setNewPost({
                      ...newPost, 
                      metrics: {...newPost.metrics, production: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Team Size</label>
                  <Input 
                    placeholder="3 people" 
                    value={newPost.metrics.employees}
                    onChange={(e) => setNewPost({
                      ...newPost, 
                      metrics: {...newPost.metrics, employees: e.target.value}
                    })}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Add Chart
                </Button>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Share Update</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-sm text-muted-foreground">Active Entrepreneurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">KSh 15M</p>
            <p className="text-sm text-muted-foreground">Total Funding</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">3,456</p>
            <p className="text-sm text-muted-foreground">Community Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">12,890</p>
            <p className="text-sm text-muted-foreground">Success Stories</p>
          </CardContent>
        </Card>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{post.author}</h4>
                      <Badge variant="outline" className="text-xs">{post.industry}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.business}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="mb-4">{post.content}</p>
              
              {post.image && (
                <div className="mb-4">
                  <ImageWithFallback
                    src={post.image}
                    alt="Business update"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              {/* Business Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-accent/50 rounded-lg">
                {Object.entries(post.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-sm font-medium capitalize">{key}</p>
                    <p className="text-lg font-bold text-primary">{value}</p>
                  </div>
                ))}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              {/* Engagement */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}