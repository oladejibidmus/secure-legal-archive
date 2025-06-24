
import { useState } from "react";
import { Upload, Search, FolderOpen, FileText, Users, Shield, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentUpload from "@/components/DocumentUpload";
import CaseManager from "@/components/CaseManager";
import DocumentViewer from "@/components/DocumentViewer";
import SearchInterface from "@/components/SearchInterface";
import AuditTrail from "@/components/AuditTrail";

const Index = () => {
  const [activeCase, setActiveCase] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const recentDocuments = [
    {
      id: 1,
      title: "Client Agreement - Smith vs Jones",
      caseNumber: "2024-CV-001",
      version: 3,
      lastModified: "2024-01-15",
      status: "approved",
      type: "Contract"
    },
    {
      id: 2,
      title: "Motion for Summary Judgment",
      caseNumber: "2024-CV-002",
      version: 1,
      lastModified: "2024-01-14",
      status: "draft",
      type: "Motion"
    },
    {
      id: 3,
      title: "Discovery Request",
      caseNumber: "2024-CV-003",
      version: 2,
      lastModified: "2024-01-13",
      status: "pending",
      type: "Discovery"
    }
  ];

  const stats = [
    { label: "Total Documents", value: "1,247", icon: FileText, trend: "+12%" },
    { label: "Active Cases", value: "34", icon: FolderOpen, trend: "+3%" },
    { label: "Pending Approvals", value: "8", icon: Clock, trend: "-2%" },
    { label: "Team Members", value: "12", icon: Users, trend: "+1%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold">LegalDocs Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                />
              </div>
              <Button variant="outline" className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Document
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.trend} from last month</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="documents" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Documents
            </TabsTrigger>
            <TabsTrigger value="cases" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Cases
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Upload
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Search
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Audit Trail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            {/* Recent Documents */}
            <Card className="bg-white shadow-sm border-slate-200">
              <CardHeader className="border-b border-slate-200">
                <CardTitle className="text-slate-900">Recent Documents</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-200">
                  {recentDocuments.map((doc) => (
                    <div 
                      key={doc.id} 
                      className="p-6 hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h3 className="font-semibold text-slate-900">{doc.title}</h3>
                            <p className="text-sm text-slate-600">Case: {doc.caseNumber}</p>
                            <p className="text-xs text-slate-500">Last modified: {doc.lastModified}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-xs">
                            v{doc.version}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {doc.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedDocument && (
              <DocumentViewer 
                document={selectedDocument} 
                onClose={() => setSelectedDocument(null)} 
              />
            )}
          </TabsContent>

          <TabsContent value="cases">
            <CaseManager />
          </TabsContent>

          <TabsContent value="upload">
            <DocumentUpload />
          </TabsContent>

          <TabsContent value="search">
            <SearchInterface searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="audit">
            <AuditTrail />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
