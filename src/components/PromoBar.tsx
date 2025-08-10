'use client'

import { useState, useEffect } from 'react'

const promoMessages = [
  'AI AGENTS THAT RUN YOUR HACKATHON',
  'SCALE TO 100,000+ COMMUNITY MEMBERS',
  'FROM OUTREACH TO EXECUTION',
  'HACK-NATION GLOBAL AI HACKATHON'
]

export default function PromoBar() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoMessages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 relative overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="text-sm font-medium tracking-wide">
          {promoMessages[currentIndex]}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1">
        {promoMessages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
