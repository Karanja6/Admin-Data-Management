import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Upload, CheckCircle } from 'lucide-react';
import { DocumentUploads } from '../types';

interface DocumentsTabProps {
  documents: DocumentUploads;
  onFileUpload: (field: keyof DocumentUploads, files: FileList | null) => void;
}

export function DocumentsTab({ documents, onFileUpload }: DocumentsTabProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <Label className="text-base font-medium flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Required Documents</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-4">Please upload the following required documents</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">CR12 Certificate</Label>
                {documents.cr12 && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => onFileUpload('cr12', e.target.files)}
              />
              <p className="text-xs text-muted-foreground">Business registration certificate</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">Financial Statements</Label>
                {documents.financialStatements && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
              <Input
                type="file"
                accept=".pdf,.xls,.xlsx"
                onChange={(e) => onFileUpload('financialStatements', e.target.files)}
              />
              <p className="text-xs text-muted-foreground">Recent financial statements</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">Business Plan</Label>
                {documents.businessPlan && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => onFileUpload('businessPlan', e.target.files)}
              />
              <p className="text-xs text-muted-foreground">Detailed business plan</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">Collateral Documents</Label>
                {documents.collateralDocuments && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => onFileUpload('collateralDocuments', e.target.files)}
              />
              <p className="text-xs text-muted-foreground">Collateral documentation (if applicable)</p>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Additional Documents</Label>
        <p className="text-sm text-muted-foreground mb-4">Upload photos, invoices, and other supporting documents</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="space-y-3">
              <Label className="font-medium">Business Photos</Label>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={(e) => onFileUpload('photos', e.target.files)}
              />
              <p className="text-xs text-muted-foreground">Photos of your business, products, or workspace</p>
              {documents.photos.length > 0 && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs">{documents.photos.length} photo(s) uploaded</span>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-3">
              <Label className="font-medium">Invoices</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={(e) => onFileUpload('invoices', e.target.files)}
              />
              <p className="text-xs text-muted-foreground">Recent invoices or receipts</p>
              {documents.invoices.length > 0 && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs">{documents.invoices.length} invoice(s) uploaded</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Cloud Storage Integration */}
      <Card className="p-4 bg-accent/10">
        <div className="space-y-3">
          <Label className="text-base font-medium">Cloud Storage Integration</Label>
          <p className="text-sm text-muted-foreground">
            You can also upload documents directly from Google Drive or OneDrive
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"/>
              </svg>
              Google Drive
            </Button>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.053c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.007 24 18.042 24 12.053z"/>
              </svg>
              OneDrive
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}