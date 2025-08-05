import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { 
  GraduationCap, 
  PlayCircle, 
  BookOpen, 
  HelpCircle,
  Clock,
  CheckCircle,
  Star,
  Download,
  ExternalLink,
  Video,
  FileText,
  Users
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { EDUCATION_MODULES, FAQ_CATEGORIES } from './constants';

interface LoanEducationProps {
  user: User;
}

export function LoanEducation({ user }: LoanEducationProps) {
  const [selectedTab, setSelectedTab] = useState('courses');
  const [completedModules, setCompletedModules] = useState(['basics']);

  const markAsCompleted = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const completionPercentage = (completedModules.length / EDUCATION_MODULES.length) * 100;

  const resources = [
    {
      id: '1',
      title: 'Business Plan Template',
      description: 'Comprehensive business plan template specifically for creative businesses',
      type: 'document',
      downloadUrl: '/resources/business-plan-template.pdf'
    },
    {
      id: '2',
      title: 'Financial Projection Spreadsheet',
      description: 'Excel template for creating financial projections and cash flow analysis',
      type: 'spreadsheet',
      downloadUrl: '/resources/financial-projections.xlsx'
    },
    {
      id: '3',
      title: 'Loan Application Checklist',
      description: 'Step-by-step checklist to ensure your loan application is complete',
      type: 'document',
      downloadUrl: '/resources/application-checklist.pdf'
    },
    {
      id: '4',
      title: 'Creative Business Success Stories',
      description: 'Case studies of successful creative businesses that have grown with HEVA support',
      type: 'video',
      downloadUrl: '/resources/success-stories.mp4'
    }
  ];

  const webinars = [
    {
      id: '1',
      title: 'Digital Marketing for Creative Businesses',
      date: '2024-02-15T18:00:00Z',
      speaker: 'Sarah Johnson, Marketing Expert',
      duration: '60 minutes',
      registrationUrl: '#',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Financial Management Best Practices',
      date: '2024-02-08T18:00:00Z',
      speaker: 'Michael Chen, Financial Advisor',
      duration: '45 minutes',
      registrationUrl: '#',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Scaling Your Creative Business',
      date: '2024-02-22T18:00:00Z',
      speaker: 'Grace Wanjiku, Entrepreneur',
      duration: '75 minutes',
      registrationUrl: '#',
      status: 'upcoming'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold flex items-center space-x-2">
          <GraduationCap className="w-6 h-6" />
          <span>Loan Education</span>
        </h1>
        <p className="text-muted-foreground">
          Learn everything you need to know about business loans and growing your creative business
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Your Learning Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedModules.length} of {EDUCATION_MODULES.length} modules completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-primary">{completionPercentage.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4">
            {EDUCATION_MODULES.map((module) => {
              const isCompleted = completedModules.includes(module.id);
              
              return (
                <Card key={module.id} className={`${isCompleted ? 'border-green-200 bg-green-50/30 dark:bg-green-900/10' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{module.title}</h3>
                          {isCompleted && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {module.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{module.duration}</span>
                          </div>
                          <Badge className={getDifficultyColor(module.difficulty)} variant="outline">
                            {module.difficulty}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {module.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        {isCompleted ? (
                          <Button variant="outline" size="sm">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => markAsCompleted(module.id)}>
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Start Learning
                          </Button>
                        )}
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          <span>4.8 (234)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {resource.type === 'document' && <FileText className="w-5 h-5 text-primary" />}
                        {resource.type === 'spreadsheet' && <FileText className="w-5 h-5 text-primary" />}
                        {resource.type === 'video' && <Video className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs capitalize">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-4">
          <div className="grid gap-4">
            {webinars.map((webinar) => (
              <Card key={webinar.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Users className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{webinar.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{webinar.speaker}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{new Date(webinar.date).toLocaleDateString()}</span>
                          <span>{webinar.duration}</span>
                        </div>
                        <Badge 
                          variant={webinar.status === 'upcoming' ? 'default' : 'secondary'} 
                          className="mt-2 text-xs"
                        >
                          {webinar.status}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant={webinar.status === 'upcoming' ? 'default' : 'outline'} 
                      size="sm"
                    >
                      {webinar.status === 'upcoming' ? (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Register
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Watch Recording
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          {FAQ_CATEGORIES.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((qa, index) => (
                    <AccordionItem key={index} value={`${category.id}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {qa.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {qa.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Contact Support */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <h3 className="font-semibold">Still have questions?</h3>
            <p className="text-sm text-muted-foreground">
              Our support team is here to help you succeed with your loan application and business growth.
            </p>
            <div className="flex justify-center space-x-3">
              <Button variant="outline">
                <HelpCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button>
                <BookOpen className="w-4 h-4 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}