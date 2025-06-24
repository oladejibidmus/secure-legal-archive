
import { useState } from "react";
import { FolderOpen, Plus, Search, Calendar, User, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CaseManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [newCase, setNewCase] = useState({
    caseNumber: "",
    title: "",
    clientName: "",
    caseType: "",
    description: ""
  });

  // Mock cases data
  const cases = [
    {
      id: 1,
      caseNumber: "2024-CV-001",
      title: "Smith vs Jones Construction",
      clientName: "John Smith",
      caseType: "Civil Litigation",
      status: "active",
      openedDate: "2024-01-15",
      leadAttorney: "Sarah Johnson",
      documentCount: 24,
      lastActivity: "2024-01-20"
    },
    {
      id: 2,
      caseNumber: "2024-CR-002",
      title: "State vs Williams",
      clientName: "Michael Williams",
      caseType: "Criminal Defense",
      status: "active",
      openedDate: "2024-01-10",
      leadAttorney: "Robert Chen",
      documentCount: 18,
      lastActivity: "2024-01-19"
    },
    {
      id: 3,
      caseNumber: "2024-DV-003",
      title: "Johnson Divorce Proceedings",
      clientName: "Lisa Johnson",
      caseType: "Family Law",
      status: "pending",
      openedDate: "2024-01-08",
      leadAttorney: "Emily Davis",
      documentCount: 12,
      lastActivity: "2024-01-18"
    },
    {
      id: 4,
      caseNumber: "2023-PI-045",
      title: "Martinez Personal Injury",
      clientName: "Carlos Martinez",
      caseType: "Personal Injury",
      status: "closed",
      openedDate: "2023-08-15",
      leadAttorney: "Sarah Johnson",
      documentCount: 47,
      lastActivity: "2024-01-05"
    }
  ];

  const caseTypes = [
    "Civil Litigation",
    "Criminal Defense",
    "Family Law",
    "Personal Injury",
    "Corporate Law",
    "Real Estate",
    "Immigration",
    "Intellectual Property"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || caseItem.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const handleCreateCase = () => {
    console.log("Creating new case:", newCase);
    // Reset form
    setNewCase({
      caseNumber: "",
      title: "",
      clientName: "",
      caseType: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Case Management</h2>
          <p className="text-slate-600">Organize and track all your legal cases</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Case</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="case-number">Case Number</Label>
                <Input
                  id="case-number"
                  placeholder="2024-CV-001"
                  value={newCase.caseNumber}
                  onChange={(e) => setNewCase({...newCase, caseNumber: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="case-title">Case Title</Label>
                <Input
                  id="case-title"
                  placeholder="Smith vs Jones Construction"
                  value={newCase.title}
                  onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name</Label>
                <Input
                  id="client-name"
                  placeholder="John Smith"
                  value={newCase.clientName}
                  onChange={(e) => setNewCase({...newCase, clientName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="case-type">Case Type</Label>
                <Select value={newCase.caseType} onValueChange={(value) => setNewCase({...newCase, caseType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the case..."
                  value={newCase.description}
                  onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleCreateCase} className="bg-blue-600 hover:bg-blue-700">
                  Create Case
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white shadow-sm border-slate-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search cases by number, title, or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cases</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCases.map((caseItem) => (
          <Card key={caseItem.id} className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-slate-900">{caseItem.title}</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Case #{caseItem.caseNumber}</p>
                </div>
                <Badge className={`${getStatusColor(caseItem.status)} text-xs`}>
                  {caseItem.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <User className="h-4 w-4 mr-2" />
                  Client: {caseItem.clientName}
                </div>
                
                <div className="flex items-center text-sm text-slate-600">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Type: {caseItem.caseType}
                </div>
                
                <div className="flex items-center text-sm text-slate-600">
                  <User className="h-4 w-4 mr-2" />
                  Attorney: {caseItem.leadAttorney}
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Opened: {caseItem.openedDate}
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {caseItem.documentCount} docs
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-slate-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Last activity: {caseItem.lastActivity}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card className="bg-white shadow-sm border-slate-200">
          <CardContent className="p-8 text-center">
            <FolderOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No cases found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Create your first case to get started"}
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Case
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CaseManager;
