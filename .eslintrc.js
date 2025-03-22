module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    'react/no-unescaped-entities': 'error',
    '@next/next/no-html-link-for-pages': ['error', 'app/']
  },
  settings: {
    // Tell ESLint we're using App Router
    'next': {
      'rootDir': '.',
      'pagesDir': null // No pages directory
    }
  }
}
