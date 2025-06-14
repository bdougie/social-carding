"use client"

import Image from 'next/image'
import { Heart, MessageCircle, Share, Repeat2, ThumbsUp, MoreHorizontal } from 'lucide-react'

function PreviewPanel({ data }) {
  const platforms = [
    {
      name: 'Facebook',
      component: <FacebookPreview data={data} />
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
      name: 'Instagram',
      component: <InstagramPreview data={data} />
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

function FacebookPreview({ data }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
      {/* Post Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">FB</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">Your Page</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
      </div>

      {/* Link Preview */}
      <div className="border border-border">
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
        <div className="p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
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
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center space-x-4">
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

function InstagramPreview({ data }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm max-w-sm mx-auto">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">IG</span>
          </div>
          <p className="font-semibold text-foreground">youraccount</p>
        </div>
        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Image */}
      <div className="relative w-full h-64">
        {data.image ? (
          <Image
            src={data.image}
            alt="Preview"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Your image here</span>
          </div>
        )}
      </div>

      {/* Engagement */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Heart className="h-6 w-6 hover:text-destructive cursor-pointer transition-colors" />
            <MessageCircle className="h-6 w-6 hover:text-muted-foreground cursor-pointer transition-colors" />
            <Share className="h-6 w-6 hover:text-muted-foreground cursor-pointer transition-colors" />
          </div>
        </div>
        
        <p className="text-sm text-foreground">
          <span className="font-semibold">youraccount</span>{' '}
          {data.title || 'Your caption here...'} 
          {data.description && (
            <span className="text-muted-foreground"> {data.description}</span>
          )}
        </p>
      </div>
    </div>
  )
}

export default PreviewPanel