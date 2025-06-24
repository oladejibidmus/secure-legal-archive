
import { useState } from "react";
import { Search, Filter, FileText, Calendar, User, Tag, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchInterfaceProps {
  searchQuery: string;
}

const SearchInterface = ({ searchQuery: initialQuery }: SearchInterfaceProps) => {
  const [query, setQuery] = useState(initialQuery || "");
  const [filters, setFilters] = useState({
    documentType: "",
    dateRange: "",
    status: "",
    confidentiality: ""
  });
  const [advancedMode, setAdvancedMode] = useState(false);

  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: "Client Agreement - Smith vs Jones",
      excerpt: "This agreement outlines the terms of legal representation for the case involving construction disputes...",
      caseNumber: "2024-CV-001",
      documentType: "Contract",
      lastModified: "2024-01-15",
      author: "Sarah Johnson",
      status: "approved",
      confidentiality: "Attorney-Client Privileged",
      relevanceScore: 95
    },
    {
      id: 2,
      title: "Motion for Summary Judgment",
      excerpt: "Defendant respectfully moves this Court for summary judgment on all claims pursuant to Rule 56...",
      caseNumber: "2024-CV-002",
      documentType: "Motion",
      lastModified: "2024-01-14",
      author: "Robert Chen",
      status: "draft",
      confidentiality: "Internal",
      relevanceScore: 87
    },
    {
      id: 3,
      title: "Discovery Request - Williams Case",
      excerpt: "Plaintiff hereby requests the following documents and information pursuant to Rules 26 and 34...",
      caseNumber: "2024-CR-002",
      documentType: "Discovery",
      lastModified: "2024-01-13",
      author: "Emily Davis",
      status: "pending",
      confidentiality: "Confidential",
      relevanceScore: 82
    },
    {
      id: 4,
      title: "Deposition Notes - Martinez",
      excerpt: "Notes from the deposition of Carlos Martinez regarding the accident that occurred on...",
      caseNumber: "2023-PI-045",
      documentType: "Notes",
      lastModified: "2024-01-12",
      author: "Sarah Johnson",
      status: "approved",
      confidentiality: "Attorney Work Product",
      relevanceScore: 78
    }
  ];

  const documentTypes = ["Contract", "Motion", "Brief", "Discovery", "Pleading", "Correspondence", "Evidence", "Notes"];
  const statusOptions = ["approved", "pending", "draft"];
  const confidentialityOptions = ["Public", "Internal", "Confidential", "Attorney-Client Privileged", "Attorney Work Product"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getConfidentialityColor = (level: string) => {
    switch (level) {
      case "Attorney-Client Privileged":
      case "Attorney Work Product":
        return "bg-red-100 text-red-800";
      case "Confidential":
        return "bg-orange-100 text-orange-800";
      case "Internal":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = () => {
    console.log("Searching for:", query, "with filters:", filters);
  };

  const clearFilters = () => {
    setFilters({
      documentType: "",
      dateRange: "",
      status: "",
      confidentiality: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center">
            <Search className="h-6 w-6 mr-2 text-blue-600" />
            Document Search
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Main Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by document title, content, case number, or author..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 text-lg py-3"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAdvancedMode(!advancedMode)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                {advancedMode ? "Hide" : "Show"} Filters
              </Button>
              {Object.values(filters).some(f => f) && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Advanced Filters */}
            {advancedMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Document Type</label>
                  <Select value={filters.documentType} onValueChange={(value) => setFilters({...filters, documentType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any type</SelectItem>
                      {documentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Date Range</label>
                  <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                      <SelectItem value="year">This year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any status</SelectItem>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Confidentiality</label>
                  <Select value={filters.confidentiality} onValueChange={(value) => setFilters({...filters, confidentiality: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any level</SelectItem>
                      {confidentialityOptions.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Search Documents
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            Search Results ({searchResults.length})
          </h3>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date Modified</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {searchResults.map((result) => (
            <Card key={result.id} className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 hover:text-blue-600">
                        {result.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                        <span>Case: {result.caseNumber}</span>
                        <Badge variant="outline" className="text-xs">
                          {result.documentType}
                        </Badge>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {result.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {result.lastModified}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                        {result.status}
                      </Badge>
                      <Badge className={`text-xs ${getConfidentialityColor(result.confidentiality)}`}>
                        {result.confidentiality}
                      </Badge>
                      <div className="text-sm font-medium text-blue-600">
                        {result.relevanceScore}%
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {result.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <div className="flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        PDF Document
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Modified {result.lastModified}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Open Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;
