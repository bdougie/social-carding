"use client"

import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMoon, 
  faSun, 
  faDownload, 
  faMagnifyingGlass,
  faEdit,
  faCopy,
  faEye,
  faRobot,
  faImage,
  faCode,
  faBullseye
} from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion"
import EditPanel from './EditPanel'
import PreviewPanel from './PreviewPanel'
import CodePanel from './CodePanel'
import AIScorePanel from './AIScorePanel'
import { fetchMetadata } from '../app/actions/metaActions'

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
  const urlRef = useRef("")

  const initTheme = () => {
    const storedTheme = localStorage.getItem("dark")
    
    if (storedTheme === null) {
      const systemPrefersDark = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches
      
      setDark(systemPrefersDark)
      localStorage.setItem("dark", systemPrefersDark)
    } else {
      setDark(storedTheme === "true")
    }
  }
  
  const switchTheme = () => {
    const newDarkMode = !dark
    setDark(newDarkMode)
    localStorage.setItem("dark", newDarkMode)
  }

  const fetchMeta = async() => {
    if (!urlRef.current.value) {
      console.error('URL is empty')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await fetchMetadata(urlRef.current.value)
      
      if (result.error) {
        setError(result.error)
      } else if (result.data && Object.keys(result.data).length > 0) {
        setMetaData(result.data)
        setCustomData({
          title: result.data.title || '',
          description: result.data.description || '',
          image: result.data.image?.url || null,
          url: urlRef.current.value
        })
        calculateAIScore(result.data)
      } else {
        setError("No metadata found for this URL. Please check that the URL is correct and accessible.")
      }
    } catch (err) {
      setError(`Failed to fetch metadata: ${err.message || "Unknown error"}`)
      console.error('Fetch Error:', err)
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
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (localStorage.getItem("dark") === null) {
        setDark(e.matches)
        localStorage.setItem("dark", e.matches)
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
  }, [])

  const tabs = [
    { id: 'edit', label: 'Edit', icon: faEdit },
    { id: 'preview', label: 'Preview', icon: faEye },
    { id: 'code', label: 'Copy', icon: faCode },
    { id: 'ai-score', label: 'AI Score', icon: faRobot }
  ]

  return (
    <div className={`w-full min-h-screen ${dark ? "dark" : ""}`}>
      <div className='w-full font-Inter dark:bg-gray-900 min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700'>
        {/* Header */}
        <div className='flex justify-between items-center p-6'>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faBullseye} className="text-purple-600 text-xl" />
            </div>
            <h1 className="text-white text-2xl font-bold">SocialCarding</h1>
          </div>
          
          <div className='flex items-center space-x-4'>
            <div className='flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1'>
              <FontAwesomeIcon 
                icon={faMoon} 
                onClick={switchTheme} 
                className={`text-lg p-2 hover:text-gray-300 transition cursor-pointer duration-300 ${!dark ? "" : "bg-yellow-400 text-gray-900"} rounded-full`}
              />
              <FontAwesomeIcon 
                icon={faSun} 
                onClick={switchTheme} 
                className={`text-lg p-2 hover:text-gray-300 cursor-pointer transition duration-300 ${dark ? "" : "bg-yellow-400 text-gray-900"} rounded-full`}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex justify-center px-6'>
          <div className='w-full max-w-7xl'>
            {/* Hero Section */}
            <div className='text-center mb-12'>
              <motion.h1
                transition={{ duration: 0.6}}
                initial={{y:-20, opacity:0}}
                animate={{y: 0, opacity:1}}
                className='text-white font-bold text-5xl md:text-7xl leading-tight mb-4'
              >
                Optimize Your
              </motion.h1>
              <motion.h1
                transition={{ duration: 0.6, delay: 0.2}}
                initial={{y:20, opacity:0}}
                animate={{y: 0, opacity:1}}
                className='text-white font-bold text-5xl md:text-7xl leading-tight mb-6'
              >
                Social Previews
              </motion.h1>
              <motion.p
                transition={{ duration: 0.6, delay: 0.4}}
                initial={{opacity:0}}
                animate={{opacity:1}}
                className='text-white/80 text-xl max-w-2xl mx-auto mb-8'
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
              className='flex justify-center mb-12'
            >
              <div className='w-full max-w-2xl'>
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <input 
                    ref={urlRef} 
                    type="text" 
                    placeholder='Enter your URL (e.g., https://example.com)' 
                    className='flex-1 bg-white/90 backdrop-blur-sm border-0 h-14 px-6 outline-none rounded-xl text-gray-800 placeholder-gray-500 text-lg shadow-lg'
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className='flex items-center justify-center bg-white text-purple-600 px-8 rounded-xl font-semibold transition duration-300 hover:bg-gray-100 disabled:opacity-50 shadow-lg min-w-[140px]'
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                        Analyze
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Error Display */}
            {error && (
              <div className="flex justify-center mb-8">
                <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-100 rounded-xl p-6 max-w-2xl w-full">
                  <h3 className="text-lg font-semibold mb-2">Error</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Main Interface */}
            {(metaData || customData.title) && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                        {tab.label}
                        {tab.id === 'ai-score' && aiScore && (
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                            aiScore.score >= 80 ? 'bg-green-100 text-green-800' :
                            aiScore.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {aiScore.score}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
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
  )
}

export default SocialCardEditor