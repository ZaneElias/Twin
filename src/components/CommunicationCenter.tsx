'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  Mail,
  Send,
  Plus,
  Edit,
  Trash2,
  Users,
  Calendar,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Copy,
  Filter,
  BarChart3,
  Zap,
  FileText,
  Target
} from 'lucide-react';
import { format } from 'date-fns';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'reminder' | 'confirmation' | 'update' | 'custom';
  variables: string[];
  lastUsed?: string;
  usageCount: number;
}

interface EmailCampaign {
  id: string;
  name: string;
  templateId: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  recipientCount: number;
  sentCount: number;
  openRate: number;
  clickRate: number;
  scheduledDate?: string;
  createdDate: string;
  hackathonId?: string;
}

interface CommunicationCenterProps {
  hackathons: any[];
}

// Mock data
const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to {hackathonName}!',
    content: `Hello {name},

Welcome to {hackathonName}! We're excited to have you join us.

Event Details:
- Date: {eventDate}
- Location: {eventLocation}
- Registration Link: {eventURL}

Best regards,
The {hackathonName} Team`,
    type: 'welcome',
    variables: ['name', 'hackathonName', 'eventDate', 'eventLocation', 'eventURL'],
    lastUsed: '2024-03-10',
    usageCount: 45
  },
  {
    id: '2',
    name: '7-Day Reminder',
    subject: 'Only 7 days left until {hackathonName}!',
    content: `Hi {name},

Just a friendly reminder that {hackathonName} is coming up in one week!

Don't forget to:
- Prepare your development environment
- Review the challenge details
- Form your team (if you haven't already)

Looking forward to seeing you there!

Best,
The Organizing Team`,
    type: 'reminder',
    variables: ['name', 'hackathonName'],
    lastUsed: '2024-03-08',
    usageCount: 32
  },
  {
    id: '3',
    name: 'Registration Confirmation',
    subject: 'Your registration for {hackathonName} is confirmed',
    content: `Dear {name},

Your registration for {hackathonName} has been confirmed!

Registration Details:
- Event: {hackathonName}
- Date: {eventDate}
- Status: Confirmed
- Participant ID: {participantId}

We'll send you more details soon.

Thank you!`,
    type: 'confirmation',
    variables: ['name', 'hackathonName', 'eventDate', 'participantId'],
    lastUsed: '2024-03-12',
    usageCount: 89
  }
];

const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'AI Challenge Welcome Series',
    templateId: '1',
    status: 'sent',
    recipientCount: 156,
    sentCount: 156,
    openRate: 87.5,
    clickRate: 23.4,
    createdDate: '2024-03-01',
    hackathonId: '1'
  },
  {
    id: '2',
    name: 'Sustainability Hack Reminders',
    templateId: '2',
    status: 'scheduled',
    recipientCount: 89,
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    scheduledDate: '2024-03-15',
    createdDate: '2024-03-10',
    hackathonId: '2'
  },
  {
    id: '3',
    name: 'Registration Confirmations',
    templateId: '3',
    status: 'sending',
    recipientCount: 234,
    sentCount: 198,
    openRate: 92.1,
    clickRate: 45.7,
    createdDate: '2024-02-28',
    hackathonId: '3'
  }
];

