"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, Share, Repeat2, ThumbsUp, MoreHorizontal, Hash, AtSign, Reply, Plus, TrendingUp } from 'lucide-react'

function PreviewPanel({ data }) {
  const platforms = [
    {
      name: 'Discord',
      component: <DiscordPreview data={data} />
    },
    {
      name: 'Twitter/X',
      component: <TwitterPreview data={data} />
    },
    {
      name: 'LinkedIn',
      component: <LinkedInPreview data={data} />
    },
    {
      name: 'Bluesky',
      component: <BlueskyPreview data={data} />
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Live Preview</h2>
        <p className="text-muted-foreground">See how your content will appear across different social media platforms with realistic engagement metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {platforms.map((platform, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center">
              {platform.name}
              {(platform.name === 'Twitter/X' || platform.name === 'LinkedIn') && (
                <div className="ml-2 flex items-center space-x-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span>Live Metrics</span>
                </div>
              )}
            </h3>
            {platform.component}
          </div>
        ))}
      </div>

      {/* Engagement Analytics Info */}
      <div className="bg-info/10 border border-info/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-info mb-4 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Real-Time Engagement Simulation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-info/90">
          <div>
            <h4 className="font-semibold mb-2">LinkedIn Metrics</h4>
            <ul className="space-y-1">
              <li>• Professional engagement patterns</li>
              <li>• Industry-specific interaction rates</li>
              <li>• Business hours activity simulation</li>
              <li>• Connection-based reach modeling</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Twitter/X Metrics</h4>
            <ul className="space-y-1">
              <li>• Real-time viral coefficient tracking</li>
              <li>• Hashtag performance indicators</li>
              <li>• Retweet velocity simulation</li>
              <li>• Trending topic correlation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for realistic engagement metrics
function useEngagementMetrics(platform, contentQuality = 'medium') {
  const [metrics, setMetrics] = useState({
    likes: 0,
    shares: 0,
    comments: 0,
    views: 0,
    lastUpdated: Date.now()
  })

  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Initialize metrics based on platform and content quality
    const baseMetrics = getBaseMetrics(platform, contentQuality)
    setMetrics(prev => ({ ...prev, ...baseMetrics }))

    // Set up periodic updates
    const interval = setInterval(() => {
      setIsUpdating(true)
      
      setTimeout(() => {
        setMetrics(prev => {
          const growth = calculateGrowth(platform, contentQuality, prev)
          return {
            likes: Math.max(0, prev.likes + growth.likes),
            shares: Math.max(0, prev.shares + growth.shares),
            comments: Math.max(0, prev.comments + growth.comments),
            views: Math.max(0, prev.views + growth.views),
            lastUpdated: Date.now()
          }
        })
        setIsUpdating(false)
      }, 500)
    }, 8000) // Update every 8 seconds

    return () => clearInterval(interval)
  }, [platform, contentQuality])

  return { metrics, isUpdating }
}

function getBaseMetrics(platform, quality) {
  const multipliers = {
    high: { likes: 2.5, shares: 2.0, comments: 1.8, views: 3.0 },
    medium: { likes: 1.0, shares: 1.0, comments: 1.0, views: 1.0 },
    low: { likes: 0.4, shares: 0.3, comments: 0.5, views: 0.6 }
  }

  const baseRanges = {
    'Twitter/X': { likes: [15, 45], shares: [3, 12], comments: [2, 8], views: [150, 400] },
    'LinkedIn': { likes: [8, 25], shares: [2, 8], comments: [1, 5], views: [80, 200] }
  }

  const ranges = baseRanges[platform] || baseRanges['Twitter/X']
  const mult = multipliers[quality]

  return {
    likes: Math.floor((ranges.likes[0] + Math.random() * (ranges.likes[1] - ranges.likes[0])) * mult.likes),
    shares: Math.floor((ranges.shares[0] + Math.random() * (ranges.shares[1] - ranges.shares[0])) * mult.shares),
    comments: Math.floor((ranges.comments[0] + Math.random() * (ranges.comments[1] - ranges.comments[0])) * mult.comments),
    views: Math.floor((ranges.views[0] + Math.random() * (ranges.views[1] - ranges.views[0])) * mult.views)
  }
}

function calculateGrowth(platform, quality, currentMetrics) {
  const growthRates = {
    'Twitter/X': { likes: 0.15, shares: 0.08, comments: 0.05, views: 0.25 },
    'LinkedIn': { likes: 0.08, shares: 0.04, comments: 0.03, views: 0.12 }
  }

  const rates = growthRates[platform] || growthRates['Twitter/X']
  
  // Add some randomness and viral potential
  const viralChance = Math.random()
  const viralMultiplier = viralChance > 0.95 ? 3 : viralChance > 0.85 ? 1.5 : 1

  return {
    likes: Math.floor((Math.random() * currentMetrics.likes * rates.likes + Math.random() * 2) * viralMultiplier),
    shares: Math.floor((Math.random() * currentMetrics.shares * rates.shares + Math.random() * 1) * viralMultiplier),
    comments: Math.floor((Math.random() * currentMetrics.comments * rates.comments + Math.random() * 1)),
    views: Math.floor((Math.random() * currentMetrics.views * rates.views + Math.random() * 5) * viralMultiplier)
  }
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

function DiscordPreview({ data }) {
  return (
    <div className="bg-[#36393f] rounded-lg overflow-hidden shadow-sm max-w-md">
      {/* Message Header */}
      <div className="p-4">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">YU</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline space-x-2">
              <p className="font-semibold text-white text-sm">Your Username</p>
              <span className="text-[#72767d] text-xs">Today at 12:34 PM</span>
            </div>
            <p className="text-[#dcddde] text-sm mt-1">Check out this amazing content!</p>
          </div>
        </div>

        {/* Link Embed */}
        <div className="bg-[#2f3136] border-l-4 border-[#5865f2] rounded-r overflow-hidden">
          {data.image && (
            <div className="relative w-full h-48">
              <Image
                src={data.image}
                alt="Preview"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          )}
          <div className="p-4">
            <div className="text-xs text-[#00b0f4] mb-1 font-medium">
              {data.url ? new URL(data.url).hostname.toUpperCase() : 'EXAMPLE.COM'}
            </div>
            <h3 className="font-semibold text-[#00b0f4] mb-1 text-sm hover:underline cursor-pointer line-clamp-2">
              {data.title || 'Your Title Here'}
            </h3>
            <p className="text-[#dcddde] text-sm line-clamp-3">
              {data.description || 'Your description will appear here...'}
            </p>
          </div>
        </div>

        {/* Reactions */}
        <div className="flex items-center space-x-4 mt-3 text-[#72767d]">
          <button className="flex items-center space-x-1 hover:text-[#dcddde] transition-colors text-xs">
            <div className="w-4 h-4 bg-[#5865f2] rounded-full flex items-center justify-center">
              <span className="text-white text-xs">👍</span>
            </div>
            <span>2</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-[#dcddde] transition-colors text-xs">
            <Reply className="h-3 w-3" />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function TwitterPreview({ data }) {
  const { metrics, isUpdating } = useEngagementMetrics('Twitter/X', 'medium')

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
      {/* Tweet Header */}
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">X</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">Your Account</p>
            <p className="text-sm text-muted-foreground">@youraccount · 2h</p>
          </div>
        </div>
        
        <p className="text-foreground mb-3">Check out this amazing content!</p>

        {/* Link Preview Card */}
        <div className="border border-border rounded-2xl overflow-hidden">
          {data.image && (
            <div className="relative w-full h-48">
              <Image
                src={data.image}
                alt="Preview"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          )}
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-1">
              {data.url ? new URL(data.url).hostname : 'example.com'}
            </p>
            <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
              {data.title || 'Your Title Here'}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {data.description || 'Your description will appear here...'}
            </p>
          </div>
        </div>

        {/* Enhanced Engagement with Real-time Metrics */}
        <div className="flex items-center justify-between mt-4 text-muted-foreground">
          <button className="flex items-center space-x-2 hover:text-primary transition-colors group">
            <MessageCircle className="h-4 w-4" />
            <span className={`text-sm transition-all ${isUpdating ? 'text-primary' : ''}`}>
              {formatNumber(metrics.comments)}
            </span>
          </button>
          <button className="flex items-center space-x-2 hover:text-success transition-colors group">
            <Repeat2 className="h-4 w-4" />
            <span className={`text-sm transition-all ${isUpdating ? 'text-success' : ''}`}>
              {formatNumber(metrics.shares)}
            </span>
          </button>
          <button className="flex items-center space-x-2 hover:text-destructive transition-colors group">
            <Heart className="h-4 w-4" />
            <span className={`text-sm transition-all ${isUpdating ? 'text-destructive' : ''}`}>
              {formatNumber(metrics.likes)}
            </span>
          </button>
          <button className="flex items-center space-x-2 hover:text-primary transition-colors group">
            <Share className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Views Counter */}
        <div className="mt-2 text-xs text-muted-foreground">
          <span className={`transition-all ${isUpdating ? 'text-primary' : ''}`}>
            {formatNumber(metrics.views)} views
          </span>
          {isUpdating && (
            <span className="ml-2 inline-flex items-center">
              <div className="w-1 h-1 bg-success rounded-full animate-pulse"></div>
              <span className="ml-1 text-success">Live</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function LinkedInPreview({ data }) {
  const { metrics, isUpdating } = useEngagementMetrics('LinkedIn', 'medium')

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
      {/* Post Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">LI</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">Your Name</p>
            <p className="text-sm text-muted-foreground">Your Title • 2h</p>
          </div>
        </div>
        <p className="mt-3 text-foreground">Excited to share this with my network!</p>
      </div>

      {/* Link Preview */}
      <div className="border-t border-border">
        {data.image && (
          <div className="relative w-full h-48">
            <Image
              src={data.image}
              alt="Preview"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
            {data.title || 'Your Title Here'}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {data.description || 'Your description will appear here...'}
          </p>
          <p className="text-xs text-muted-foreground">
            {data.url ? new URL(data.url).hostname : 'example.com'}
          </p>
        </div>
      </div>

      {/* Enhanced Engagement with Real-time Metrics */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-muted-foreground">
          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span className={`text-sm transition-all ${isUpdating ? 'text-primary' : ''}`}>
              {formatNumber(metrics.likes)}
            </span>
          </button>
          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className={`text-sm transition-all ${isUpdating ? 'text-primary' : ''}`}>
              {formatNumber(metrics.comments)}
            </span>
          </button>
          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Share className="h-4 w-4" />
            <span className={`text-sm transition-all ${isUpdating ? 'text-primary' : ''}`}>
              {formatNumber(metrics.shares)}
            </span>
          </button>
        </div>

        {/* Professional Engagement Stats */}
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className={`transition-all ${isUpdating ? 'text-primary' : ''}`}>
              {formatNumber(metrics.views)} profile views
            </span>
            <span>12 connections engaged</span>
            {isUpdating && (
              <span className="inline-flex items-center text-success">
                <div className="w-1 h-1 bg-success rounded-full animate-pulse mr-1"></div>
                Live
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function BlueskyPreview({ data }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm max-w-md">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-10 h-10 bg-[#0085ff] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">YU</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline space-x-1">
              <p className="font-semibold text-foreground text-sm">Your Name</p>
              <p className="text-muted-foreground text-sm">@youraccount.bsky.social</p>
            </div>
            <p className="text-muted-foreground text-xs">2h</p>
          </div>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <p className="text-foreground mb-3 text-sm">Check out this amazing content! 🚀</p>

        {/* Link Card */}
        <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
          {data.image && (
            <div className="relative w-full h-40">
              <Image
                src={data.image}
                alt="Preview"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          )}
          <div className="p-3">
            <p className="text-xs text-muted-foreground mb-1">
              {data.url ? new URL(data.url).hostname : 'example.com'}
            </p>
            <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
              {data.title || 'Your Title Here'}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {data.description || 'Your description will appear here...'}
            </p>
          </div>
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between mt-4 text-muted-foreground">
          <button className="flex items-center space-x-1 hover:text-[#0085ff] transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">Reply</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-[#0085ff] transition-colors">
            <Repeat2 className="h-4 w-4" />
            <span className="text-sm">Repost</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-destructive transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-[#0085ff] transition-colors">
            <Share className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Bluesky-specific engagement stats */}
        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
          <span>12 replies</span>
          <span>8 reposts</span>
          <span>24 likes</span>
        </div>
      </div>
    </div>
  )
}

export default PreviewPanel