import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, BarChart2, AlertCircle, Clock, FileText, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Unlock Conversation Intelligence
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Transform your conversations with real-time sentiment analysis, pause detection, and actionable
                  insights.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Try Demo Dashboard</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <img
                src="/placeholder.svg?height=550&width=550"
                alt="Dashboard Preview"
                className="rounded-lg shadow-xl"
                width={550}
                height={550}
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Real-time analysis in action</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive suite of tools helps you gain deeper insights from every conversation.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>Detect emotions and tone in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our advanced AI identifies positive, neutral, and negative sentiments with industry-leading accuracy.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pause Detection</CardTitle>
                <CardDescription>Identify awkward silences and gaps</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Automatically detect conversation pauses that may indicate confusion, hesitation, or disengagement.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Accuracy Checking</CardTitle>
                <CardDescription>Ensure transcription quality</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Monitor and improve transcription accuracy with our proprietary confidence scoring system.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>Never miss critical moments</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Receive instant notifications when negative sentiments or extended pauses are detected.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Detailed Reports</CardTitle>
                <CardDescription>Comprehensive conversation insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Generate in-depth reports with actionable insights to improve communication effectiveness.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Visualize conversation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Track performance trends and identify patterns with our intuitive analytics dashboard.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Us</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Transform your customer interactions and team communications with our powerful platform.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Improve Customer Satisfaction</h3>
              <p className="text-muted-foreground text-center">
                Identify and address negative sentiments before they escalate, leading to higher customer satisfaction.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="M4.93 19.07l2.83-2.83" />
                  <path d="M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Enhance Team Performance</h3>
              <p className="text-muted-foreground text-center">
                Coach your team with data-driven insights to improve communication skills and effectiveness.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Reduce Response Time</h3>
              <p className="text-muted-foreground text-center">
                Real-time alerts enable immediate intervention when issues arise, reducing resolution time.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Gain Valuable Insights</h3>
              <p className="text-muted-foreground text-center">
                Uncover patterns and trends across conversations to inform business decisions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Scale Effortlessly</h3>
              <p className="text-muted-foreground text-center">
                Our platform scales with your business, from small teams to enterprise-level operations.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Easy Integration</h3>
              <p className="text-muted-foreground text-center">
                Seamlessly integrates with your existing communication tools and CRM systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Conversations?
              </h2>
              <p className="max-w-[600px] md:text-xl">
                Join thousands of businesses already improving their communication with our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">Try Demo Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our customers have to say.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Card className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Avatar"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                    <CardDescription>Customer Service Manager</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "The real-time alerts have been a game-changer for our support team. We've seen a 30% reduction in
                  escalations since implementing this platform."
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Avatar"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <CardTitle className="text-lg">Michael Chen</CardTitle>
                    <CardDescription>Sales Director</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "Our sales team has improved close rates by 25% using the insights from the sentiment analysis. The
                  detailed reports have been invaluable for coaching."
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Avatar"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <CardTitle className="text-lg">Emily Rodriguez</CardTitle>
                    <CardDescription>Training Coordinator</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "The pause detection feature has been eye-opening for our new hires. We've been able to identify and
                  address communication gaps much more effectively."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

