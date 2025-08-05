import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Image, 
  Calendar as CalendarIcon,
  Filter,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format, subDays, subMonths, subYears } from 'date-fns';

interface ExportConfig {
  format: 'csv' | 'pdf' | 'excel' | 'png' | 'json';
  dataType: 'investments' | 'reports' | 'applications' | 'analytics' | 'documents';
  dateRange: {
    from: Date;
    to: Date;
  };
  filters: {
    countries: string[];
    valueChains: string[];
    status: string[];
    riskLevels: string[];
  };
  includeFields: string[];
  groupBy?: string;
  sortBy?: string;
  fileName?: string;
}

interface AdvancedExportToolProps {
  defaultConfig?: Partial<ExportConfig>;
  onExport: (config: ExportConfig) => Promise<void>;
  availableData: {
    countries: string[];
    valueChains: string[];
    statuses: string[];
    fields: { key: string; label: string; type: 'text' | 'number' | 'date' | 'boolean' }[];
  };
}

export function AdvancedExportTool({ defaultConfig, onExport, availableData }: AdvancedExportToolProps) {
  const [config, setConfig] = useState<ExportConfig>({
    format: 'csv',
    dataType: 'investments',
    dateRange: {
      from: subMonths(new Date(), 6),
      to: new Date()
    },
    filters: {
      countries: [],
      valueChains: [],
      status: [],
      riskLevels: []
    },
    includeFields: [],
    ...defaultConfig
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV File', icon: FileSpreadsheet, description: 'Comma-separated values for Excel' },
    { value: 'excel', label: 'Excel File', icon: FileSpreadsheet, description: 'Native Excel format with formatting' },
    { value: 'pdf', label: 'PDF Report', icon: FileText, description: 'Formatted report document' },
    { value: 'json', label: 'JSON Data', icon: FileText, description: 'Raw data for developers' },
    { value: 'png', label: 'Chart Image', icon: Image, description: 'Visualization as image' }
  ];

  const dataTypeOptions = [
    { value: 'investments', label: 'Partner Investments', description: 'Investment data and performance metrics' },
    { value: 'applications', label: 'Applications', description: 'Loan and grant applications' },
    { value: 'reports', label: 'M&E Reports', description: 'Monitoring and evaluation reports' },
    { value: 'analytics', label: 'Analytics Data', description: 'Aggregated analytics and insights' },
    { value: 'documents', label: 'Document Metadata', description: 'File information and logs' }
  ];

  const quickDateRanges = [
    { label: 'Last 30 days', value: 30 },
    { label: 'Last 3 months', value: 90 },
    { label: 'Last 6 months', value: 180 },
    { label: 'Last year', value: 365 },
    { label: 'All time', value: 0 }
  ];

  const handleConfigChange = (field: keyof ExportConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterChange = (filterType: keyof ExportConfig['filters'], values: string[]) => {
    setConfig(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: values
      }
    }));
  };

  const handleFieldToggle = (field: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      includeFields: checked 
        ? [...prev.includeFields, field]
        : prev.includeFields.filter(f => f !== field)
    }));
  };

  const handleQuickDateRange = (days: number) => {
    if (days === 0) {
      // All time
      handleConfigChange('dateRange', {
        from: subYears(new Date(), 5),
        to: new Date()
      });
    } else {
      handleConfigChange('dateRange', {
        from: subDays(new Date(), days),
        to: new Date()
      });
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('processing');
    setExportProgress(0);

    try {
      // Simulate export progress
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      await onExport(config);
      
      clearInterval(progressInterval);
      setExportProgress(100);
      setExportStatus('completed');
      
      setTimeout(() => {
        setExportStatus('idle');
        setIsExporting(false);
        setExportProgress(0);
      }, 2000);
    } catch (error) {
      setExportStatus('error');
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const getFormatIcon = (format: string) => {
    const option = formatOptions.find(opt => opt.value === format);
    return option?.icon || FileText;
  };

  const getEstimatedSize = () => {
    // Mock calculation based on selected options
    const baseSize = config.includeFields.length * 100; // KB per field
    const multiplier = config.filters.countries.length || 1;
    return Math.max(50, baseSize * multiplier);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Advanced Export Tool</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Configure and export your data with advanced filtering and formatting options
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Format Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Export Format</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {formatOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = config.format === option.value;
              
              return (
                <Card 
                  key={option.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleConfigChange('format', option.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Data Type Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Data Type</Label>
          <Select value={config.dataType} onValueChange={(value) => handleConfigChange('dataType', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dataTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Date Range</Label>
          <div className="flex items-center space-x-2 mb-2">
            {quickDateRanges.map((range) => (
              <Button
                key={range.value}
                variant="outline"
                size="sm"
                onClick={() => handleQuickDateRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {format(config.dateRange.from, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={config.dateRange.from}
                    onSelect={(date) => date && handleConfigChange('dateRange', {
                      ...config.dateRange,
                      from: date
                    })}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {format(config.dateRange.to, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={config.dateRange.to}
                    onSelect={(date) => date && handleConfigChange('dateRange', {
                      ...config.dateRange,
                      to: date
                    })}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Label className="text-base font-medium">Filters</Label>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Settings className="w-4 h-4 mr-2" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Countries */}
            <div>
              <Label>Countries</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select countries" />
                </SelectTrigger>
                <SelectContent>
                  {availableData.countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={config.filters.countries.includes(country)}
                          onCheckedChange={(checked) => {
                            const newCountries = checked
                              ? [...config.filters.countries, country]
                              : config.filters.countries.filter(c => c !== country);
                            handleFilterChange('countries', newCountries);
                          }}
                        />
                        <span>{country}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {config.filters.countries.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {config.filters.countries.map((country) => (
                    <Badge key={country} variant="secondary">
                      {country}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Value Chains */}
            <div>
              <Label>Value Chains</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select sectors" />
                </SelectTrigger>
                <SelectContent>
                  {availableData.valueChains.map((chain) => (
                    <SelectItem key={chain} value={chain}>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={config.filters.valueChains.includes(chain)}
                          onCheckedChange={(checked) => {
                            const newChains = checked
                              ? [...config.filters.valueChains, chain]
                              : config.filters.valueChains.filter(c => c !== chain);
                            handleFilterChange('valueChains', newChains);
                          }}
                        />
                        <span>{chain}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {config.filters.valueChains.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {config.filters.valueChains.map((chain) => (
                    <Badge key={chain} variant="secondary">
                      {chain}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
            <h4 className="font-medium">Advanced Options</h4>
            
            {/* Field Selection */}
            <div>
              <Label>Include Fields</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {availableData.fields.map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <Checkbox 
                      id={field.key}
                      checked={config.includeFields.includes(field.key)}
                      onCheckedChange={(checked) => handleFieldToggle(field.key, checked)}
                    />
                    <Label htmlFor={field.key} className="text-sm">
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="groupBy">Group By</Label>
                <Select value={config.groupBy || ''} onValueChange={(value) => handleConfigChange('groupBy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="No grouping" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No grouping</SelectItem>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="valueChain">Value Chain</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fileName">Custom File Name</Label>
                <Input
                  id="fileName"
                  placeholder="export-data"
                  value={config.fileName || ''}
                  onChange={(e) => handleConfigChange('fileName', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Export Status */}
        {isExporting && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {exportStatus === 'processing' && <Clock className="w-4 h-4 text-blue-600" />}
              {exportStatus === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
              {exportStatus === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
              <span className="font-medium">
                {exportStatus === 'processing' && 'Preparing export...'}
                {exportStatus === 'completed' && 'Export completed!'}
                {exportStatus === 'error' && 'Export failed'}
              </span>
            </div>
            <Progress value={exportProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Estimated file size: ~{getEstimatedSize()}KB
            </p>
          </div>
        )}

        {/* Export Button */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {config.includeFields.length} fields selected • 
            {config.filters.countries.length > 0 ? ` ${config.filters.countries.length} countries` : ' All countries'} • 
            {format(config.dateRange.from, 'MMM d')} - {format(config.dateRange.to, 'MMM d, yyyy')}
          </div>
          
          <Button 
            onClick={handleExport}
            disabled={isExporting || config.includeFields.length === 0}
            size="lg"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Exporting...
              </>
            ) : (
              <>
                {React.createElement(getFormatIcon(config.format), { className: "w-4 h-4 mr-2" })}
                Export {config.format.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}