'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Users, TrendingUp, Globe, Target, Heart, Zap } from 'lucide-react'

const growthStrategies = [
  {
    title: "Referral Amplification",
    description: "Each participant brings 2-3 peers through automated referral loops",
    icon: Users,
    impact: "3x Growth Rate",
    details: "Automated invite systems with personalized referral codes and incentives",
    bgGradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Alumni Network Activation",
    description: "Previous participants become community ambassadors and local hub leaders",
    icon: Heart,
    impact: "85% Retention",
    details: "Structured ambassador programs with recognition and leadership opportunities",
    bgGradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Multi-Touch Engagement",
    description: "Continuous value delivery through challenges, meetups, and learning sessions",
    icon: Zap,
    impact: "Weekly Touchpoints",
    details: "Automated content delivery and community programming year-round",
    bgGradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Global Hub Expansion",
    description: "Local community hubs in major cities worldwide for in-person connections",
    icon: Globe,
    impact: "50+ Cities",
    details: "Volunteer coordinator network with local event hosting capabilities",
    bgGradient: "from-orange-500 to-red-500"
  },
  {
    title: "Venture Launchpad",
    description: "Turn hackathon projects into real ventures with continued community support",
    icon: Target,
    impact: "100+ Ventures",
    details: "Incubation programs and investor connections for promising projects",
    bgGradient: "from-indigo-500 to-purple-500"
  }
]

const milestones = [
  { members: "5,000", description: "Foundation Phase", color: "text-blue-400" },
  { members: "25,000", description: "Acceleration Phase", color: "text-purple-400" },
  { members: "50,000", description: "Scale Phase", color: "text-green-400" },
  { members: "100,000+", description: "Global Impact", color: "text-orange-400" }
]

export default function CommunityGrowth() {
  const [currentStrategy, setCurrentStrategy] = useState(0)

  const nextStrategy = () => {
    setCurrentStrategy((prev) => (prev + 1) % growthStrategies.length)
  }

  const prevStrategy = () => {
    setCurrentStrategy((prev) => (prev - 1 + growthStrategies.length) % growthStrategies.length)
  }

  return (
    <section id="community" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Path to 100,000+ Members
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every hackathon becomes a powerful community growth engine, turning participants into long-term members and advocates.
          </p>
        </div>

        {/* Growth Milestones */}
        <div className="mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Growth Milestones</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold ${milestone.color} mb-2`}>
                    {milestone.members}
                  </div>
                  <div className="text-sm text-gray-400">
                    {milestone.description}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 w-8 h-0.5 bg-gray-600 transform translate-x-full -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Growth Strategies Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-white">Growth Strategies</h3>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevStrategy}
                className="p-3 bg-gray-800 rounded-full shadow-md hover:bg-gray-700 transition-colors border border-gray-600"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextStrategy}
                className="p-3 bg-gray-800 rounded-full shadow-md hover:bg-gray-700 transition-colors border border-gray-600"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {growthStrategies.map((strategy, index) => (
              <div
                key={index}
                className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                  index === currentStrategy ? 'border-blue-500 transform scale-105' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${strategy.bgGradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                <div className="relative z-10">
                  {/* Icon and Impact */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${strategy.bgGradient} rounded-xl flex items-center justify-center`}>
                      <strategy.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 bg-gradient-to-r ${strategy.bgGradient} text-white rounded-full`}>
                      {strategy.impact}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-white mb-2">{strategy.title}</h4>
                  <p className="text-gray-300 text-sm mb-4">{strategy.description}</p>
                  <p className="text-gray-400 text-xs">{strategy.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">340%</div>
                <div className="text-sm text-gray-300">Growth Rate</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Average community growth per hackathon cycle</p>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">85%</div>
                <div className="text-sm text-gray-300">Retention Rate</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Participants who become active community members</p>
          </div>

          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
            <div className="flex items-center mb-4">
              <Globe className="h-8 w-8 text-orange-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">65+</div>
                <div className="text-sm text-gray-300">Countries</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Global reach with local community hubs</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Join the Movement</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Be part of the community that's reshaping how global hackathons are run and how AI innovation happens worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors">
                Join Hack-Nation
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                View Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
