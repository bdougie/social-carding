"use client"

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHeart, 
  faComment, 
  faShare, 
  faRetweet,
  faThumbsUp,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons'

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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Live Preview</h2>
        <p className="text-gray-600">See how your content will appear across different social media platforms.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {platforms.map((platform, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
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
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">FB</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Your Page</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
      </div>

      {/* Link Preview */}
      <div className="border border-gray-200">
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
        <div className="p-4 bg-gray-50">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {data.url ? new URL(data.url).hostname : 'example.com'}
          </p>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {data.title || 'Your Title Here'}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {data.description || 'Your description will appear here...'}
          </p>
        </div>
      </div>

      {/* Engagement */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FontAwesomeIcon icon={faComment} />
              <span className="text-sm">Comment</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FontAwesomeIcon icon={faShare} />
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
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Tweet Header */}
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">X</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Your Account</p>
            <p className="text-sm text-gray-500">@youraccount · 2h</p>
          </div>
        </div>
        
        <p className="text-gray-900 mb-3">Check out this amazing content!</p>

        {/* Link Preview Card */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
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
            <p className="text-sm text-gray-500 mb-1">
              {data.url ? new URL(data.url).hostname : 'example.com'}
            </p>
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {data.title || 'Your Title Here'}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {data.description || 'Your description will appear here...'}
            </p>
          </div>
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between mt-4 text-gray-500">
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <FontAwesomeIcon icon={faComment} />
            <span className="text-sm">Reply</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-500">
            <FontAwesomeIcon icon={faRetweet} />
            <span className="text-sm">Retweet</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-red-500">
            <FontAwesomeIcon icon={faHeart} />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <FontAwesomeIcon icon={faShare} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function LinkedInPreview({ data }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">LI</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Your Name</p>
            <p className="text-sm text-gray-500">Your Title • 2h</p>
          </div>
        </div>
        <p className="mt-3 text-gray-900">Excited to share this with my network!</p>
      </div>

      {/* Link Preview */}
      <div className="border-t border-gray-200">
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
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {data.title || 'Your Title Here'}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {data.description || 'Your description will appear here...'}
          </p>
          <p className="text-xs text-gray-500">
            {data.url ? new URL(data.url).hostname : 'example.com'}
          </p>
        </div>
      </div>

      {/* Engagement */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-gray-500">
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <FontAwesomeIcon icon={faThumbsUp} />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <FontAwesomeIcon icon={faComment} />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <FontAwesomeIcon icon={faShare} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function InstagramPreview({ data }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm max-w-sm mx-auto">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">IG</span>
          </div>
          <p className="font-semibold text-gray-900">youraccount</p>
        </div>
        <FontAwesomeIcon icon={faEllipsisH} className="text-gray-500" />
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
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Your image here</span>
          </div>
        )}
      </div>

      {/* Engagement */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faHeart} className="text-xl hover:text-red-500 cursor-pointer" />
            <FontAwesomeIcon icon={faComment} className="text-xl hover:text-gray-600 cursor-pointer" />
            <FontAwesomeIcon icon={faShare} className="text-xl hover:text-gray-600 cursor-pointer" />
          </div>
        </div>
        
        <p className="text-sm">
          <span className="font-semibold">youraccount</span>{' '}
          {data.title || 'Your caption here...'} 
          {data.description && (
            <span className="text-gray-600"> {data.description}</span>
          )}
        </p>
      </div>
    </div>
  )
}

export default PreviewPanel