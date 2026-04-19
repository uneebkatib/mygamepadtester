'use client'

import { useEffect } from 'react'
import Head from 'next/head'

/**
 * PageSEO Component for Next.js
 * This is a simplified version that sets document title dynamically.
 * For full SEO, use Next.js metadata in layout.jsx or page.jsx
 */
const PageSEO = ({
  title = 'Gamepad Tester',
  description = 'Test your gamepad online',
  canonical,
  keywords,
  author,
  schemaData,
  image,
  structuredData,
  breadcrumbs
}) => {
  // Set document title on client side
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])

  // For Next.js, SEO is primarily handled via metadata in page files
  // This component now just handles dynamic title updates
  return null
}

export default PageSEO
