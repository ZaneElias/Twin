'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Calendar,
  Settings,
  Mail,
  BarChart3,
  Plus,
  UserPlus,
  Trophy,
  Clock,
  MapPin
} from 'lucide-react';
import HackathonCreationWizard from '@/components/HackathonCreationWizard';
import ParticipantManagement from '@/components/ParticipantManagement';
import CommunicationCenter from '@/components/CommunicationCenter';

export default function HackathonPlatform() {
  const [activeInterface, setActiveInterface] = useState<'host' | 'participant'>('host');
  const [isCreationWizardOpen, setIsCreationWizardOpen] = useState(false);
  const [hackathons, setHackathons] = useState<any[]>([
    {
      id: '1',
      name: 'AI Innovation Challenge',
      status: 'Registration Open',
      participants: 156,
      date: 'Mar 15-17, 2024',
      registrationUrl: 'https://hackflow.io/ai-innovation-abc123'
    },
    {
      id: '2',
      name: 'Sustainability Hack',
      status: 'In Progress',
      participants: 89,
      date: 'Mar 10-12, 2024',
      registrationUrl: 'https://hackflow.io/sustainability-def456'
    },
    {
      id: '3',
      name: 'FinTech Revolution',
      status: 'Completed',
      participants: 234,
      date: 'Feb 28 - Mar 2, 2024',
      registrationUrl: 'https://hackflow.io/fintech-ghi789'
    }
  ]);

  const handleCreateHackathon = (data: any) => {
    const newHackathon = {
      id: Date.now().toString(),
      name: data.name,
      status: 'Draft',
      participants: 0,
      date: `${new Date(data.eventStartDate).toLocaleDateString()} - ${new Date(data.eventEndDate).toLocaleDateString()}`,
      registrationUrl: `https://hackflow.io/${data.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.random().toString(36).substr(2, 8)}`,
      ...data
    };

    setHackathons([newHackathon, ...hackathons]);
    setIsCreationWizardOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Trophy className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">HackFlow</h1>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                v2.0
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant={activeInterface === 'host' ? 'default' : 'outline'}
                onClick={() => setActiveInterface('host')}
                className="text-sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Host Dashboard
              </Button>
              <Button
                variant={activeInterface === 'participant' ? 'default' : 'outline'}
                onClick={() => setActiveInterface('participant')}
                className="text-sm"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Participant Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeInterface === 'host' ? (
          <HostDashboard
            hackathons={hackathons}
            onCreateHackathon={() => setIsCreationWizardOpen(true)}
          />
        ) : (
          <ParticipantPortal hackathons={hackathons} />
        )}
      </main>

      {/* Hackathon Creation Wizard */}
      <HackathonCreationWizard
        isOpen={isCreationWizardOpen}
        onClose={() => setIsCreationWizardOpen(false)}
        onSubmit={handleCreateHackathon}
      />
    </div>
  );
}

