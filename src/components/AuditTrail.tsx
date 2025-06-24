
import { useState } from "react";
import { Shield, Filter, Download, Calendar, User, FileText, Eye, Edit, Share2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const AuditTrail = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("week");

  // Mock audit log data
  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-01-20 14:30:25",
      user: "Sarah Johnson",
      action: "viewed",
      resource: "Client Agreement - Smith vs Jones",
      resourceType: "document",
      caseNumber: "2024-CV-001",
      ipAddress: "192.168.1.15",
      userAgent: "Chrome 120.0",
      details: "Document accessed from case dashboard"
    },
    {
      id: 2,
      timestamp: "2024-01-20 14:15:10",
      user: "Robert Chen",
      action: "edited",
      resource: "Motion for Summary Judgment",
      resourceType: "document",
      caseNumber: "2024-CV-002",
      ipAddress: "192.168.1.22",
      userAgent: "Firefox 121.0",
      details: "Version 2 created with legal argument revisions"
    },
    {
      id: 3,
      timestamp: "2024-01-20 13:45:33",
      user: "Emily Davis",
      action: "shared",
      resource: "Discovery Request",
      resourceType: "document",
      caseNumber: "2024-CR-002",
      ipAddress: "192.168.1.8",
      userAgent: "Chrome 120.0",
      details: "Shared with external counsel (john.doe@lawfirm.com)"
    },
    {
      id: 4,
      timestamp: "2024-01-20 11:20:15",
      user: "Sarah Johnson",
      action: "created",
      resource: "Johnson Divorce Proceedings",
      resourceType: "case",
      caseNumber: "2024-DV-003",
      ipAddress: "192.168.1.15",
      userAgent: "Chrome 120.0",
      details: "New family law case created"
    },
    {
      id: 5,
      timestamp: "2024-01-20 10:30:45",
      user: "Michael Wilson",
      action: "downloaded",
      resource: "Contract Amendment - Tech Corp",
      resourceType: "document",
      caseNumber: "2024-CV-004",
      ipAddress: "192.168.1.45",
      userAgent: "Safari 17.0",
      details: "Downloaded PDF version for client review"
    },
    {
      id: 6,
      timestamp: "2024-01-20 09:15:22",
      user: "Admin System",
      action: "backup",
      resource: "Daily Backup Process",
      resourceType: "system",
      caseNumber: "N/A",
      ipAddress: "127.0.0.1",
      userAgent: "System Process",
      details: "Automated daily backup completed successfully"
    },
    {
      id: 7,
      timestamp: "2024-01-19 16:45:18",
      user: "Robert Chen",
      action: "deleted",
      resource: "Draft Research Memo",
      resourceType: "document",
      caseNumber: "2024-CV-002",
      ipAddress: "192.168.1.22",
      userAgent: "Firefox 121.0",
      details: "Draft document deleted after content merged into main brief"
    },
    {
      id: 8,
      timestamp: "2024-01-19 15:30:55",
      user: "Emily Davis",
      action: "approved",
      resource: "Settlement Agreement",
      resourceType: "document",
      caseNumber: "2023-PI-045",
      ipAddress: "192.168.1.8",
      userAgent: "Chrome 120.0",
      details: "Document approved for final signature"
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case "viewed": return <Eye className="h-4 w-4" />;
      case "edited": return <Edit className="h-4 w-4" />;
      case "shared": return <Share2 className="h-4 w-4" />;
      case "created": return <FileText className="h-4 w-4" />;
      case "downloaded": return <Download className="h-4 w-4" />;
      case "deleted": return <Trash2 className="h-4 w-4" />;
      case "approved": return <Shield className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "viewed": return "bg-blue-100 text-blue-800";
      case "edited": return "bg-yellow-100 text-yellow-800";
      case "shared": return "bg-purple-100 text-purple-800";
      case "created": return "bg-green-100 text-green-800";
      case "downloaded": return "bg-indigo-100 text-indigo-800";
      case "deleted": return "bg-red-100 text-red-800";
      case "approved": return "bg-emerald-100 text-emerald-800";
      case "backup": return "bg-gray-100 text-gray-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case "document": return "📄";
      case "case": return "📁";
      case "system": return "⚙️";
      default: return "📎";
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === "" || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || log.action === filter;
    
    return matchesSearch && matchesFilter;
  });

  const exportAuditLog = () => {
    console.log("Exporting audit log...");
    // Would implement CSV/PDF export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <Shield className="h-7 w-7 mr-2 text-blue-600" />
            Audit Trail
          </h2>
          <p className="text-slate-600">Complete activity log for compliance and security monitoring</p>
        </div>
        <Button onClick={exportAuditLog} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                placeholder="Search user, document, case..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
                <SelectItem value="edited">Edited</SelectItem>
                <SelectItem value="shared">Shared</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="downloaded">Downloaded</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setFilter("all");
              setDateRange("week");
            }}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Entries */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getResourceTypeIcon(log.resourceType)}</span>
                    <Badge className={`${getActionColor(log.action)} flex items-center space-x-1`}>
                      {getActionIcon(log.action)}
                      <span className="ml-1">{log.action}</span>
                    </Badge>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-slate-900 truncate">{log.resource}</h4>
                      {log.caseNumber !== "N/A" && (
                        <Badge variant="outline" className="text-xs">
                          {log.caseNumber}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {log.user}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {log.timestamp}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-700 mb-2">{log.details}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>IP: {log.ipAddress}</span>
                      <span>Browser: {log.userAgent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <Card className="bg-white shadow-sm border-slate-200">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No audit entries found</h3>
            <p className="text-slate-600">
              {searchTerm || filter !== "all" ? "Try adjusting your search criteria" : "Activity will appear here as users interact with the system"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Compliance Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Compliance & Data Retention</h4>
              <p className="text-sm text-blue-800">
                All audit logs are automatically retained for 7 years to meet legal compliance requirements. 
                Logs are encrypted and backed up daily. For data export or specific compliance reports, 
                contact your system administrator.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrail;
