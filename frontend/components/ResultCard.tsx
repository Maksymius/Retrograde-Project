'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { useState } from 'react'

interface ResultCardProps {
  date: string
  location: string
}

export function ResultCard({ date, location }: ResultCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Mock data for demonstration
  const mockResults = {
    temporalSignature: "ANOMALY_DETECTED",
    probability: "87.3%",
    coordinates: "50.4501° N, 30.5234° E",
    timelineStatus: "STABLE_DIVERGENCE",
    riskLevel: "MODERATE"
  }

  return (
    <Card variant="terminal" className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <span className="animate-pulse">●</span>
          TEMPORAL ANALYSIS COMPLETE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 font-mono text-sm">
        {/* Query Info */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-600">
          <div>
            <span className="text-gray-400">TARGET DATE:</span>
            <div className="text-amber-500 font-semibold">{date}</div>
          </div>
          <div>
            <span className="text-gray-400">LOCATION:</span>
            <div className="text-amber-500 font-semibold">{location}</div>
          </div>
        </div>
        
        {/* Analysis Results */}
        <div className="space-y-3">
          <div className="text-green-400 mb-2">TEMPORAL SIGNATURE:</div>
          
          <div className="bg-gray-800/30 p-3 rounded border border-gray-600/50">
            <div className="text-gray-200">
              {!showDetails ? (
                <TypingAnimation 
                  text={`Status: ${mockResults.temporalSignature} | Probability: ${mockResults.probability}`}
                  speed={40}
                  onComplete={() => setShowDetails(true)}
                />
              ) : (
                <>
                  <div className="mb-2">Status: <span className="text-amber-500">{mockResults.temporalSignature}</span></div>
                  <div className="mb-2">Probability: <span className="text-green-400">{mockResults.probability}</span></div>
                  <div className="mb-2">Coordinates: <span className="text-gray-300">{mockResults.coordinates}</span></div>
                  <div className="mb-2">Timeline: <span className="text-amber-500">{mockResults.timelineStatus}</span></div>
                  <div>Risk Level: <span className="text-yellow-400">{mockResults.riskLevel}</span></div>
                </>
              )}
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 p-3 bg-green-400/10 border border-green-400/30 rounded">
              <div className="text-green-400 text-xs mb-1">SYSTEM MESSAGE:</div>
              <div className="text-gray-200 text-xs">
                Temporal anomaly detected at specified coordinates. 
                Recommend further investigation with enhanced protocols.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}