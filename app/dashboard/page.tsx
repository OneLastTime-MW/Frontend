"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts"
import { AlertCircle, Clock, FileText, Flag, MessageSquare, TrendingUp, Users } from "lucide-react"
import Header from "@/components/header"

// Mock data for the dashboard
const performanceData = [
  { date: "Jan 1", accuracy: 92, sentiment: 85, flags: 0 },
  { date: "Jan 2", accuracy: 94, sentiment: 88, flags: 0 },
  { date: "Jan 3", accuracy: 91, sentiment: 82, flags: 1 },
  { date: "Jan 4", accuracy: 89, sentiment: 75, flags: 1 },
  { date: "Jan 5", accuracy: 93, sentiment: 79, flags: 0 },
  { date: "Jan 6", accuracy: 95, sentiment: 86, flags: 0 },
  { date: "Jan 7", accuracy: 90, sentiment: 81, flags: 0 },
  { date: "Jan 8", accuracy: 88, sentiment: 72, flags: 1 },
  { date: "Jan 9", accuracy: 91, sentiment: 78, flags: 0 },
  { date: "Jan 10", accuracy: 93, sentiment: 84, flags: 0 },
  { date: "Jan 11", accuracy: 94, sentiment: 89, flags: 0 },
  { date: "Jan 12", accuracy: 92, sentiment: 86, flags: 0 },
  { date: "Jan 13", accuracy: 90, sentiment: 80, flags: 0 },
  { date: "Jan 14", accuracy: 87, sentiment: 74, flags: 1 },
]

const flagReasons = [
  { name: "Negative Sentiment", value: 42, color: "#ef4444" },
  { name: "Extended Pause", value: 28, color: "#f59e0b" },
  { name: "Low Accuracy", value: 18, color: "#3b82f6" },
  { name: "Other", value: 12, color: "#6b7280" },
]

const recentConversations = [
  { id: 1, date: "Jan 14, 2023", duration: "12:34", flags: 2, sentiment: "Negative", accuracy: "87%" },
  { id: 2, date: "Jan 13, 2023", duration: "08:21", flags: 0, sentiment: "Positive", accuracy: "94%" },
  { id: 3, date: "Jan 13, 2023", duration: "15:47", flags: 1, sentiment: "Neutral", accuracy: "91%" },
  { id: 4, date: "Jan 12, 2023", duration: "05:12", flags: 0, sentiment: "Positive", accuracy: "95%" },
  { id: 5, date: "Jan 11, 2023", duration: "10:05", flags: 3, sentiment: "Negative", accuracy: "82%" },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("2w")

  // Calculate summary metrics
  const totalConversations = 128
  const totalAlerts = 24
  const averageAccuracy = "91%"
  const positiveRate = "76%"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1w">Last 7 days</SelectItem>
                <SelectItem value="2w">Last 14 days</SelectItem>
                <SelectItem value="1m">Last 30 days</SelectItem>
                <SelectItem value="3m">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button>Export Report</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConversations}</div>
              <p className="text-xs text-muted-foreground">+12% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts Triggered</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAlerts}</div>
              <p className="text-xs text-muted-foreground">-4% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageAccuracy}</div>
              <p className="text-xs text-muted-foreground">+2% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positive Sentiment Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{positiveRate}</div>
              <p className="text-xs text-muted-foreground">+5% from last period</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Accuracy and sentiment scores over time with negative sentiment flags</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" name="Accuracy" />
                  <Line type="monotone" dataKey="sentiment" stroke="#10b981" name="Sentiment Score" />
                  {performanceData.map(
                    (entry, index) =>
                      entry.flags > 0 && (
                        <ReferenceLine
                          key={index}
                          x={entry.date}
                          stroke="#ef4444"
                          label={{ value: "Flag", position: "top", fill: "#ef4444", fontSize: 10 }}
                        />
                      ),
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Flag Reasons</CardTitle>
              <CardDescription>Distribution of conversation flags by reason</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={flagReasons}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {flagReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Conversations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
            <CardDescription>Your most recent analyzed conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Duration</th>
                    <th className="text-left p-2">Flags</th>
                    <th className="text-left p-2">Sentiment</th>
                    <th className="text-left p-2">Accuracy</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentConversations.map((conversation) => (
                    <tr key={conversation.id} className="border-b">
                      <td className="p-2">{conversation.id}</td>
                      <td className="p-2">{conversation.date}</td>
                      <td className="p-2">{conversation.duration}</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          {conversation.flags > 0 ? (
                            <>
                              <Flag className="h-4 w-4 text-red-500 mr-1" />
                              {conversation.flags}
                            </>
                          ) : (
                            "0"
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            conversation.sentiment === "Positive"
                              ? "bg-green-100 text-green-800"
                              : conversation.sentiment === "Negative"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {conversation.sentiment}
                        </span>
                      </td>
                      <td className="p-2">{conversation.accuracy}</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights and Recommendations */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Trends and patterns from your conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Negative Sentiment Spike</p>
                    <p className="text-sm text-muted-foreground">
                      There was a 15% increase in negative sentiment on January 14th. Consider reviewing conversations
                      from this date.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Extended Pauses</p>
                    <p className="text-sm text-muted-foreground">
                      28% of flagged conversations contained extended pauses, often preceding negative sentiment.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Improving Accuracy</p>
                    <p className="text-sm text-muted-foreground">
                      Overall transcription accuracy has improved by 2% over the last two weeks.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Actionable steps to improve conversation quality</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Review Flagged Conversations</p>
                    <p className="text-sm text-muted-foreground">
                      Schedule a team review of the 24 flagged conversations to identify common issues and training
                      opportunities.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Pause Reduction Training</p>
                    <p className="text-sm text-muted-foreground">
                      Implement training focused on reducing extended pauses, which account for 28% of all flags.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Sentiment Improvement</p>
                    <p className="text-sm text-muted-foreground">
                      Create response templates for common negative sentiment triggers to improve customer satisfaction.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

