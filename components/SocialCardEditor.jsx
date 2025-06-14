"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from './Navigation'
import EditPanel from './EditPanel'
import PreviewPanel from './PreviewPanel'
import CodePanel from './CodePanel'
import AIScorePanel from './AIScorePanel'
import { Button } from './ui/button'
import { fetchMetadata, validateUrl } from '../app/actions/metaActions'
import { Search, Edit, Eye, Code, Bot, Sparkles, AlertCircle, CheckCircle } from 'lucide-react'

function SocialCardEditor() {
  const [dark, setDark] = useState(false)
  const [activeTab, setActiveTab] = useState('edit')
  const [metaData, setMetaData] = useState(null)
  const [customData, setCustomData] = useState({
    title: '',
    description: '',
    image: null,
    url: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [aiScore, setAiScore] = useState(null)
  const [inputUrl, setInputUrl] = useState('')
  const [debugInfo, setDebugInfo] = useState(null)

  const initTheme = () => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("dark")
      
      if (storedTheme === null) {
        const systemPrefersDark = window.matchMedia && 
          window.matchMedia('(prefers-color-scheme: dark)').matches
        
        setDark(systemPrefersDark)
        localStorage.setItem("dark", systemPrefersDark)
        
        // Apply theme to document
        if (systemPrefersDark) {
          document.documentElement.classList.add('dark')
        }
      } else {
        const isDark = storedTheme === "true"
        setDark(isDark)
        
        // Apply theme to document
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }
  }
  
  const switchTheme = () => {
    const newDarkMode = !dark
    setDark(newDarkMode)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem("dark", newDarkMode)
      
      // Apply theme to document
      if (newDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const fetchMeta = async() => {
    console.log('🚀 Starting URL submission process');
    
    // Client-side validation first
    const validation = validateUrl(inputUrl);
    if (!validation.valid) {
      setError(validation.error);
      console.error('❌ Client-side validation failed:', validation.error);
      return;
    }
    
    setLoading(true)
    setError(null)
    setDebugInfo({
      timestamp: new Date().toISOString(),
      originalUrl: inputUrl,
      userAgent: navigator.userAgent,
      browserInfo: {
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
      }
    })
    
    console.log('🔍 Debug Info:', {
      timestamp: new Date().toISOString(),
      originalUrl: inputUrl,
      userAgent: navigator.userAgent,
      networkStatus: navigator.onLine ? 'Online' : 'Offline'
    });
    
    try {
      console.log('📡 Calling fetchMetadata server action...');
      const result = await fetchMetadata(inputUrl.trim())
      
      console.log('📊 Server response:', result);
      
      if (result.error) {
        console.error('❌ Server returned error:', result.error);
        setError(result.error)
        setMetaData(null)
        setCustomData({
          title: '',
          description: '',
          image: null,
          url: inputUrl.trim()
        })
      } else if (result.data) {
        console.log('✅ Metadata received successfully');
        setMetaData(result.data)
        setCustomData({
          title: result.data.title || '',
          description: result.data.description || '',
          image: result.data.image?.url || null,
          url: result.data.url || inputUrl.trim()
        })
        calculateAIScore(result.data)
        setError(null)
      }
    } catch (err) {
      console.error('💥 Client-side error:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      setError(`Client error: ${err.message || "Unknown error"}. Please check the browser console for more details.`)
    } finally {
      setLoading(false)
    }
  }

  const calculateAIScore = (data) => {
    // AI scoring algorithm
    let score = 0
    let recommendations = []

    // Title scoring (30 points)
    if (data.title) {
      const titleLength = data.title.length
      if (titleLength >= 30 && titleLength <= 60) {
        score += 30
      } else if (titleLength >= 20 && titleLength <= 70) {
        score += 20
        recommendations.push("Consider optimizing title length to 30-60 characters for better engagement")
      } else {
        score += 10
        recommendations.push("Title should be 30-60 characters for optimal social media performance")
      }
    } else {
      recommendations.push("Add a compelling title to improve click-through rates")
    }

    // Description scoring (25 points)
    if (data.description) {
      const descLength = data.description.length
      if (descLength >= 120 && descLength <= 160) {
        score += 25
      } else if (descLength >= 100 && descLength <= 200) {
        score += 18
        recommendations.push("Optimize description length to 120-160 characters")
      } else {
        score += 10
        recommendations.push("Description should be 120-160 characters for best results")
      }
    } else {
      recommendations.push("Add a compelling description to increase engagement")
    }

    // Image scoring (25 points)
    if (data.image?.url) {
      score += 25
    } else {
      recommendations.push("Add a high-quality image to improve visual appeal and engagement")
    }

    // Site name scoring (10 points)
    if (data.site_name) {
      score += 10
    } else {
      recommendations.push("Add site name for better brand recognition")
    }

    // URL structure scoring (10 points)
    if (data.url && data.url.includes('https://')) {
      score += 10
    } else {
      recommendations.push("Use HTTPS for better security and trust")
    }

    setAiScore({
      score: Math.min(score, 100),
      recommendations,
      breakdown: {
        title: data.title ? (data.title.length >= 30 && data.title.length <= 60 ? 30 : 20) : 0,
        description: data.description ? (data.description.length >= 120 && data.description.length <= 160 ? 25 : 18) : 0,
        image: data.image?.url ? 25 : 0,
        siteName: data.site_name ? 10 : 0,
        url: data.url && data.url.includes('https://') ? 10 : 0
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMeta()
  }

  const updateCustomData = (field, value) => {
    const newData = { ...customData, [field]: value }
    setCustomData(newData)
    
    // Recalculate AI score with custom data
    if (metaData) {
      const updatedMetaData = { ...metaData, [field]: value }
      calculateAIScore(updatedMetaData)
    }
  }

  useEffect(() => {
    initTheme()
    
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e) => {
        if (localStorage.getItem("dark") === null) {
          setDark(e.matches)
          localStorage.setItem("dark", e.matches)
          
          // Apply theme to document
          if (e.matches) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      }
      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange)
      } else {
        mediaQuery.addListener(handleChange)
      }
      
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange)
        } else {
          mediaQuery.removeListener(handleChange)
        }
      }
    }
  }, [])

  const tabs = [
    { id: 'edit', label: 'Edit', icon: Edit },
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'code', label: 'Copy', icon: Code },
    { id: 'ai-score', label: 'AI Score', icon: Bot }
  ]

  return (
    <div className="w-full min-h-screen bg-background">
      <div className='w-full font-Inter min-h-screen'>
        {/* Navigation */}
        <Navigation dark={dark} switchTheme={switchTheme} />

        {/* Hero Section with new background */}
        <div className="relative overflow-hidden bg-gradient-to-br from-hero-bg via-surface to-surface-secondary">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Main Content */}
          <div className='flex justify-center px-6 pt-16 pb-24'>
            <div className='w-full max-w-7xl'>
              {/* Hero Section */}
              <div className='text-center mb-16'>
                <motion.div
                  transition={{ duration: 0.6}}
                  initial={{y:-20, opacity:0}}
                  animate={{y: 0, opacity:1}}
                  className="inline-flex items-center rounded-full border border-border bg-surface/50 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground mb-8"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI-Powered Social Media Optimization
                </motion.div>
                
                <motion.h1
                  transition={{ duration: 0.6, delay: 0.1}}
                  initial={{y:-20, opacity:0}}
                  animate={{y: 0, opacity:1}}
                  className='hero-text font-bold text-5xl md:text-7xl leading-tight mb-4'
                >
                  Optimize Your
                </motion.h1>
                <motion.h1
                  transition={{ duration: 0.6, delay: 0.2}}
                  initial={{y:20, opacity:0}}
                  animate={{y: 0, opacity:1}}
                  className='hero-accent font-bold text-5xl md:text-7xl leading-tight mb-6'
                >
                  Social Previews
                </motion.h1>
                <motion.p
                  transition={{ duration: 0.6, delay: 0.4}}
                  initial={{opacity:0}}
                  animate={{opacity:1}}
                  className='text-muted-foreground text-xl max-w-2xl mx-auto mb-8'
                >
                  Generate perfect social media cards for Twitter, Facebook, LinkedIn, and more. 
                  Get AI-powered optimization scores and SEO recommendations.
                </motion.p>
              </div>

              {/* URL Input */}
              <motion.div 
                transition={{ duration: 0.8, delay: 0.6}}
                initial={{opacity:0, y: 20}}
                animate={{opacity:1, y: 0}}
                className='flex justify-center mb-16'
              >
                <div className='w-full max-w-2xl'>
                  <form onSubmit={handleSubmit} className="flex gap-4">
                    <input 
                      type="text" 
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder='Enter your URL (e.g., https://github.com/bdougie/contributor.info)' 
                      className='flex-1 bg-surface/80 backdrop-blur-sm border border-border h-14 px-6 outline-none rounded-xl text-foreground placeholder-muted-foreground text-lg shadow-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all'
                    />
                    <Button 
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className='px-8 rounded-xl font-semibold shadow-lg min-w-[140px] h-14'
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </form>
                  
                  {/* Network Status Indicator */}
                  <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      {navigator.onLine ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span>Offline</span>
                        </>
                      )}
                    </div>
                    {debugInfo && (
                      <div className="text-xs">
                        Last attempt: {new Date(debugInfo.timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Error Display with Enhanced Information */}
              {error && (
                <div className="flex justify-center mb-8">
                  <div className="bg-destructive/10 backdrop-blur-sm border border-destructive/20 text-destructive rounded-xl p-6 max-w-2xl w-full">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Unable to Fetch URL</h3>
                        <p className="mb-4">{error}</p>
                        
                        {/* Troubleshooting Tips */}
                        <div className="bg-destructive/5 rounded-lg p-4 mt-4">
                          <h4 className="font-semibold mb-2">Troubleshooting Tips:</h4>
                          <ul className="text-sm space-y-1 list-disc list-inside">
                            <li>Verify the URL is correct and accessible in your browser</li>
                            <li>Check if the website is currently online</li>
                            <li>Some websites block automated requests</li>
                            <li>Try using the full URL with https://</li>
                            <li>Check your internet connection</li>
                          </ul>
                        </div>
                        
                        {debugInfo && (
                          <details className="mt-4">
                            <summary className="cursor-pointer text-sm font-medium">Debug Information</summary>
                            <pre className="text-xs mt-2 p-2 bg-destructive/5 rounded overflow-x-auto">
                              {JSON.stringify(debugInfo, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Interface */}
              {(metaData || customData.title || error) && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-2xl overflow-hidden"
                >
                  {/* Tab Navigation */}
                  <div className="border-b border-border bg-surface/50">
                    <nav className="flex">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                              activeTab === tab.id
                                ? 'text-primary border-b-2 border-primary bg-primary/5'
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                            }`}
                          >
                            <IconComponent className="mr-2 h-4 w-4" />
                            {tab.label}
                            {tab.id === 'ai-score' && aiScore && (
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                                aiScore.score >= 80 ? 'bg-success/10 text-success border border-success/20' :
                                aiScore.score >= 60 ? 'bg-warning/10 text-warning border border-warning/20' :
                                'bg-destructive/10 text-destructive border border-destructive/20'
                              }`}>
                                {aiScore.score}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6 bg-card">
                    {activeTab === 'edit' && (
                      <EditPanel 
                        metaData={metaData}
                        customData={customData}
                        updateCustomData={updateCustomData}
                      />
                    )}
                    
                    {activeTab === 'preview' && (
                      <PreviewPanel 
                        data={{ ...metaData, ...customData }}
                      />
                    )}
                    
                    {activeTab === 'code' && (
                      <CodePanel 
                        data={{ ...metaData, ...customData }}
                      />
                    )}
                    
                    {activeTab === 'ai-score' && (
                      <AIScorePanel 
                        aiScore={aiScore}
                        data={{ ...metaData, ...customData }}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialCardEditor