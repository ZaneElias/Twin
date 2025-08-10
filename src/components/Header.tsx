'use client'

import { Search, Users, Zap, Bot } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gray-900 sticky top-0 z-50 shadow-lg border-b border-gray-700">
      {/* Top utility bar */}
      <div className="border-b border-gray-700 px-6 py-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            {/* Brand indicators */}
            <div className="flex items-center space-x-4">
              <div className="h-4 w-6 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold rounded">AI</div>
              <div className="h-4 w-8 border border-blue-400 flex items-center justify-center text-xs font-bold text-blue-400 rounded">HN</div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Demo</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition-colors">Join Community</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition-colors">Get Started</a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Hackathon Twin logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Hackathon Twin</div>
                  <div className="text-xs text-gray-400">AI Event Orchestration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main navigation menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#agents" className="text-white font-medium hover:text-blue-400 transition-colors">Agents</a>
            <a href="#workflows" className="text-white font-medium hover:text-blue-400 transition-colors">Workflows</a>
            <a href="/mailing" className="text-white font-medium hover:text-blue-400 transition-colors">Mailing</a>
            <a href="/organize" className="text-white font-medium hover:text-blue-400 transition-colors">Organize</a>
            <a href="#community" className="text-white font-medium hover:text-blue-400 transition-colors">Community</a>
            <a href="#tech" className="text-white font-medium hover:text-blue-400 transition-colors">Technology</a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Search className="h-6 w-6 text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Users className="h-6 w-6 text-gray-300" />
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Start Building</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
