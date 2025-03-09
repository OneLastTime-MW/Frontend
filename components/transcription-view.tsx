import React, { useState, useEffect, useRef } from 'react';

interface TranscriptionEntry {
  speaker: string;
  text: string;
  profanity_detected: boolean;
  sentiment: string;
  timestamp: string;
}

const CHUNK_SIZE = 8000; // bytes per chunk (adjust as needed)
const CHUNK_DELAY = 200; // milliseconds delay between chunks 

const TranscriptionView: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [transcriptions, setTranscriptions] = useState<TranscriptionEntry[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isFileStreaming, setIsFileStreaming] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Declare the ref for immediate file streaming state updates at top-level
  const isFileStreamingRef = useRef(false);

  // Setup WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/stt/');
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("Raw message received:", event.data);
      try {
        const data: TranscriptionEntry = JSON.parse(event.data);
        console.log(data.text);
        setTranscriptions(prev => [...prev, data]);
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (event) => {
      console.error("⚠️ WebSocket error:", event);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  // Handle recording start/stop
  useEffect(() => {
    if (!socket || !isConnected) return;

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => {
      stopRecording();
    };
  }, [socket, isRecording, isConnected]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Convert audio to correct format for Vosk (16kHz mono)
      const audioContext = new AudioContext({ sampleRate: 16000 });
      const sourceNode = audioContext.createMediaStreamSource(stream);
      const processorNode = audioContext.createScriptProcessor(4096, 1, 1);
      
      processorNode.onaudioprocess = (e) => {
        if (socket && socket.readyState === WebSocket.OPEN && isRecording) {
          // Get audio data
          const inputData = e.inputBuffer.getChannelData(0);
          
          // Convert float32 to int16
          const pcmData = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            pcmData[i] = inputData[i] * 0x7FFF;
          }
          
          // Send audio data to server
          socket.send(pcmData.buffer);
        }
      };
      
      sourceNode.connect(processorNode);
      processorNode.connect(audioContext.destination);
      
      console.log("🎤 Recording started");
    } catch (err) {
      console.error("⚠️ Microphone access error:", err);
    }
  };

  const stopRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      console.log("🎤 Recording stopped");
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // File upload handling
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !socket || socket.readyState !== WebSocket.OPEN) return;

    // Clear previous transcriptions
    setTranscriptions([]);
    
    // Set file streaming state both in state and in ref
    setIsFileStreaming(true);
    isFileStreamingRef.current = true;

    let offset = 0;
    const fileSize = file.size;

    try {
      // Read the entire file as an ArrayBuffer
      const fileArrayBuffer = await file.arrayBuffer();
  
      // Create an AudioContext with the target sample rate (16kHz for Vosk)
      const audioContext = new AudioContext({ sampleRate: 16000 });
  
      // Decode the audio file; this converts compressed formats (like MP3) to raw PCM (Float32Array)
      const decodedAudio = await audioContext.decodeAudioData(fileArrayBuffer);
  
      // Assume mono audio: use the first channel's data
      const channelData = decodedAudio.getChannelData(0);
      const totalSamples = channelData.length;
  
      // Process and send the PCM data in chunks
      while (offset < totalSamples && isFileStreamingRef.current) {
        console.log("Processing chunk at offset:", offset);
        // Slice a chunk of the audio samples
        const chunkSamples = channelData.slice(offset, offset + CHUNK_SIZE);
  
        // Convert the Float32 samples to Int16 PCM data
        const pcmChunk = new Int16Array(chunkSamples.length);
        for (let i = 0; i < chunkSamples.length; i++) {
          // Clamp the sample between -1 and 1, then scale to int16 range
          const sample = Math.max(-1, Math.min(1, chunkSamples[i]));
          pcmChunk[i] = sample * 32767;
        }
  
        // Send the PCM data chunk to the server via WebSocket
        socket.send(pcmChunk.buffer);
        console.log("Sent chunk:", pcmChunk.buffer);
  
        offset += CHUNK_SIZE;
  
        // Wait a little before sending the next chunk to simulate real-time streaming
        await new Promise(resolve => setTimeout(resolve, CHUNK_DELAY));
      }
    } catch (error) {
      console.error("Error processing the audio file:", error);
    }
  
    // Mark the end of file streaming
    setIsFileStreaming(false);
    isFileStreamingRef.current = false;
    console.log("📂 Finished streaming file in chunks.");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🎤 Real-time Transcription</h1>
      
      <button 
        onClick={toggleRecording}
        className={`px-4 py-2 rounded mb-4 ${isRecording 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-green-500 hover:bg-green-600 text-white'}`}
        disabled={!isConnected}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
        Stream File
        <input 
          type="file" 
          accept="audio/*" 
          onChange={handleFileUpload} 
          className="hidden"
          ref={fileInputRef}
        />
      </label>
      
      {!isConnected && (
        <div className="mb-4 text-red-500">
          ⚠️ WebSocket not connected. Make sure the server is running.
        </div>
      )}
      
      <div className="border rounded p-4 bg-gray-50 h-96 overflow-y-auto">
        {transcriptions.length === 0 ? (
          <div className="text-gray-500 italic">Transcription will appear here...</div>
        ) : (
          transcriptions.map((entry, index) => (
            <div key={index} className="mb-2 pb-2 border-b">
              <div className="font-semibold">
                {entry.speaker} 
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="ml-4">
                {entry.text}
                <div className="text-xs mt-1">
                  <span className={`px-2 py-1 rounded mr-2 ${
                    entry.sentiment === "Positive" ? "bg-green-100 text-green-800" :
                    entry.sentiment === "Negative" ? "bg-red-100 text-red-800" :
                    entry.sentiment === "Anger" ? "bg-orange-100 text-orange-800" :
                    entry.sentiment === "Sarcasm" ? "bg-purple-100 text-purple-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {entry.sentiment}
                  </span>
                  {entry.profanity_detected && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      ⚠️ Profanity
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TranscriptionView;
