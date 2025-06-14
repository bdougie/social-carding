"use client"

import { Bot, CheckCircle, AlertTriangle, XCircle, Target, Lightbulb } from 'lucide-react'

function AIScorePanel({ aiScore, data }) {
  if (!aiScore) {
    return (
      <div className="text-center py-12">
        <Bot className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">AI analysis will appear here after you analyze a URL</p>
      </div>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-destructive'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success/10 border-success/20'
    if (score >= 60) return 'bg-warning/10 border-warning/20'
    return 'bg-destructive/10 border-destructive/20'
  }

  const getScoreIcon = (score) => {
    if (score >= 80) return CheckCircle
    if (score >= 60) return AlertTriangle
    return XCircle
  }

  const scoreBreakdown = [
    { label: 'Title Optimization', score: aiScore.breakdown.title, max: 30 },
    { label: 'Description Quality', score: aiScore.breakdown.description, max: 25 },
    { label: 'Image Presence', score: aiScore.breakdown.image, max: 25 },
    { label: 'Site Name', score: aiScore.breakdown.siteName, max: 10 },
    { label: 'URL Security', score: aiScore.breakdown.url, max: 10 }
  ]

  const ScoreIcon = getScoreIcon(aiScore.score)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">AI Optimization Score</h2>
        <p className="text-muted-foreground">Get AI-powered insights to improve your social media performance</p>
      </div>

      {/* Overall Score */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-2 ${getScoreBg(aiScore.score)} mb-4`}>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(aiScore.score)}`}>
              {aiScore.score}
            </div>
            <div className="text-sm text-muted-foreground">/ 100</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 mb-2">
          <ScoreIcon className={`h-6 w-6 ${getScoreColor(aiScore.score)}`} />
          <h3 className="text-xl font-semibold text-foreground">
            {aiScore.score >= 80 ? 'Excellent' : aiScore.score >= 60 ? 'Good' : 'Needs Improvement'}
          </h3>
        </div>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          {aiScore.score >= 80 
            ? 'Your social card is well-optimized for maximum engagement!'
            : aiScore.score >= 60 
            ? 'Your social card is good but has room for improvement.'
            : 'Your social card needs optimization to improve performance.'
          }
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="bg-muted/50 rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Score Breakdown
        </h3>
        
        <div className="space-y-4">
          {scoreBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-foreground">{item.label}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.score === item.max ? 'bg-success' : 
                      item.score >= item.max * 0.7 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${(item.score / item.max) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                  {item.score}/{item.max}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {aiScore.recommendations && aiScore.recommendations.length > 0 && (
        <div className="bg-info/10 border border-info/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-info mb-4 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            AI Recommendations
          </h3>
          
          <div className="space-y-3">
            {aiScore.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-info/90">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-3">Title Best Practices</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Keep titles between 30-60 characters</li>
            <li>• Include your main keyword early</li>
            <li>• Make it compelling and click-worthy</li>
            <li>• Avoid clickbait - be authentic</li>
          </ul>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-3">Description Tips</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Aim for 120-160 characters</li>
            <li>• Include a clear call-to-action</li>
            <li>• Summarize the value proposition</li>
            <li>• Use active voice when possible</li>
          </ul>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-3">Image Guidelines</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Use 1200x630px for optimal display</li>
            <li>• Ensure text is readable on mobile</li>
            <li>• Include your brand elements</li>
            <li>• Test across different platforms</li>
          </ul>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-3">Technical SEO</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Always use HTTPS URLs</li>
            <li>• Include structured data markup</li>
            <li>• Optimize for mobile devices</li>
            <li>• Test with platform validators</li>
          </ul>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Expected Performance Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {aiScore.score >= 80 ? '+25%' : aiScore.score >= 60 ? '+15%' : '+5%'}
            </div>
            <p className="text-sm text-primary/80">Click-through Rate</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {aiScore.score >= 80 ? '+40%' : aiScore.score >= 60 ? '+25%' : '+10%'}
            </div>
            <p className="text-sm text-primary/80">Social Engagement</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {aiScore.score >= 80 ? '+30%' : aiScore.score >= 60 ? '+20%' : '+8%'}
            </div>
            <p className="text-sm text-primary/80">Brand Recognition</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIScorePanel