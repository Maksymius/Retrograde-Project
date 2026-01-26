'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'

interface ResultCardProps {
  date: string
  location: string
}

export function ResultCard({ date, location }: ResultCardProps) {
  return (
    <Card variant="terminal" className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-retro-accent">
          TEMPORAL ANALYSIS COMPLETE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 font-mono text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-retro-text/60">TARGET DATE:</span>
            <div className="text-retro-primary">{date}</div>
          </div>
          <div>
            <span className="text-retro-text/60">LOCATION:</span>
            <div className="text-retro-primary">{location}</div>
          </div>
        </div>
        
        <div className="border-t border-retro-border pt-4">
          <div className="text-retro-accent mb-2">TEMPORAL SIGNATURE:</div>
          <div className="text-retro-text">
            <TypingAnimation 
              text="Anomaly detected: High probability retrograde event"
              speed={40}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}