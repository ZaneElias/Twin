'use client'

import { Globe, Users, Calendar, MessageCircle, DollarSign, TrendingUp } from 'lucide-react'

export default function WorkflowGrid() {
  const workflows = [
    {
      title: "Global Outreach",
      description: "Automated participant recruitment across 65+ countries using LinkedIn, email lists, and WhatsApp networks.",
      icon: Globe,
      gradient: "from-blue-500 to-cyan-500",
      metrics: ["65+ Countries", "10,000+ Participants", "Alumni Networks"],
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    },
    {
      title: "Team & Volunteer Management",
      description: "Coordinate organizing teams, assign tasks, and manage volunteer ambassadors for local hub operations.",
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
      metrics: ["Team Coordination", "Task Assignment", "Volunteer Management"],
      bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
    },
    {
      title: "Event Orchestration",
      description: "Schedule video calls, moderate discussions, and provide real-time participant support across Discord and Slack.",
      icon: Calendar,
      gradient: "from-green-500 to-emerald-500",
      metrics: ["Live Moderation", "Real-time Support", "Multi-platform"],
      bgImage: "https://images.unsplash.com/photo-1560472354-8a07b7ea9556?w=800&q=80"
    },
    {
      title: "Content Generation",
      description: "Create agendas, challenges, slide decks, and social media content that engages the AI community.",
      icon: MessageCircle,
      gradient: "from-orange-500 to-red-500",
      metrics: ["Auto-generated Content", "Social Media", "Challenge Creation"],
      bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    },
    {
      title: "Fundraising & Partnerships",
      description: "Identify prospects, approach sponsors, and maintain partner relationships for sustainable growth.",
      icon: DollarSign,
      gradient: "from-indigo-500 to-purple-500",
      metrics: ["Sponsor Outreach", "Partner Relations", "Funding Pipeline"],
      bgImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80"
    },
    {
      title: "Community Growth Engine",
      description: "Convert participants into long-term members through referral loops and engagement touchpoints.",
      icon: TrendingUp,
      gradient: "from-pink-500 to-rose-500",
      metrics: ["100,000+ Target", "Referral Loops", "Member Retention"],
      bgImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
    }
  ]

  return (
    <section id="workflows" className="py-20 px-6 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            End-to-End Workflow Automation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From global outreach to community growth, our AI agents handle every aspect of your hackathon while building lasting connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflows.map((workflow, index) => (
            <div
              key={index}
              className="group relative h-[400px] overflow-hidden rounded-2xl bg-gray-900 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundImage: `url(${workflow.bgImage})` }}
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${workflow.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                {/* Header */}
                <div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${workflow.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    <workflow.icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{workflow.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{workflow.description}</p>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="border-t border-gray-700 pt-4">
                    <div className="text-xs text-gray-400 mb-2">Key Metrics</div>
                    <div className="flex flex-wrap gap-2">
                      {workflow.metrics.map((metric, metricIndex) => (
                        <span
                          key={metricIndex}
                          className={`text-xs px-3 py-1 bg-gradient-to-r ${workflow.gradient} text-white rounded-full`}
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className={`w-full bg-gradient-to-r ${workflow.gradient} text-white py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    View Workflow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Integration Note */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">Seamless Integration</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              All workflows operate across email, Slack/Discord, WhatsApp, LinkedIn, and event platforms with minimal human intervention required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="bg-gray-800 px-4 py-2 rounded-lg">Slack/Discord</span>
              <span className="bg-gray-800 px-4 py-2 rounded-lg">Email Automation</span>
              <span className="bg-gray-800 px-4 py-2 rounded-lg">LinkedIn API</span>
              <span className="bg-gray-800 px-4 py-2 rounded-lg">WhatsApp Business</span>
              <span className="bg-gray-800 px-4 py-2 rounded-lg">Google Workspace</span>
              <span className="bg-gray-800 px-4 py-2 rounded-lg">Airtable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
