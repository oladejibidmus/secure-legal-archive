
import { useState } from "react";
import { X, Download, Share2, Edit, Clock, FileText, User, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface DocumentViewerProps {
  document: {
    id: number;
    title: string;
    caseNumber: string;
    version: number;
    lastModified: string;
    status: string;
    type: string;
  };
  onClose: () => void;
}

const DocumentViewer = ({ document, onClose }: DocumentViewerProps) => {
  const [activeTab, setActiveTab] = useState("preview");

  // Mock version history
  const versionHistory = [
    {
      version: 3,
      date: "2024-01-15",
      author: "Sarah Johnson",
      changes: "Updated client contact information and added new exhibits",
      fileSize: "2.4 MB",
      current: true
    },
    {
      version: 2,
      date: "2024-01-10",
      author: "Robert Chen",
      changes: "Revised legal arguments in section 3, added case law citations",
      fileSize: "2.2 MB",
      current: false
    },
    {
      version: 1,
      date: "2024-01-05",
      author: "Sarah Johnson",
      changes: "Initial document creation",
      fileSize: "1.8 MB",
      current: false
    }
  ];

  // Mock annotations
  const annotations = [
    {
      id: 1,
      page: 1,
      author: "Robert Chen",
      date: "2024-01-14",
      type: "comment",
      content: "This section needs more supporting evidence"
    },
    {
      id: 2,
      page: 2,
      author: "Emily Davis",
      date: "2024-01-13",
      type: "highlight",
      content: "Key legal precedent highlighted"
    },
    {
      id: 3,
      page: 3,
      author: "Sarah Johnson",
      date: "2024-01-12",
      type: "note",
      content: "Remember to verify this date with client"
    }
  ];

  // Mock metadata
  const metadata = {
    fileSize: "2.4 MB",
    pages: 15,
    created: "2024-01-05",
    lastAccessed: "2024-01-20",
    confidentiality: "Attorney-Client Privileged",
    retentionDate: "2031-01-05",
    tags: ["Contract", "Client Agreement", "Settlement"]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getAnnotationIcon = (type: string) => {
    switch (type) {
      case "comment": return "💬";
      case "highlight": return "🖍️";
      case "note": return "📝";
      default: return "📌";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] bg-white shadow-xl">
        <CardHeader className="border-b border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-slate-900">{document.title}</CardTitle>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-slate-600">Case: {document.caseNumber}</span>
                <Badge className={`text-xs ${getStatusColor(document.status)}`}>
                  {document.status}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  v{document.version}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {document.type}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-50">
              <TabsTrigger value="preview">Document Preview</TabsTrigger>
              <TabsTrigger value="versions">Version History</TabsTrigger>
              <TabsTrigger value="annotations">Annotations</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>
            
            <div className="h-[60vh] overflow-y-auto">
              <TabsContent value="preview" className="mt-0 h-full">
                <div className="bg-slate-100 h-full flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-24 w-24 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Document Preview</h3>
                    <p className="text-slate-600 mb-4">
                      PDF viewer would be integrated here using PDF.js
                    </p>
                    <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
                      <div className="space-y-4 text-left">
                        <div className="text-center border-b pb-4">
                          <h1 className="text-xl font-bold">CLIENT AGREEMENT</h1>
                          <p className="text-sm text-slate-600">Smith vs Jones Construction</p>
                        </div>
                        <div className="space-y-2">
                          <p><strong>Client:</strong> John Smith</p>
                          <p><strong>Case Number:</strong> {document.caseNumber}</p>
                          <p><strong>Date:</strong> January 15, 2024</p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold">Terms of Representation</h3>
                          <p className="text-sm text-slate-700">
                            This agreement outlines the terms of legal representation for the case of Smith vs Jones Construction...
                          </p>
                        </div>
                        <div className="text-center text-xs text-slate-500 border-t pt-4">
                          Page 1 of {metadata.pages}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="versions" className="mt-0 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Version History</h3>
                  <div className="space-y-4">
                    {versionHistory.map((version) => (
                      <Card key={version.version} className={`${version.current ? 'ring-2 ring-blue-500' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge variant={version.current ? "default" : "outline"}>
                                  Version {version.version}
                                </Badge>
                                {version.current && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center text-sm text-slate-600 space-x-4 mb-2">
                                <div className="flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {version.author}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {version.date}
                                </div>
                                <div className="flex items-center">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {version.fileSize}
                                </div>
                              </div>
                              <p className="text-sm text-slate-700">{version.changes}</p>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <Button variant="outline" size="sm">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              {!version.current && (
                                <Button variant="outline" size="sm">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Restore
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="annotations" className="mt-0 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Annotations ({annotations.length})</h3>
                  <div className="space-y-3">
                    {annotations.map((annotation) => (
                      <Card key={annotation.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <span className="text-xl">{getAnnotationIcon(annotation.type)}</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-slate-900">{annotation.author}</span>
                                  <Badge variant="outline" className="text-xs">
                                    Page {annotation.page}
                                  </Badge>
                                </div>
                                <span className="text-xs text-slate-500">{annotation.date}</span>
                              </div>
                              <p className="text-sm text-slate-700">{annotation.content}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="metadata" className="mt-0 p-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">Document Metadata</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">File Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">File Size:</span>
                          <span className="font-medium">{metadata.fileSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Pages:</span>
                          <span className="font-medium">{metadata.pages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Created:</span>
                          <span className="font-medium">{metadata.created}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Last Accessed:</span>
                          <span className="font-medium">{metadata.lastAccessed}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Security & Compliance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Confidentiality:</span>
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            {metadata.confidentiality}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Retention Until:</span>
                          <span className="font-medium">{metadata.retentionDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3 flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {metadata.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentViewer;
