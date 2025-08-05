import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Upload, 
  FileText, 
  Calendar,
  Receipt,
  PieChart
} from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface FundTrackerProps {
  detailed?: boolean;
}

export function FundTracker({ detailed = false }: FundTrackerProps) {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Equipment', amount: 15000, date: '2024-01-15', description: 'Sewing machine and tools', receipt: true },
    { id: 2, category: 'Materials', amount: 8500, date: '2024-01-20', description: 'Fabric and accessories', receipt: true },
    { id: 3, category: 'Marketing', amount: 3200, date: '2024-01-25', description: 'Social media ads', receipt: false },
    { id: 4, category: 'Training', amount: 5000, date: '2024-02-01', description: 'Business skills workshop', receipt: true }
  ]);

  const totalFunds = 45000;
  const usedFunds = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingFunds = totalFunds - usedFunds;
  const utilizationPercentage = (usedFunds / totalFunds) * 100;

  const categoryData = [
    { name: 'Equipment', value: 15000, color: '#14b8a6' },
    { name: 'Materials', value: 8500, color: '#8b5cf6' },
    { name: 'Marketing', value: 3200, color: '#06b6d4' },
    { name: 'Training', value: 5000, color: '#84cc16' }
  ];

  const monthlyData = [
    { month: 'Jan', expenses: 26700, revenue: 18000 },
    { month: 'Feb', revenue: 25000 }
  ];

  if (!detailed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span>Fund Utilization</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Total Funds</span>
              <span className="font-medium">KSh {totalFunds.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Used</span>
              <span className="font-medium text-orange-600">KSh {usedFunds.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining</span>
              <span className="font-medium text-green-600">KSh {remainingFunds.toLocaleString()}</span>
            </div>
            <Progress value={utilizationPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground text-center">
              {utilizationPercentage.toFixed(1)}% utilized
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Fund Reports & Tracking</h1>
        <p className="text-muted-foreground">Monitor your fund utilization and submit reports</p>
      </div>

      {/* Fund Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Funds</p>
                <p className="text-2xl font-bold">KSh {totalFunds.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Used</p>
                <p className="text-2xl font-bold text-orange-600">KSh {usedFunds.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-green-600">KSh {remainingFunds.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Utilization Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Fund Utilization Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Overall Progress</span>
              <span className="font-medium">{utilizationPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={utilizationPercentage} className="h-3" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Target utilization by month 3:</span>
                <span className="font-medium ml-2">75%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Current pace:</span>
                <span className="font-medium ml-2 text-green-600">On track</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
          <TabsTrigger value="reports">Submit Report</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <RechartsPieChart data={categoryData} dataKey="value">
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                      <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">KSh {category.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Receipt className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">{expense.category} • {expense.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">KSh {expense.amount.toLocaleString()}</span>
                      {expense.receipt ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">Receipt</Badge>
                      ) : (
                        <Badge variant="destructive">No Receipt</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Monthly Report</CardTitle>
              <CardDescription>Upload receipts and provide expense breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportMonth">Report Month</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan2024">January 2024</SelectItem>
                      <SelectItem value="feb2024">February 2024</SelectItem>
                      <SelectItem value="mar2024">March 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalExpenses">Total Expenses</Label>
                  <Input type="number" placeholder="Enter total amount" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Business Update</Label>
                <Textarea 
                  placeholder="Describe your business progress, sales, challenges, and how the funds helped..."
                  rows={4}
                />
              </div>
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">Upload Receipts</p>
                <p className="text-xs text-muted-foreground mb-3">Drag and drop files or click to browse</p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              
              <Button className="w-full">Submit Report</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    <Bar dataKey="revenue" fill="#22c55e" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}