function HostDashboard({ hackathons, onCreateHackathon }: {
  hackathons: any[];
  onCreateHackathon: () => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalHackathons: hackathons.length,
    totalParticipants: hackathons.reduce((sum, h) => sum + h.participants, 0),
    activeHackathons: hackathons.filter(h => h.status === 'Registration Open' || h.status === 'In Progress').length,
    completedHackathons: hackathons.filter(h => h.status === 'Completed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Host Dashboard</h2>
          <p className="text-slate-400 mt-2">Manage your hackathons and participants</p>
        </div>
        <Button onClick={onCreateHackathon} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Hackathon
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
          <TabsTrigger value="overview" className="text-slate-300">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="hackathons" className="text-slate-300">
            <Calendar className="h-4 w-4 mr-2" />
            Hackathons
          </TabsTrigger>
          <TabsTrigger value="participants" className="text-slate-300">
            <Users className="h-4 w-4 mr-2" />
            Participants
          </TabsTrigger>
          <TabsTrigger value="communications" className="text-slate-300">
            <Mail className="h-4 w-4 mr-2" />
            Communications
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-slate-300">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Hackathons"
              value={stats.totalHackathons.toString()}
              description="All time"
              icon={<Calendar className="h-6 w-6 text-purple-400" />}
              trend={`${stats.activeHackathons} active`}
            />
            <MetricCard
              title="Total Participants"
              value={stats.totalParticipants.toString()}
              description="Across all events"
              icon={<Users className="h-6 w-6 text-blue-400" />}
              trend="+18% growth"
            />
            <MetricCard
              title="Email Campaigns"
              value="34"
              description="Sent this month"
              icon={<Mail className="h-6 w-6 text-green-400" />}
              trend="94% open rate"
            />
            <MetricCard
              title="Success Rate"
              value="89%"
              description="Event completion"
              icon={<Trophy className="h-6 w-6 text-yellow-400" />}
              trend="+5% improvement"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Hackathons</CardTitle>
                <CardDescription className="text-slate-400">Latest events and their status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hackathons.slice(0, 3).map((hackathon) => (
                  <RecentHackathonItem
                    key={hackathon.id}
                    name={hackathon.name}
                    status={hackathon.status}
                    participants={hackathon.participants}
                    date={hackathon.date}
                  />
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-slate-400">Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-slate-300 border-slate-600"
                  onClick={onCreateHackathon}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Hackathon
                </Button>
                <Button variant="outline" className="w-full justify-start text-slate-300 border-slate-600">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Bulk Email
                </Button>
                <Button variant="outline" className="w-full justify-start text-slate-300 border-slate-600">
                  <Users className="h-4 w-4 mr-2" />
                  Export Participants
                </Button>
                <Button variant="outline" className="w-full justify-start text-slate-300 border-slate-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hackathons">
          <HackathonManagement hackathons={hackathons} onCreateNew={onCreateHackathon} />
        </TabsContent>

        <TabsContent value="participants">
          <ParticipantManagement hackathons={hackathons} />
        </TabsContent>

        <TabsContent value="communications">
          <CommunicationCenter hackathons={hackathons} />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-12 text-slate-400">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-slate-600" />
            <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
            <p className="mb-4">Track performance and engagement metrics</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HackathonManagement({ hackathons, onCreateNew }: {
  hackathons: any[];
  onCreateNew: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Your Hackathons</h3>
        <Button onClick={onCreateNew} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      {hackathons.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-600" />
          <h3 className="text-lg font-semibold mb-2">No Hackathons Yet</h3>
          <p className="mb-4">Create your first hackathon to get started</p>
          <Button onClick={onCreateNew} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Hackathon
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      )}
    </div>
  );
}

function HackathonCard({ hackathon }: { hackathon: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-500/20 text-gray-300';
      case 'Registration Open': return 'bg-green-500/20 text-green-300';
      case 'In Progress': return 'bg-blue-500/20 text-blue-300';
      case 'Completed': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">{hackathon.name}</CardTitle>
          <Badge className={getStatusColor(hackathon.status)}>{hackathon.status}</Badge>
        </div>
        <CardDescription className="text-slate-400">{hackathon.date}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">{hackathon.participants} participants</span>
          {hackathon.registrationUrl && (
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              View Details
            </Button>
          )}
        </div>

        {hackathon.registrationUrl && (
          <div className="p-2 bg-slate-700 rounded text-xs">
            <span className="text-slate-400">Registration URL:</span>
            <br />
            <code className="text-green-400">{hackathon.registrationUrl}</code>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ParticipantPortal({ hackathons }: { hackathons: any[] }) {
  const publicHackathons = hackathons.filter(h => h.status !== 'Draft');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Participant Portal</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Discover amazing hackathons, register for events, and track your participation journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {publicHackathons.map((hackathon) => (
          <ParticipantHackathonCard
            key={hackathon.id}
            title={hackathon.name}
            description={hackathon.description || "Join this exciting hackathon challenge"}
            status={hackathon.status}
            date={hackathon.date}
            location="Virtual"
            participants={hackathon.participants}
            prize="$50,000"
          />
        ))}

        {publicHackathons.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-400">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-slate-600" />
            <h3 className="text-lg font-semibold mb-2">No Active Hackathons</h3>
            <p>Check back soon for new hackathon opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, description, icon, trend }: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            <p className="text-slate-400 text-xs mt-1">{description}</p>
          </div>
          {icon}
        </div>
        <div className="mt-4">
          <p className="text-green-400 text-xs">{trend}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentHackathonItem({ name, status, participants, date }: {
  name: string;
  status: string;
  participants: number;
  date: string;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Registration Open': return 'bg-green-500/20 text-green-300';
      case 'In Progress': return 'bg-blue-500/20 text-blue-300';
      case 'Completed': return 'bg-gray-500/20 text-gray-300';
      case 'Draft': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
      <div>
        <h4 className="font-medium text-white">{name}</h4>
        <p className="text-sm text-slate-400">{date} • {participants} participants</p>
      </div>
      <Badge className={getStatusColor(status)}>{status}</Badge>
    </div>
  );
}

function ParticipantHackathonCard({ title, description, status, date, location, participants, prize }: {
  title: string;
  description: string;
  status: string;
  date: string;
  location: string;
  participants: number;
  prize: string;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Registration Open': return 'bg-green-500/20 text-green-300';
      case 'Starting Soon': return 'bg-blue-500/20 text-blue-300';
      case 'Registration Closes Soon': return 'bg-yellow-500/20 text-yellow-300';
      case 'In Progress': return 'bg-blue-500/20 text-blue-300';
      case 'Completed': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">{title}</CardTitle>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-slate-400 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          {date}
        </div>
        <div className="flex items-center text-slate-400 text-sm">
          <MapPin className="h-4 w-4 mr-2" />
          {location}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">{participants} participants</span>
          <span className="text-purple-400 font-semibold">{prize} prize</span>
        </div>
        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          {status === 'Registration Open' ? 'Register Now' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
}
