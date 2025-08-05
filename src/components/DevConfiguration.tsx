import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Database, 
  CheckCircle, 
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  Zap,
  Code,
  Lightbulb
} from 'lucide-react';
import { getSupabaseConnectionStatus, isDevelopmentMode } from '../lib/supabase/client';

export function DevConfiguration() {
  const [showEnvVars, setShowEnvVars] = useState(false);
  const connectionStatus = getSupabaseConnectionStatus();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Backend Configuration</span>
          <Badge variant={connectionStatus.isConnected ? 'default' : 'outline'} className="bg-blue-100 text-blue-800 dark:bg-blue-900/20">
            {connectionStatus.isConnected ? 'Live Data' : 'Demo Mode'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
          <CheckCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription>
            {connectionStatus.isConnected ? (
              <span>✅ Successfully connected to Supabase at <code>{connectionStatus.url}</code></span>
            ) : (
              <span>🚀 Running in <strong>Development Mode</strong> with full ML capabilities and demo data. Perfect for testing and development!</span>
            )}
          </AlertDescription>
        </Alert>

        {isDevelopmentMode() && (
          <div className="space-y-4">
            {/* Development Mode Features */}
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Available Features (Development Mode)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">ML Risk Assessment Engine</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Predictive Analytics</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Application Workflow</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Dashboard Analytics</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Export Functionality</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Demo Data & Scenarios</span>
                </div>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <strong>Development Mode Benefits:</strong> You can explore all features, test the ML algorithms, and experience the complete user journey without needing to set up a database. Perfect for demos, development, and testing!
              </AlertDescription>
            </Alert>

            <Separator />

            {/* Optional: Connect to Live Database */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <span>🔄 Want to connect to a live database?</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEnvVars(!showEnvVars)}
                >
                  {showEnvVars ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showEnvVars ? 'Hide' : 'Show'} Setup
                </Button>
              </h4>
              
              {showEnvVars && (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  {/* Step 1: Supabase Project */}
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</span>
                      <span>Create Supabase Project</span>
                    </h4>
                    <div className="ml-8 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Create a new project at{' '}
                        <a 
                          href="https://supabase.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center"
                        >
                          supabase.com <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Note your Project URL and anon key from the API settings.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Step 2: Environment Variables */}
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</span>
                      <span>Configure Environment Variables</span>
                    </h4>
                    
                    <div className="ml-8 space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Add these environment variables to your hosting platform or development environment:
                      </p>
                      
                      <div className="space-y-2">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <code className="text-sm">VITE_SUPABASE_URL=your_project_url</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard('VITE_SUPABASE_URL=your_project_url')}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <code className="text-sm">VITE_SUPABASE_ANON_KEY=your_anon_key</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard('VITE_SUPABASE_ANON_KEY=your_anon_key')}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Database className="h-4 w-4" />
                        <AlertDescription>
                          <strong>For Create React App:</strong> Use <code>REACT_APP_SUPABASE_URL</code> and <code>REACT_APP_SUPABASE_ANON_KEY</code> instead.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>

                  <Separator />

                  {/* Step 3: Database Schema */}
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">3</span>
                      <span>Set Up Database Schema</span>
                    </h4>
                    <div className="ml-8 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Create the required database tables using the SQL Editor in your Supabase dashboard:
                      </p>
                      <div className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                        <pre>{`-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'analyst', 'program_officer', 'entrepreneur')),
  profile_picture TEXT,
  phone TEXT,
  department TEXT,
  location TEXT,
  business_info JSONB,
  preferences JSONB,
  permissions JSONB,
  date_joined TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  business_name TEXT,
  country TEXT NOT NULL,
  value_chain TEXT NOT NULL,
  loan_type TEXT NOT NULL CHECK (loan_type IN ('loan', 'grant')),
  requested_amount DECIMAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  ml_assessment JSONB,
  risk_score INTEGER,
  eligibility_score INTEGER,
  documents JSONB,
  submission_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Investments table
CREATE TABLE investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES applications(id),
  user_id UUID REFERENCES users(id),
  partner_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  country TEXT NOT NULL,
  sector TEXT NOT NULL,
  investment_amount DECIMAL NOT NULL,
  date_funded TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active',
  repayment_progress INTEGER DEFAULT 0,
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),
  jobs_created INTEGER,
  revenue_growth DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {connectionStatus.isConnected && (
          <div className="space-y-2">
            <h4 className="font-medium text-green-600">🎉 Full Production Features Available</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Live Database Integration</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Real-time Data Synchronization</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Persistent Data Storage</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">File Upload & Storage</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Advanced Caching</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Multi-user Collaboration</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}