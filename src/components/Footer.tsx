import { Bot } from 'lucide-react'

export default function Footer() {
  const productSections = [
    {
      title: "Product",
      links: [
        "AI Agents",
        "Workflow Automation",
        "Community Growth",
        "Analytics Dashboard",
        "Integration Hub"
      ]
    },
    {
      title: "Use Cases",
      links: [
        "Global Hackathons",
        "Local Meetups",
        "Corporate Events",
        "University Programs",
        "Community Building"
      ]
    },
    {
      title: "Technology",
      links: [
        "OpenAI Integration",
        "LangChain Framework",
        "Multi-Agent System",
        "API Documentation",
        "Security & Privacy"
      ]
    },
    {
      title: "Community",
      links: [
        "Hack-Nation Network",
        "Global Ambassadors",
        "Local Hubs",
        "Alumni Network",
        "Success Stories"
      ]
    }
  ]

  const supportSections = [
    {
      title: "Resources",
      links: [
        "Documentation",
        "Getting Started",
        "Best Practices",
        "Templates",
        "Case Studies"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Technical Support",
        "Implementation Guide",
        "Training Materials",
        "Community Forum",
        "Contact Us"
      ]
    },
    {
      title: "Company",
      links: [
        "About Hack-Nation",
        "Team",
        "Mission & Vision",
        "Partnerships",
        "Careers",
        "Press Kit"
      ]
    },
    {
      title: "Developers",
      links: [
        "API Access",
        "SDK Downloads",
        "Integration Partners",
        "Webhooks",
        "Rate Limits",
        "Changelog"
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      {/* Hackathon Twin logo */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Hackathon Twin</div>
              <div className="text-xs text-gray-400">AI Event Orchestration</div>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-12 text-sm">
            <a href="#demo" className="text-gray-400 hover:text-white transition-colors">Demo</a>
            <a href="#docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
            <a href="#community" className="text-gray-400 hover:text-white transition-colors">Join Community</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {productSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support sections */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {supportSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest updates on AI agent development, hackathon best practices, and community growth strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-gray-400">© 2025 Hack-Nation, Inc. All Rights Reserved</span>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors">GDPR Compliance</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">🌍 Global Platform</span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  🔗
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Discord</span>
                  💬
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500 text-center">
              Powered by AI • Built for Global Impact • Securing the Future of Hackathons
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