export default function CommunicationCenter({ hackathons }: CommunicationCenterProps) {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isCampaignDialogOpen, setIsCampaignDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  // Calculate stats
  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'sending' || c.status === 'scheduled').length,
    totalRecipients: campaigns.reduce((sum, c) => sum + c.recipientCount, 0),
    avgOpenRate: campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length || 0,
    totalTemplates: templates.length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500/20 text-green-300';
      case 'sending': return 'bg-blue-500/20 text-blue-300';
      case 'scheduled': return 'bg-yellow-500/20 text-yellow-300';
      case 'draft': return 'bg-gray-500/20 text-gray-300';
      case 'paused': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4" />;
      case 'sending': return <Zap className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'paused': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Campaigns</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalCampaigns}</p>
              </div>
              <Mail className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Campaigns</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.activeCampaigns}</p>
              </div>
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Recipients</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalRecipients}</p>
              </div>
              <Users className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Avg Open Rate</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.avgOpenRate.toFixed(1)}%</p>
              </div>
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Templates</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalTemplates}</p>
              </div>
              <FileText className="h-6 w-6 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Communication Center</CardTitle>
          <CardDescription className="text-slate-400">
            Manage email campaigns, templates, and automated communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700 border-slate-600">
              <TabsTrigger value="campaigns" className="text-slate-300">
                <Mail className="h-4 w-4 mr-2" />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-slate-300">
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="automation" className="text-slate-300">
                <Zap className="h-4 w-4 mr-2" />
                Automation
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-slate-300">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Email Campaigns</h3>
                <Dialog open={isCampaignDialogOpen} onOpenChange={setIsCampaignDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      New Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Create Email Campaign</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Set up a new email campaign for your participants
                      </DialogDescription>
                    </DialogHeader>
                    <CampaignForm templates={templates} hackathons={hackathons} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} templates={templates} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Email Templates</h3>
                <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      New Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        {selectedTemplate ? 'Edit Template' : 'Create Email Template'}
                      </DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Create reusable email templates with dynamic variables
                      </DialogDescription>
                    </DialogHeader>
                    <TemplateForm template={selectedTemplate} onClose={() => {
                      setIsTemplateDialogOpen(false);
                      setSelectedTemplate(null);
                    }} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onEdit={(template) => {
                      setSelectedTemplate(template);
                      setIsTemplateDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-4">
              <AutomationRules hackathons={hackathons} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <EmailAnalytics campaigns={campaigns} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function CampaignCard({ campaign, templates }: {
  campaign: EmailCampaign;
  templates: EmailTemplate[];
}) {
  const template = templates.find(t => t.id === campaign.templateId);
  const progress = campaign.recipientCount > 0 ? (campaign.sentCount / campaign.recipientCount) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500/20 text-green-300';
      case 'sending': return 'bg-blue-500/20 text-blue-300';
      case 'scheduled': return 'bg-yellow-500/20 text-yellow-300';
      case 'draft': return 'bg-gray-500/20 text-gray-300';
      case 'paused': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4" />;
      case 'sending': return <Zap className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'paused': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card className="bg-slate-700 border-slate-600">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-lg font-semibold text-white">{campaign.name}</h4>
              <div className="flex items-center space-x-1">
                {getStatusIcon(campaign.status)}
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
              </div>
            </div>

            <p className="text-slate-400 text-sm mb-3">
              Template: {template?.name || 'Unknown'}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-slate-400 text-xs">Recipients</p>
                <p className="text-white font-semibold">{campaign.recipientCount}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Open Rate</p>
                <p className="text-white font-semibold">{campaign.openRate}%</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Click Rate</p>
                <p className="text-white font-semibold">{campaign.clickRate}%</p>
              </div>
            </div>

            {campaign.status === 'sending' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white">{campaign.sentCount} / {campaign.recipientCount}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {campaign.scheduledDate && (
              <p className="text-slate-400 text-sm mt-2">
                Scheduled for: {format(new Date(campaign.scheduledDate), 'PPP p')}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TemplateCard({ template, onEdit }: {
  template: EmailTemplate;
  onEdit: (template: EmailTemplate) => void;
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome': return 'bg-green-500/20 text-green-300';
      case 'reminder': return 'bg-yellow-500/20 text-yellow-300';
      case 'confirmation': return 'bg-blue-500/20 text-blue-300';
      case 'update': return 'bg-purple-500/20 text-purple-300';
      case 'custom': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Card className="bg-slate-700 border-slate-600">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">{template.name}</h4>
            <Badge className={getTypeColor(template.type)}>{template.type}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-slate-300 border-slate-600"
              onClick={() => onEdit(template)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-slate-400 text-xs mb-1">Subject</p>
            <p className="text-white text-sm">{template.subject}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs mb-1">Variables ({template.variables.length})</p>
            <div className="flex flex-wrap gap-1">
              {template.variables.slice(0, 4).map((variable) => (
                <Badge key={variable} variant="secondary" className="bg-slate-600 text-slate-300 text-xs">
                  {variable}
                </Badge>
              ))}
              {template.variables.length > 4 && (
                <Badge variant="secondary" className="bg-slate-600 text-slate-300 text-xs">
                  +{template.variables.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex justify-between text-xs text-slate-400">
            <span>Used {template.usageCount} times</span>
            {template.lastUsed && (
              <span>Last used: {format(new Date(template.lastUsed), 'MMM d')}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignForm({ templates, hackathons }: {
  templates: EmailTemplate[];
  hackathons: any[];
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Campaign Name</Label>
          <Input
            placeholder="e.g. Welcome Series"
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Hackathon</Label>
          <Select>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select hackathon" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {hackathons.map((hackathon) => (
                <SelectItem key={hackathon.id} value={hackathon.id}>
                  {hackathon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-300">Email Template</Label>
        <Select>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Choose template" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name} ({template.type})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-300">Recipients</Label>
        <Select>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Select recipients" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Participants</SelectItem>
            <SelectItem value="confirmed">Confirmed Only</SelectItem>
            <SelectItem value="applied">Applied Only</SelectItem>
            <SelectItem value="custom">Custom Selection</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button variant="outline" className="text-slate-300 border-slate-600">
          Save Draft
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Send className="h-4 w-4 mr-2" />
          Send Now
        </Button>
      </div>
    </div>
  );
}

function TemplateForm({ template, onClose }: {
  template: EmailTemplate | null;
  onClose: () => void;
}) {
  const [variables, setVariables] = useState<string[]>(template?.variables || []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Template Name</Label>
          <Input
            defaultValue={template?.name}
            placeholder="e.g. Welcome Email"
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Type</Label>
          <Select defaultValue={template?.type}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="welcome">Welcome</SelectItem>
              <SelectItem value="reminder">Reminder</SelectItem>
              <SelectItem value="confirmation">Confirmation</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-300">Subject Line</Label>
        <Input
          defaultValue={template?.subject}
          placeholder="e.g. Welcome to {hackathonName}!"
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-slate-300">Email Content</Label>
        <Textarea
          defaultValue={template?.content}
          placeholder="Enter your email content here. Use {variableName} for dynamic content."
          className="bg-slate-700 border-slate-600 text-white min-h-[200px]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-slate-300">Available Variables</Label>
        <div className="flex flex-wrap gap-2">
          {['name', 'hackathonName', 'eventDate', 'eventURL', 'participantId'].map((variable) => (
            <Badge key={variable} variant="secondary" className="bg-slate-600 text-slate-300">
              {variable}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button variant="outline" className="text-slate-300 border-slate-600" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Save Template
        </Button>
      </div>
    </div>
  );
}

function AutomationRules({ hackathons }: { hackathons: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Automated Email Rules</h3>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      <div className="space-y-4">
        <AutomationRuleCard
          title="Welcome Email"
          description="Send welcome email immediately after registration"
          trigger="Registration Confirmed"
          template="Welcome Email"
          active={true}
        />
        <AutomationRuleCard
          title="7-Day Reminder"
          description="Send reminder 7 days before event starts"
          trigger="7 days before event"
          template="7-Day Reminder"
          active={true}
        />
        <AutomationRuleCard
          title="1-Day Reminder"
          description="Send final reminder 1 day before event"
          trigger="1 day before event"
          template="Final Reminder"
          active={false}
        />
      </div>
    </div>
  );
}

function AutomationRuleCard({ title, description, trigger, template, active }: {
  title: string;
  description: string;
  trigger: string;
  template: string;
  active: boolean;
}) {
  return (
    <Card className="bg-slate-700 border-slate-600">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-lg font-semibold text-white">{title}</h4>
              <Badge className={active ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}>
                {active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-slate-400 text-sm mb-3">{description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Trigger: </span>
                <span className="text-white">{trigger}</span>
              </div>
              <div>
                <span className="text-slate-400">Template: </span>
                <span className="text-white">{template}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmailAnalytics({ campaigns }: { campaigns: EmailCampaign[] }) {
  const sentCampaigns = campaigns.filter(c => c.status === 'sent');
  const totalSent = sentCampaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const avgOpenRate = sentCampaigns.reduce((sum, c) => sum + c.openRate, 0) / sentCampaigns.length || 0;
  const avgClickRate = sentCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / sentCampaigns.length || 0;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Email Performance Analytics</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Emails Sent</p>
                <p className="text-2xl font-bold text-white mt-1">{totalSent}</p>
              </div>
              <Send className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Average Open Rate</p>
                <p className="text-2xl font-bold text-white mt-1">{avgOpenRate.toFixed(1)}%</p>
              </div>
              <Eye className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Average Click Rate</p>
                <p className="text-2xl font-bold text-white mt-1">{avgClickRate.toFixed(1)}%</p>
              </div>
              <Target className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-slate-600 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">{campaign.name}</h4>
                  <p className="text-sm text-slate-400">{campaign.sentCount} recipients</p>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="text-white font-semibold">{campaign.openRate}%</p>
                    <p className="text-slate-400">Open Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">{campaign.clickRate}%</p>
                    <p className="text-slate-400">Click Rate</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
