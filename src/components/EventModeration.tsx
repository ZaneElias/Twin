'use client'

import { useState, useEffect } from 'react'
import {
  Video, MessageSquare, Users, Calendar, Clock, AlertTriangle,
  Mic, MicOff, Camera, CameraOff, Settings, Send, Hash,
  Shield, Flag, Zap, CheckCircle, XCircle, Play, Pause,
  Volume2, VolumeX, Monitor, Phone, UserCheck, Bell
} from 'lucide-react'

interface ChatMessage {
  id: string
  platform: 'discord' | 'slack' | 'zoom' | 'internal'
  channel: string
  user: string
  message: string
  timestamp: string
  flagged: boolean
  type: 'message' | 'question' | 'support' | 'announcement'
}

interface EventSession {
  id: string
  name: string
  status: 'upcoming' | 'live' | 'ended'
  startTime: string
  duration: number
  participants: number
  platform: 'zoom' | 'teams' | 'discord' | 'youtube'
  moderator: string
}

interface ModerationAction {
  type: 'mute' | 'warn' | 'kick' | 'ban' | 'timeout'
  user: string
  reason: string
  timestamp: string
}

export default function EventModeration() {
  const [activeSession, setActiveSession] = useState<EventSession | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedChannel, setSelectedChannel] = useState('general')
  const [moderationActions, setModerationActions] = useState<ModerationAction[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [cameraOn, setCameraOn] = useState(true)
  const [isRecording, setIsRecording] = useState(false)

  const mockSessions: EventSession[] = [
    {
      id: '1',
      name: 'Opening Ceremony',
      status: 'live',
      startTime: '2024-02-10T09:00:00Z',
      duration: 60,
      participants: 847,
      platform: 'zoom',
      moderator: 'Sarah Chen'
    },
    {
      id: '2',
      name: 'AI Workshop - Session 1',
      status: 'upcoming',
      startTime: '2024-02-10T11:00:00Z',
      duration: 120,
      participants: 234,
      platform: 'discord',
      moderator: 'Mike Rodriguez'
    },
    {
      id: '3',
      name: 'Team Formation',
      status: 'upcoming',
      startTime: '2024-02-10T14:00:00Z',
      duration: 90,
      participants: 156,
      platform: 'teams',
      moderator: 'Emma Wilson'
    }
  ]

  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      platform: 'discord',
      channel: 'general',
      user: 'Alex_Dev',
      message: 'When does the coding phase start?',
      timestamp: '10:32 AM',
      flagged: false,
      type: 'question'
    },
    {
      id: '2',
      platform: 'slack',
      channel: 'help-desk',
      user: 'maria.garcia',
      message: 'Having trouble accessing the GitHub repository',
      timestamp: '10:35 AM',
      flagged: false,
      type: 'support'
    },
    {
      id: '3',
      platform: 'discord',
      channel: 'general',
      user: 'spam_user_123',
      message: 'Check out this amazing crypto opportunity!!!',
      timestamp: '10:38 AM',
      flagged: true,
      type: 'message'
    },
    {
      id: '4',
      platform: 'internal',
      channel: 'announcements',
      user: 'HackNation_Bot',
      message: '🚀 Reminder: Technical mentorship sessions available in #tech-help',
      timestamp: '10:40 AM',
      flagged: false,
      type: 'announcement'
    }
  ]

  useEffect(() => {
    setChatMessages(mockMessages)
    setActiveSession(mockSessions[0])
  }, [])

  const channels = [
    { id: 'general', name: 'General', platform: 'discord', unread: 12 },
    { id: 'tech-help', name: 'Tech Help', platform: 'discord', unread: 8 },
    { id: 'announcements', name: 'Announcements', platform: 'slack', unread: 0 },
    { id: 'team-formation', name: 'Team Formation', platform: 'discord', unread: 23 },
    { id: 'mentorship', name: 'Mentorship', platform: 'slack', unread: 5 },
    { id: 'random', name: 'Random', platform: 'discord', unread: 2 }
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      platform: 'internal',
      channel: selectedChannel,
      user: 'Moderator',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      flagged: false,
      type: 'message'
    }

    setChatMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const handleModerationAction = (type: ModerationAction['type'], user: string, reason: string) => {
    const action: ModerationAction = {
      type,
      user,
      reason,
      timestamp: new Date().toISOString()
    }
    setModerationActions(prev => [...prev, action])

    // Remove messages from flagged users if banned/kicked
    if (type === 'ban' || type === 'kick') {
      setChatMessages(prev => prev.filter(msg => msg.user !== user))
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'discord': return '🎮'
      case 'slack': return '💬'
      case 'zoom': return '📹'
      case 'teams': return '👥'
      case 'internal': return '🏠'
      default: return '💻'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-900 text-red-400 border-red-700'
      case 'upcoming': return 'bg-blue-900 text-blue-400 border-blue-700'
      case 'ended': return 'bg-gray-900 text-gray-400 border-gray-700'
      default: return 'bg-gray-900 text-gray-400 border-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Live Session Control */}
      {activeSession && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded border text-sm ${getStatusColor(activeSession.status)}`}>
                  {activeSession.status === 'live' && <div className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />}
                  {activeSession.status.toUpperCase()}
                </div>
                <h3 className="text-xl font-semibold text-white">{activeSession.name}</h3>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{activeSession.participants} participants</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} transition-colors`}
              >
                {isMuted ? <MicOff className="h-4 w-4 text-white" /> : <Mic className="h-4 w-4 text-white" />}
              </button>

              <button
                onClick={() => setCameraOn(!cameraOn)}
                className={`p-2 rounded ${!cameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} transition-colors`}
              >
                {cameraOn ? <Camera className="h-4 w-4 text-white" /> : <CameraOff className="h-4 w-4 text-white" />}
              </button>

              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} transition-colors`}
              >
                {isRecording ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
              </button>

              <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors">
                <Settings className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-gray-400 text-xs mb-1">Platform</div>
              <div className="flex items-center text-white">
                <span className="mr-2">{getPlatformIcon(activeSession.platform)}</span>
                {activeSession.platform}
              </div>
            </div>

            <div className="bg-gray-700 p-3 rounded">
              <div className="text-gray-400 text-xs mb-1">Duration</div>
              <div className="text-white">{activeSession.duration} minutes</div>
            </div>

            <div className="bg-gray-700 p-3 rounded">
              <div className="text-gray-400 text-xs mb-1">Moderator</div>
              <div className="text-white">{activeSession.moderator}</div>
            </div>

            <div className="bg-gray-700 p-3 rounded">
              <div className="text-gray-400 text-xs mb-1">Started</div>
              <div className="text-white">{new Date(activeSession.startTime).toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Moderation */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Multi-Platform Chat
            </h3>
            <div className="flex items-center space-x-2">
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm"
              >
                {channels.map(channel => (
                  <option key={channel.id} value={channel.id}>
                    {getPlatformIcon(channel.platform)} {channel.name}
                    {channel.unread > 0 && ` (${channel.unread})`}
                  </option>
                ))}
              </select>
              <button className="text-blue-400 hover:text-blue-300">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Channel List */}
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded whitespace-nowrap ${
                  selectedChannel === channel.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>{getPlatformIcon(channel.platform)}</span>
                <span>{channel.name}</span>
                {channel.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-1 rounded">{channel.unread}</span>
                )}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto bg-gray-700 rounded p-3 mb-4 space-y-2">
            {chatMessages
              .filter(msg => msg.channel === selectedChannel)
              .map(message => (
                <div key={message.id} className={`p-2 rounded ${message.flagged ? 'bg-red-900/30 border border-red-600' : 'bg-gray-600'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">{getPlatformIcon(message.platform)}</span>
                      <span className="text-white font-medium">{message.user}</span>
                      <span className="text-gray-400 text-xs">{message.timestamp}</span>
                      {message.type === 'question' && <span className="bg-blue-600 text-white text-xs px-1 rounded">Q</span>}
                      {message.type === 'support' && <span className="bg-orange-600 text-white text-xs px-1 rounded">Help</span>}
                      {message.flagged && <Flag className="h-3 w-3 text-red-400" />}
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleModerationAction('warn', message.user, 'Inappropriate message')}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <AlertTriangle className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleModerationAction('mute', message.user, 'Temporary mute')}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Shield className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">{message.message}</div>
                </div>
              ))}
          </div>

          {/* Send Message */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Send announcement or response..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Session Management & Moderation Actions */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Sessions Today
            </h3>
            <div className="space-y-3">
              {mockSessions.map(session => (
                <div
                  key={session.id}
                  className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                  onClick={() => setActiveSession(session)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{session.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(session.startTime).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>{session.participants} participants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                Send Announcement
              </button>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition-colors">
                Emergency Broadcast
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
                Breakout Rooms
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors">
                Record Session
              </button>
            </div>
          </div>

          {/* Recent Moderation Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Recent Actions
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {moderationActions.slice(-5).map((action, index) => (
                <div key={index} className="bg-gray-700 p-2 rounded">
                  <div className="text-white text-sm">
                    <span className="capitalize">{action.type}</span> {action.user}
                  </div>
                  <div className="text-gray-400 text-xs">{action.reason}</div>
                </div>
              ))}
              {moderationActions.length === 0 && (
                <div className="text-gray-500 text-sm text-center py-4">
                  No moderation actions yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
