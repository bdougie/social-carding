"use client"

import Image from 'next/image'
import { Heart, MessageCircle, Share, Repeat2, ThumbsUp, MoreHorizontal, Hash, AtSign, Reply, Plus } from 'lucide-react'

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
        <p className="text-muted-foreground">See how your content will appear across different social media platforms.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {platforms.map((platform, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
              {platform.name}
            </h3>
            {platform.component}
          </div>
        ))}
      </div>
    </div>
  )
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

        {/* Engagement */}
        <div className="flex items-center justify-between mt-4 text-muted-foreground">
          <button className="flex items-center space-x-2 hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">Reply</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-success transition-colors">
            <Repeat2 className="h-4 w-4" />
            <span className="text-sm">Retweet</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-destructive transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-primary transition-colors">
            <Share className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function LinkedInPreview({ data }) {
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

      {/* Engagement */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-muted-foreground">
          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Share className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </button>
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