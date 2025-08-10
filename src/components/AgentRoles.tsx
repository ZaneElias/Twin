'use client'

import { MessageSquare, Users, Megaphone, TrendingUp } from 'lucide-react'

export default function AgentRoles() {
  const agents = [
    {
      name: "Outreach Twin",
      role: "Global Recruitment & Alumni Engagement",
      description: "Identifies and recruits participants across 65+ countries, taps alumni networks, and promotes the mission to encourage returning participants.",
      icon: Megaphone,
      gradient: "from-blue-500 to-cyan-500",
      features: ["Multi-country outreach", "Alumni network activation", "LinkedIn & email automation", "Referral loop management"]
    },
    {
      name: "Jury & Speaker Twin",
      role: "Expert Network Orchestration",
      description: "Sources, vets, and onboards high-profile speakers and jury members. Manages communications and voting platforms seamlessly.",
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
      features: ["Speaker identification", "Jury management", "Voting coordination", "Expert communications"]
    },
    {
      name: "Agenda Twin",
      role: "Content & Challenge Creation",
      description: "Creates hackathon agendas, slide decks, AI challenges, and social media content that engages both participants and the wider AI community.",
      icon: MessageSquare,
      gradient: "from-green-500 to-emerald-500",
      features: ["Challenge design", "Agenda creation", "Content generation", "Social media automation"]
    },
    {
      name: "Community Growth Twin",
      role: "Member Acquisition & Retention",
      description: "Converts participants into long-term community members through follow-up touchpoints, referral programs, and engagement loops.",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      features: ["Member onboarding", "Retention automation", "Growth analytics", "Engagement optimization"]
    }
  ]

  return (
    <section id="agents" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Your AI Agent Team
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Four specialized digital twins that replicate how you plan, communicate, and make decisions—running your entire hackathon while growing your community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${agent.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <agent.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2">{agent.name}</h3>
                <p className="text-blue-400 font-medium mb-4">{agent.role}</p>
                <p className="text-gray-300 mb-6 leading-relaxed">{agent.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  {agent.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                      <div className={`w-2 h-2 bg-gradient-to-r ${agent.gradient} rounded-full mr-3`} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className={`mt-6 bg-gradient-to-r ${agent.gradient} text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Deploy Your Agent Team?</h3>
            <p className="text-gray-300 mb-6">See how these AI agents work together to orchestrate your next global hackathon.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors">
                Schedule Demo
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                View Architecture
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
