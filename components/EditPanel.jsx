"use client"

import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faUpload, faCrop } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

function EditPanel({ metaData, customData, updateCustomData }) {
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setImagePreview(imageUrl)
        updateCustomData('image', imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const getCharacterCount = (text, max) => {
    const count = text?.length || 0
    const color = count > max ? 'text-red-500' : count > max * 0.9 ? 'text-yellow-500' : 'text-green-500'
    return { count, color }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Customize Your Social Card</h2>
        <p className="text-gray-600">Modify the title, description, and image to optimize visibility and engagement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Text Fields */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <div className="relative">
              <textarea
                value={customData.title}
                onChange={(e) => updateCustomData('title', e.target.value)}
                placeholder="Enter a compelling title..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="2"
              />
              <div className="absolute bottom-2 right-2 text-xs">
                <span className={getCharacterCount(customData.title, 60).color}>
                  {getCharacterCount(customData.title, 60).count}/60
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 30-60 characters for optimal engagement
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <div className="relative">
              <textarea
                value={customData.description}
                onChange={(e) => updateCustomData('description', e.target.value)}
                placeholder="Write a compelling description..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="4"
              />
              <div className="absolute bottom-2 right-2 text-xs">
                <span className={getCharacterCount(customData.description, 160).color}>
                  {getCharacterCount(customData.description, 160).count}/160
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 120-160 characters for best results
            </p>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              value={customData.url}
              onChange={(e) => updateCustomData('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image
            </label>
            
            {/* Image Preview */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              {(customData.image || imagePreview) ? (
                <div className="space-y-4">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview || customData.image}
                      alt="Preview"
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <FontAwesomeIcon icon={faImage} className="text-4xl text-gray-400" />
                  <div>
                    <p className="text-gray-600 mb-2">Upload an image for your social card</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faUpload} className="mr-2" />
                      Upload Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <p className="text-xs text-gray-500 mt-2">
              Recommended: 1200x630px for optimal display across all platforms
            </p>
          </div>

          {/* Platform Dimensions Guide */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-3">Platform Recommendations</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Facebook/LinkedIn:</span>
                <span>1200x630px</span>
              </div>
              <div className="flex justify-between">
                <span>Twitter:</span>
                <span>1200x675px</span>
              </div>
              <div className="flex justify-between">
                <span>Instagram:</span>
                <span>1080x1080px</span>
              </div>
              <div className="flex justify-between">
                <span>Pinterest:</span>
                <span>1000x1500px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPanel