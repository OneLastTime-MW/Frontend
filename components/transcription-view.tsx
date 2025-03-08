"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Clock } from "lucide-react"

// Mock data for demonstration
const mockTranscriptions = [
  { id: 1, text: "Hello, how are you doing today?", speaker: "User", sentiment: "neutral", timestamp: "00:00:05" },
  {
    id: 2,
    text: "I'm doing well, thank you for asking.",
    speaker: "Other",
    sentiment: "positive",
    timestamp: "00:00:08",
  },
  {
    id: 3,
    text: "I've been having some issues with the service lately.",
    speaker: "User",
    sentiment: "negative",
    timestamp: "00:00:15",
  },
  {
    id: 4,
    text: "I'm sorry to hear that. What kind of issues are you experiencing?",
    speaker: "Other",
    sentiment: "neutral",
    timestamp: "00:00:20",
  },
  {
    id: 5,
    text: "The system keeps crashing whenever I try to upload files.",
    speaker: "User",
    sentiment: "negative",
    timestamp: "00:00:28",
  },
  { id: 6, text: "...", speaker: "Other", sentiment: "pause", timestamp: "00:00:35" },
  {
    id: 7,
    text: "I understand your frustration. Let me see what I can do to help resolve this issue.",
    speaker: "Other",
    sentiment: "neutral",
    timestamp: "00:00:40",
  },
]

interface TranscriptionViewProps {
  isRecording: boolean
}

export default function TranscriptionView({ isRecording }: TranscriptionViewProps) {
  const [transcriptions, setTranscriptions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Simulate real-time transcription when recording
  useEffect(() => {
    if (isRecording && currentIndex < mockTranscriptions.length) {
      const timer = setTimeout(() => {
        setTranscriptions((prev) => [...prev, mockTranscriptions[currentIndex]])
        setCurrentIndex((prev) => prev + 1)
      }, 2000) // Add a new transcription every 2 seconds

      return () => clearTimeout(timer)
    }
  }, [isRecording, currentIndex])

  // Reset transcriptions when recording starts
  useEffect(() => {
    if (isRecording && currentIndex === 0) {
      setTranscriptions([])
    }
  }, [isRecording])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "negative":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "pause":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    }
  }

  return (
    <div className="space-y-4">
      {isRecording && (
        <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Recording in progress. Speak clearly for best results.</AlertDescription>
        </Alert>
      )}

      <ScrollArea className="h-[400px] rounded-md border p-4">
        {transcriptions.length === 0 && !isRecording ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Press "Start Recording" to begin transcription
          </div>
        ) : (
          <div className="space-y-4">
            {transcriptions.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg ${item.speaker === "User" ? "bg-muted ml-12" : "bg-primary/10 mr-12"}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{item.speaker}</span>
                  <div className="flex items-center gap-2">
                    {(item.sentiment === "negative" || item.sentiment === "pause") && (
                      <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                        {item.sentiment === "negative" ? "Negative Sentiment" : "Pause Detected"}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
            {isRecording && (
              <div className="flex items-center justify-center py-2">
                <div className="flex gap-1">
                  <span className="animate-bounce delay-0 h-2 w-2 bg-primary rounded-full"></span>
                  <span className="animate-bounce delay-150 h-2 w-2 bg-primary rounded-full"></span>
                  <span className="animate-bounce delay-300 h-2 w-2 bg-primary rounded-full"></span>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

