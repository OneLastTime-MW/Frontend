"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartLine,
  ChartLineArea,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartBar,
} from "@/components/ui/chart"
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for demonstration
const accuracyData = [
  { time: "00:00:10", accuracy: 95 },
  { time: "00:00:20", accuracy: 92 },
  { time: "00:00:30", accuracy: 88 },
  { time: "00:00:40", accuracy: 90 },
  { time: "00:00:50", accuracy: 94 },
  { time: "00:01:00", accuracy: 96 },
  { time: "00:01:10", accuracy: 93 },
  { time: "00:01:20", accuracy: 91 },
]

const sentimentData = [
  { name: "Positive", value: 25, color: "#10b981" },
  { name: "Neutral", value: 55, color: "#3b82f6" },
  { name: "Negative", value: 15, color: "#ef4444" },
  { name: "Pauses", value: 5, color: "#f59e0b" },
]

const speakerTimeData = [
  { name: "User", time: 45 },
  { name: "Other", time: 55 },
]

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversation Analytics</CardTitle>
          <CardDescription>View detailed metrics about your conversation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="accuracy">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="accuracy">Accuracy Over Time</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="speaking">Speaking Time</TabsTrigger>
            </TabsList>

            <TabsContent value="accuracy" className="h-[400px]">
              <ChartContainer>
                <ChartLegend>
                  <ChartLegendItem name="Accuracy" color="#3b82f6" />
                </ChartLegend>
                <Chart>
                  <ChartGrid horizontal vertical />
                  <ChartXAxis dataKey="time" />
                  <ChartYAxis tickFormatter={(value) => `${value}%`} />
                  <ChartLine dataKey="accuracy" stroke="#3b82f6" data={accuracyData} />
                  <ChartLineArea dataKey="accuracy" fill="#3b82f6" fillOpacity={0.1} data={accuracyData} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </Chart>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="sentiment" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="speaking" className="h-[400px]">
              <ChartContainer>
                <ChartLegend>
                  <ChartLegendItem name="Speaking Time (%)" color="#8b5cf6" />
                </ChartLegend>
                <Chart>
                  <ChartGrid horizontal vertical />
                  <ChartXAxis dataKey="name" />
                  <ChartYAxis tickFormatter={(value) => `${value}%`} />
                  <ChartBar dataKey="time" fill="#8b5cf6" data={speakerTimeData} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </Chart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Summary of conversation analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Average Accuracy:</span>
                <span className="font-medium">92.4%</span>
              </li>
              <li className="flex justify-between">
                <span>Negative Sentiment Flags:</span>
                <span className="font-medium">2</span>
              </li>
              <li className="flex justify-between">
                <span>Pause Detections:</span>
                <span className="font-medium">1</span>
              </li>
              <li className="flex justify-between">
                <span>Total Conversation Time:</span>
                <span className="font-medium">1m 20s</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Based on conversation analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Consider addressing customer concerns more directly to reduce negative sentiment</li>
              <li>Minimize pauses to maintain engagement</li>
              <li>Accuracy dropped around 00:00:30, consider improving audio quality</li>
              <li>Balance speaking time more evenly between participants</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

