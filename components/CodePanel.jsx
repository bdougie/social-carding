"use client"

import { useState, useEffect } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'

function CodePanel({ data }) {
  const [copiedSection, setCopiedSection] = useState(null)
  const [editableContent, setEditableContent] = useState({})
  const [originalContent, setOriginalContent] = useState({})

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const generateOpenGraphTags = () => {
    return `<!-- Open Graph Meta Tags -->
<meta property="og:title" content="${data.title || 'Your Title Here'}" />
<meta property="og:description" content="${data.description || 'Your description here'}" />
<meta property="og:image" content="${data.image || 'https://example.com/image.jpg'}" />
<meta property="og:url" content="${data.url || 'https://example.com'}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${data.site_name || 'Your Site Name'}" />`
  }

  const generateTwitterTags = () => {
    return `<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${data.title || 'Your Title Here'}" />
<meta name="twitter:description" content="${data.description || 'Your description here'}" />
<meta name="twitter:image" content="${data.image || 'https://example.com/image.jpg'}" />
<meta name="twitter:url" content="${data.url || 'https://example.com'}" />`
  }

  const generateSchemaMarkup = () => {
    return `<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${data.title || 'Your Title Here'}",
  "description": "${data.description || 'Your description here'}",
  "url": "${data.url || 'https://example.com'}",
  "image": "${data.image || 'https://example.com/image.jpg'}",
  "publisher": {
    "@type": "Organization",
    "name": "${data.site_name || 'Your Site Name'}"
  }
}
</script>`
  }

  const generateAllTags = () => {
    return `${generateOpenGraphTags()}

${generateTwitterTags()}

${generateSchemaMarkup()}`
  }

  const sections = [
    {
      id: 'all',
      title: 'Complete Meta Tags',
      description: 'All meta tags combined for easy copy-paste',
      code: generateAllTags()
    },
    {
      id: 'og',
      title: 'Open Graph Tags',
      description: 'For Facebook, LinkedIn, and other platforms',
      code: generateOpenGraphTags()
    },
    {
      id: 'twitter',
      title: 'Twitter Card Tags',
      description: 'Optimized for Twitter/X platform',
      code: generateTwitterTags()
    },
    {
      id: 'schema',
      title: 'Schema.org Markup',
      description: 'Structured data for search engines',
      code: generateSchemaMarkup()
    }
  ]

  // Initialize editable content when data changes
  useEffect(() => {
    const newEditableContent = {}
    const newOriginalContent = {}
    
    sections.forEach(section => {
      newEditableContent[section.id] = section.code
      newOriginalContent[section.id] = section.code
    })
    
    setEditableContent(newEditableContent)
    setOriginalContent(newOriginalContent)
  }, [data.title, data.description, data.image, data.url, data.site_name])

  const handleContentChange = (sectionId, newContent) => {
    setEditableContent(prev => ({
      ...prev,
      [sectionId]: newContent
    }))
  }

  const revertContent = (sectionId) => {
    setEditableContent(prev => ({
      ...prev,
      [sectionId]: originalContent[sectionId]
    }))
  }

  const hasChanges = (sectionId) => {
    return editableContent[sectionId] !== originalContent[sectionId]
  }

  const copyEditableContent = (sectionId) => {
    const content = editableContent[sectionId] || ''
    navigator.clipboard.writeText(content)
    setCopiedSection(sectionId)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Copy Meta Tags</h2>
        <p className="text-muted-foreground">Generate perfect social media cards. Get optimization scores and recommendations. You can edit the content directly below.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {hasChanges(section.id) && (
                    <Button
                      onClick={() => revertContent(section.id)}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Revert</span>
                    </Button>
                  )}
                  <Button
                    onClick={() => copyEditableContent(section.id)}
                    variant="default"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    {copiedSection === section.id ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="relative">
                <textarea
                  value={editableContent[section.id] || ''}
                  onChange={(e) => handleContentChange(section.id, e.target.value)}
                  className="w-full h-64 p-4 bg-background border border-border text-foreground rounded-lg font-mono text-sm resize-y focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Meta tags will appear here..."
                />
                {hasChanges(section.id) && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-warning/10 border border-warning/20 text-warning px-2 py-1 rounded text-xs font-medium">
                      Modified
                    </div>
                  </div>
                )}
              </div>
              
              {hasChanges(section.id) && (
                <div className="mt-3 p-3 bg-info/10 border border-info/20 rounded-lg">
                  <p className="text-sm text-info">
                    <strong>Note:</strong> You've modified this content. Use the Revert button to restore the original generated tags, or copy your customized version.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Guide */}
      <div className="bg-info/10 border border-info/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-info mb-3">Implementation Guide</h3>
        <div className="space-y-3 text-sm text-info/90">
          <div>
            <strong>1. Edit the meta tags</strong> - Modify the content directly in the text areas above
          </div>
          <div>
            <strong>2. Copy your customized tags</strong> - Use the Copy button to copy your edited version
          </div>
          <div>
            <strong>3. Paste in your HTML</strong> - Add the tags inside the &lt;head&gt; section of your webpage
          </div>
          <div>
            <strong>4. Test your implementation</strong> - Use tools like Facebook Debugger or Twitter Card Validator
          </div>
          <div>
            <strong>5. Revert if needed</strong> - Use the Revert button to restore original generated content
          </div>
        </div>
      </div>

      {/* Testing Tools */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Testing Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://developers.facebook.com/tools/debug/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <h4 className="font-semibold text-foreground">Facebook Debugger</h4>
            <p className="text-sm text-muted-foreground">Test Open Graph tags</p>
          </a>
          <a
            href="https://cards-dev.twitter.com/validator"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <h4 className="font-semibold text-foreground">Twitter Card Validator</h4>
            <p className="text-sm text-muted-foreground">Test Twitter cards</p>
          </a>
          <a
            href="https://www.linkedin.com/post-inspector/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <h4 className="font-semibold text-foreground">LinkedIn Inspector</h4>
            <p className="text-sm text-muted-foreground">Test LinkedIn previews</p>
          </a>
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <h4 className="font-semibold text-foreground">Google Rich Results</h4>
            <p className="text-sm text-muted-foreground">Test structured data</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CodePanel