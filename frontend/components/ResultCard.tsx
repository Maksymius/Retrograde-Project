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
        <CardTitle className="text-retro-accent flex items-center gap-2">
          <span className="animate-pulse">●</span>
          TEMPORAL ANALYSIS COMPLETE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 font-mono text-sm">
        {/* Query Info */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-retro-border">
          <div>
            <span className="text-retro-text/60">TARGET DATE:</span>
            <div className="text-retro-primary font-semibold">{date}</div>
          </div>
          <div>
            <span className="text-retro-text/60">LOCATION:</span>
            <div className="text-retro-primary font-semibold">{location}</div>
          </div>
        </div>
        
        {/* Analysis Results */}
        <div className="space-y-3">
          <div className="text-retro-accent mb-2">TEMPORAL SIGNATURE:</div>
          
          <div className="bg-retro-surface/30 p-3 rounded border border-retro-border/50">
            <div className="text-retro-text">
              {!showDetails ? (
                <TypingAnimation 
                  text={`Status: ${mockResults.temporalSignature} | Probability: ${mockResults.probability}`}
                  speed={40}
                  onComplete={() => setShowDetails(true)}
                />
              ) : (
                <>
                  <div className="mb-2">Status: <span className="text-retro-primary">{mockResults.temporalSignature}</span></div>
                  <div className="mb-2">Probability: <span className="text-retro-accent">{mockResults.probability}</span></div>
                  <div className="mb-2">Coordinates: <span className="text-retro-text/80">{mockResults.coordinates}</span></div>
                  <div className="mb-2">Timeline: <span className="text-retro-primary">{mockResults.timelineStatus}</span></div>
                  <div>Risk Level: <span className="text-yellow-400">{mockResults.riskLevel}</span></div>
                </>
              )}
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 p-3 bg-retro-accent/10 border border-retro-accent/30 rounded">
              <div className="text-retro-accent text-xs mb-1">SYSTEM MESSAGE:</div>
              <div className="text-retro-text/90 text-xs">
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