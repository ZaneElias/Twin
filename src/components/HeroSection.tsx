'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, Bot, Globe, Users, Zap } from 'lucide-react'

const heroSlides = [
  {
    title: "HACKATHON TWIN",
    subtitle: "AI agents that run your global hackathon from start to finish while growing your community to 100,000+ members.",
    buttonText: "See Demo",
    buttonAction: "Watch Video",
    bgColor: "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900",
    stats: [
      { icon: Globe, label: "65+ Countries", value: "Global Reach" },
      { icon: Users, label: "100,000+", value: "Target Members" },
      { icon: Bot, label: "4 AI Agents", value: "Full Automation" },
      { icon: Zap, label: "End-to-End", value: "Zero Manual Work" }
    ]
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const slide = heroSlides[currentSlide]

  return (
    <section className={`relative h-[700px] ${slide.bgColor} overflow-hidden`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(59,130,246,0.2),transparent_50%)]" />
      </div>

      {/* Floating Icons Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce delay-0">
          <Bot className="h-8 w-8 text-blue-400/50" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-1000">
          <Users className="h-6 w-6 text-purple-400/50" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-2000">
          <Globe className="h-10 w-10 text-blue-300/50" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-500">
          <Zap className="h-7 w-7 text-purple-300/50" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
        <div className="max-w-5xl">
          <div className="mb-6">
            <span className="inline-block bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
              AI-Powered Event Orchestration
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            {slide.title}
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {slide.buttonText}
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              {slide.buttonAction}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {slide.stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">{stat.label}</div>
                <div className="text-sm text-gray-300">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Slide indicators */}
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side Navigation */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-6 right-24 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors border border-white/30"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      <button
        onClick={prevSlide}
        className="absolute bottom-6 right-36 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors border border-white/30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute bottom-6 right-12 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors border border-white/30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </section>
  )
}
