"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, StopCircle } from "lucide-react"
import TranscriptionView from "@/components/transcription-view"
import Header from "@/components/header"

export default function TranscriptionPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [hasConversation, setHasConversation] = useState(false)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Starting a new recording
      console.log("Starting recording...")
      // Here you would initialize your transcription service
    } else {
      // Stopping recording
      console.log("Stopping recording...")
      setHasConversation(true)
      // Here you would stop your transcription service
    }
  }

  const startNewConversation = () => {
    setHasConversation(false)
    setIsRecording(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto py-10 px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Live Transcription</h1>

        <Card>
          <CardHeader>
            <CardTitle>Live Conversation</CardTitle>
            <CardDescription>Start recording to see real-time transcription and sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <TranscriptionView isRecording={isRecording} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={startNewConversation} disabled={!hasConversation}>
              New Conversation
            </Button>
            <Button onClick={toggleRecording} variant={isRecording ? "destructive" : "default"} className="gap-2">
              {isRecording ? (
                <>
                  <StopCircle className="h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" /> Start Recording
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {hasConversation && (
          <div className="mt-8 flex justify-end">
            <Button asChild>
              <a href="/dashboard">View Analytics</a>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

