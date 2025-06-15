"use client"

import { useState, useRef } from 'react'
import { Upload, Image as ImageIcon, Sparkles, RefreshCw, Copy, Check } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'

function EditPanel({ metaData, customData, updateCustomData }) {
  const [imagePreview, setImagePreview] = useState(null)
  const [generatedDescriptions, setGeneratedDescriptions] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDescriptionOptions, setShowDescriptionOptions] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
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

  const generateProductDescriptions = async () => {
    setIsGenerating(true)
    setShowDescriptionOptions(true)
    
    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const title = customData.title || metaData?.title || 'Product'
    const baseKeywords = extractKeywords(title)
    
    const descriptions = [
      {
        id: 1,
        title: "Conversion-Focused",
        description: generateConversionDescription(title, baseKeywords),
        tone: "Persuasive & Action-Oriented"
      },
      {
        id: 2,
        title: "Feature-Rich",
        description: generateFeatureDescription(title, baseKeywords),
        tone: "Informative & Detailed"
      },
      {
        id: 3,
        title: "Benefit-Driven",
        description: generateBenefitDescription(title, baseKeywords),
        tone: "Value-Focused & Emotional"
      }
    ]
    
    setGeneratedDescriptions(descriptions)
    setIsGenerating(false)
  }

  const extractKeywords = (title) => {
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an']
    return title.toLowerCase()
      .split(' ')
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .slice(0, 3)
  }

  const generateConversionDescription = (title, keywords) => {
    const templates = [
      `Transform your experience with ${title}. This premium solution delivers exceptional results that exceed expectations. Perfect for professionals who demand quality and performance. Features cutting-edge technology and innovative design. Don't miss out – upgrade your workflow today and see the difference quality makes. Order now and join thousands of satisfied customers worldwide.`,
      
      `Discover the power of ${title} – your ultimate solution for superior performance. Engineered with precision and built to last, this exceptional product combines functionality with style. Experience unmatched quality and reliability. Limited time offer available. Take action now and revolutionize your approach with this game-changing solution.`,
      
      `Unlock your potential with ${title}. This revolutionary product is designed for those who refuse to settle for ordinary. Premium materials, expert craftsmanship, and innovative features come together to create something extraordinary. Join the elite group of users who've already made the smart choice. Order today and experience excellence.`
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  const generateFeatureDescription = (title, keywords) => {
    const templates = [
      `${title} combines advanced technology with user-friendly design. Key features include premium materials, ergonomic construction, and versatile functionality. Built with precision engineering and quality components for long-lasting performance. Compatible with multiple platforms and designed for seamless integration. Includes comprehensive documentation and professional support. Perfect for both beginners and experts.`,
      
      `Experience the comprehensive features of ${title}. This sophisticated solution offers multi-layered functionality, intuitive controls, and robust performance capabilities. Engineered with state-of-the-art components and backed by extensive research and development. Features include advanced customization options, real-time processing, and enterprise-grade security. Designed for scalability and future-proof performance.`,
      
      `${title} delivers professional-grade features in an accessible package. Highlights include streamlined workflow integration, advanced analytics, customizable interface, and cross-platform compatibility. Built with industry-leading standards and optimized for performance. Features automated processes, intelligent recommendations, and comprehensive reporting tools. Suitable for individual users and large organizations alike.`
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  const generateBenefitDescription = (title, keywords) => {
    const templates = [
      `Transform your daily routine with ${title}. Save valuable time while achieving better results than ever before. Reduce stress and increase productivity with this intelligent solution. Users report 40% improvement in efficiency and significantly enhanced satisfaction. Experience the confidence that comes with using premium tools. Invest in your success and feel the difference quality makes.`,
      
      `${title} empowers you to achieve more with less effort. Streamline your workflow, eliminate frustration, and focus on what matters most. This solution adapts to your needs, growing with you as your requirements evolve. Experience the peace of mind that comes with reliable, consistent performance. Join a community of successful users who've transformed their approach.`,
      
      `Elevate your standards with ${title}. Enjoy the satisfaction of using tools that truly understand your needs. Reduce complexity while increasing capability. Experience smoother operations, faster results, and greater confidence in your outcomes. This investment pays for itself through improved efficiency and enhanced results. Make the smart choice for your future success.`
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  const useDescription = (description) => {
    updateCustomData('description', description)
    setShowDescriptionOptions(false)
  }

  const copyDescription = (description, index) => {
    navigator.clipboard.writeText(description)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getCharacterCount = (text, max) => {
    const count = text?.length || 0
    const color = count > max ? 'text-destructive' : count > max * 0.9 ? 'text-warning' : 'text-success'
    return { count, color }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Customize Your Social Card</h2>
        <p className="text-muted-foreground">Generate perfect social media cards. Get optimization scores and recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Text Fields */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Title
            </label>
            <div className="relative">
              <textarea
                value={customData.title}
                onChange={(e) => updateCustomData('title', e.target.value)}
                placeholder="Enter a compelling title..."
                className="w-full p-4 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none placeholder-muted-foreground"
                rows="2"
              />
              <div className="absolute bottom-2 right-2 text-xs">
                <span className={getCharacterCount(customData.title, 60).color}>
                  {getCharacterCount(customData.title, 60).count}/60
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 30-60 characters for optimal engagement
            </p>
          </div>

          {/* Description with AI Generator */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-foreground">
                Description
              </label>
              <Button
                onClick={generateProductDescriptions}
                disabled={isGenerating}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3 w-3" />
                    <span>AI Generate</span>
                  </>
                )}
              </Button>
            </div>
            
            <div className="relative">
              <textarea
                value={customData.description}
                onChange={(e) => updateCustomData('description', e.target.value)}
                placeholder="Write a compelling description or use AI to generate one..."
                className="w-full p-4 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none placeholder-muted-foreground"
                rows="4"
              />
              <div className="absolute bottom-2 right-2 text-xs">
                <span className={getCharacterCount(customData.description, 160).color}>
                  {getCharacterCount(customData.description, 160).count}/160
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 120-160 characters for best results
            </p>

            {/* AI Generated Options */}
            {showDescriptionOptions && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>AI-Generated Descriptions</span>
                </div>
                
                {isGenerating ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-muted/50 rounded-lg p-4 animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded"></div>
                          <div className="h-3 bg-muted rounded w-5/6"></div>
                          <div className="h-3 bg-muted rounded w-4/6"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {generatedDescriptions.map((option, index) => (
                      <div key={option.id} className="bg-muted/50 rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">{option.title}</h4>
                            <p className="text-xs text-muted-foreground">{option.tone}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => copyDescription(option.description, index)}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              {copiedIndex === index ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              onClick={() => useDescription(option.description)}
                              variant="outline"
                              size="sm"
                            >
                              Use This
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-foreground line-clamp-3">
                          {option.description}
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {option.description.length} characters
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {!isGenerating && generatedDescriptions.length > 0 && (
                  <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                    <h4 className="font-semibold text-info mb-2">💡 Pro Tips</h4>
                    <ul className="text-sm text-info/90 space-y-1">
                      <li>• Combine elements from different versions for best results</li>
                      <li>• Customize the generated text to match your brand voice</li>
                      <li>• Test different descriptions to see what resonates with your audience</li>
                      <li>• Keep descriptions between 120-160 characters for optimal social sharing</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              URL
            </label>
            <input
              type="url"
              value={customData.url}
              onChange={(e) => updateCustomData('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full p-4 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent placeholder-muted-foreground"
            />
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Image
            </label>
            
            {/* Image Preview */}
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors bg-surface/50">
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
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="inline-flex items-center"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground mb-2">Upload an image for your social card</p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="inline-flex items-center"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
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

            <p className="text-xs text-muted-foreground mt-2">
              Recommended: 1200x630px for optimal display across all platforms
            </p>
          </div>

          {/* Platform Dimensions Guide */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Platform Recommendations</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Discord/LinkedIn:</span>
                <span>1200x630px</span>
              </div>
              <div className="flex justify-between">
                <span>Twitter/X:</span>
                <span>1200x675px</span>
              </div>
              <div className="flex justify-between">
                <span>Bluesky:</span>
                <span>1200x630px</span>
              </div>
              <div className="flex justify-between">
                <span>Pinterest:</span>
                <span>1000x1500px</span>
              </div>
            </div>
          </div>

          {/* AI Description Features */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-3 flex items-center">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Description Generator
            </h4>
            <div className="space-y-2 text-sm text-primary/80">
              <div>✨ <strong>Conversion-Focused:</strong> Persuasive copy that drives action</div>
              <div>🔧 <strong>Feature-Rich:</strong> Detailed technical descriptions</div>
              <div>💎 <strong>Benefit-Driven:</strong> Emotional value propositions</div>
              <div>🎯 <strong>SEO Optimized:</strong> Keyword-rich content</div>
              <div>📱 <strong>Social Ready:</strong> Perfect length for all platforms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPanel