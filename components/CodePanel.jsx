"use client"

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from './ui/button'

function CodePanel({ data }) {
  const [copiedSection, setCopiedSection] = useState(null)

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

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Copy Meta Tags</h2>
        <p className="text-muted-foreground">Copy the HTML meta tags and paste them into your website's &lt;head&gt; section.</p>
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
                <Button
                  onClick={() => copyToClipboard(section.code, section.id)}
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
            
            <div className="p-6">
              <pre className="bg-background border border-border text-foreground p-4 rounded-lg overflow-x-auto text-sm">
                <code>{section.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Guide */}
      <div className="bg-info/10 border border-info/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-info mb-3">Implementation Guide</h3>
        <div className="space-y-3 text-sm text-info/90">
          <div>
            <strong>1. Copy the meta tags</strong> - Use the "Complete Meta Tags" section for all platforms
          </div>
          <div>
            <strong>2. Paste in your HTML</strong> - Add the tags inside the &lt;head&gt; section of your webpage
          </div>
          <div>
            <strong>3. Test your implementation</strong> - Use tools like Facebook Debugger or Twitter Card Validator
          </div>
          <div>
            <strong>4. Update as needed</strong> - Modify the content and regenerate tags when your content changes
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