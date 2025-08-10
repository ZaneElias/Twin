'use client'

import { Code, Database, Zap, Shield, Cloud, Cpu } from 'lucide-react'

export default function TechStack() {
  const techCategories = [
    {
      title: "AI Frameworks",
      icon: Cpu,
      gradient: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "OpenAI Assistants API", description: "Advanced conversational AI capabilities" },
        { name: "LangChain", description: "AI agent orchestration and workflows" },
        { name: "CrewAI", description: "Multi-agent coordination system" },
        { name: "Semantic Kernel", description: "AI plugin architecture" }
      ]
    },
    {
      title: "Integrations",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      technologies: [
        { name: "Google Workspace APIs", description: "Calendar, Docs, and Sheets automation" },
        { name: "Slack/Discord SDKs", description: "Real-time messaging and moderation" },
        { name: "LinkedIn API", description: "Professional network outreach" },
        { name: "Airtable API", description: "Structured data management" }
      ]
    },
    {
      title: "Data & Analytics",
      icon: Database,
      gradient: "from-green-500 to-emerald-500",
      technologies: [
        { name: "PostgreSQL", description: "Reliable data persistence" },
        { name: "Redis", description: "High-performance caching" },
        { name: "Apache Kafka", description: "Real-time event streaming" },
        { name: "Grafana", description: "Metrics and visualization" }
      ]
    },
    {
      title: "Infrastructure",
      icon: Cloud,
      gradient: "from-orange-500 to-red-500",
      technologies: [
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "Docker", description: "Containerized deployment" },
        { name: "AWS/Azure", description: "Cloud infrastructure" },
        { name: "Terraform", description: "Infrastructure as code" }
      ]
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      gradient: "from-indigo-500 to-purple-500",
      technologies: [
        { name: "OAuth 2.0", description: "Secure authentication" },
        { name: "GDPR Compliance", description: "Data protection standards" },
        { name: "End-to-End Encryption", description: "Data security in transit" },
        { name: "Audit Logging", description: "Complete activity tracking" }
      ]
    },
    {
      title: "Development",
      icon: Code,
      gradient: "from-pink-500 to-rose-500",
      technologies: [
        { name: "TypeScript", description: "Type-safe development" },
        { name: "Next.js", description: "Modern web framework" },
        { name: "Python", description: "AI/ML backend services" },
        { name: "GitHub Actions", description: "CI/CD automation" }
      ]
    }
  ]

  const architectureFeatures = [
    {
      title: "Modular Design",
      description: "Each AI agent operates as an independent microservice with clear API contracts.",
      icon: "🧩"
    },
    {
      title: "Shared Data Layer",
      description: "Single source of truth for tasks and participant data with real-time sync.",
      icon: "🗄️"
    },
    {
      title: "Rate Limiting",
      description: "Smart API quota management with local caching and batch processing.",
      icon: "⚡"
    },
    {
      title: "Error Resilience",
      description: "Robust error handling with fallback mechanisms and human-in-the-loop options.",
      icon: "🛡️"
    }
  ]

  return (
    <section id="tech" className="py-20 px-6 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built for Scale & Reliability
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade architecture designed to handle global hackathons with thousands of participants while maintaining security and performance.
          </p>
        </div>

        {/* Technology Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Header */}
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mr-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="border-l-2 border-gray-700 pl-4">
                    <div className="font-medium text-white text-sm">{tech.name}</div>
                    <div className="text-gray-400 text-xs">{tech.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Architecture Principles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">&lt;3s</div>
              <div className="text-sm text-gray-300 mb-2">Response Time</div>
              <div className="text-xs text-gray-400">Average agent response latency</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-sm text-gray-300 mb-2">Uptime</div>
              <div className="text-xs text-gray-400">Service availability guarantee</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">10,000+</div>
              <div className="text-sm text-gray-300 mb-2">Concurrent Users</div>
              <div className="text-xs text-gray-400">Peak handling capacity</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Deploy?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get started with our comprehensive documentation and see how to integrate Hackathon Twin into your next event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors">
                View Documentation
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                API Reference
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
