'use client'
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Simple markdown to HTML converter
function renderMarkdown(text) {
  if (!text) return '';
  
  return text
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre style="background:#f7fafc;padding:1rem;border-radius:8px;overflow-x:auto"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code style="background:#f7fafc;padding:2px 6px;border-radius:4px;font-size:0.9em">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li style="margin-left:1.5rem">$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li style="margin-left:1.5rem">$1</li>')
    // Line breaks
    .replace(/\n/g, '<br/>')
    // Double line breaks (paragraphs)
    .replace(/<br\/><br\/>/g, '</p><p style="margin-bottom:1rem">');
}

// Universal Guide Renderer - Displays any guide content with beautiful UI and full SEO
export default function GuideRenderer({ content }) {
  if (!content) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Guide content not available</h1>
      </div>
    );
  }

  const { meta, hero, sections } = content;

  // Generate FAQ Schema for SEO
  const faqSections = sections.filter(s => s.type === 'faq');
  const faqSchema = faqSections.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqSections.flatMap(section => 
      section.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.a
        }
      }))
    )
  } : null;

  // Generate Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": hero.title,
    "description": meta.description,
    "author": {
      "@type": "Person",
      "name": hero.author.split(' | ')[0]
    },
    "datePublished": hero.publishedDate,
    "dateModified": meta.lastUpdated,
    "publisher": {
      "@type": "Organization",
      "name": "MyGamepadTester",
      "url": "https://mygamepadtester.com"
    }
  };

  // Generate Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com" },
      { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://mygamepadtester.com/guides" }
    ]
  };

  return (
    <>
      {/* SEO Schema Markup */}
      <Head>
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(', ')} />
        <meta property="og:title" content={hero.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={hero.publishedDate} />
        <meta property="article:modified_time" content={meta.lastUpdated} />
        <meta property="article:author" content={hero.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={hero.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>

      <article style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', lineHeight: '1.8' }} itemScope itemType="https://schema.org/Article">
        {/* Hero Section */}
        <header style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '3px solid #DA7756' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ padding: '6px 12px', background: '#DA7756', color: 'white', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              REPAIR GUIDE
            </span>
            <span style={{ padding: '6px 12px', background: '#f0fff4', color: '#38a169', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              UPDATED {meta.lastUpdated}
            </span>
            <span style={{ padding: '6px 12px', background: '#f7fafc', color: '#4a5568', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {meta.readTime}
            </span>
          </div>

          <h1 itemProp="headline" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a202c', lineHeight: '1.2' }}>
            {hero.title}
          </h1>

          <p style={{ fontSize: '1.3rem', color: '#718096', marginBottom: '1.5rem' }} itemProp="description">
            {hero.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#718096', flexWrap: 'wrap' }}>
            <div>
              <strong style={{ display: 'block', color: '#4a5568' }}>Author</strong>
              <span itemProp="author">{hero.author}</span>
            </div>
            <div>
              <strong style={{ display: 'block', color: '#4a5568' }}>Difficulty</strong>
              {meta.difficulty}
            </div>
          </div>
        </header>

      {/* Sections */}
      {sections.map((section, index) => {
        switch (section.type) {
          case 'introduction':
            return (
              <p key={index} style={{ fontSize: '1.2rem', color: '#4a5568', marginBottom: '2rem', fontStyle: 'italic', borderLeft: '4px solid #DA7756', paddingLeft: '1.5rem' }}>
                {section.content}
              </p>
            );

          case 'paragraph':
            return (
              <p key={index} style={{ marginBottom: '1.5rem', color: '#2d3748' }}>
                {section.content}
              </p>
            );

          case 'h2':
            return (
              <h2 key={index} style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem', color: '#1a202c', borderBottom: '2px solid #DA7756', paddingBottom: '0.5rem' }}>
                {section.title}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={index} style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#2d3748' }}>
                {section.title}
              </h3>
            );

          case 'ordered-list':
            return (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2d3748' }}>{section.title}</h3>
                <ol style={{ paddingLeft: '2rem' }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                      <strong style={{ color: '#2d3748' }}>{item.term}:</strong> {item.desc}
                    </li>
                  ))}
                </ol>
              </div>
            );

          case 'checklist':
            return (
              <div key={index} style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f7fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#2d3748', marginTop: 0 }}>{section.title}</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.75rem', paddingLeft: '2rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '0.5rem', color: '#38a169' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );

          case 'tool-callout':
            return (
              <div key={index} style={{ marginBottom: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #DA7756 0%, #1C6BBB 100%)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: '600' }}>
                  {section.content}
                </p>
                <Link
                  href={section.buttonLink}
                  style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    background: 'white',
                    color: '#DA7756',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {section.buttonText} →
                </Link>
              </div>
            );

          case 'technical-box':
            return (
              <div key={index} style={{ marginBottom: '2rem', padding: '1.5rem', background: '#ebf8ff', borderRadius: '12px', border: '2px solid #4299e1' }}>
                <h4 style={{ marginTop: 0, color: '#2b6cb0', fontSize: '1.2rem' }}>🔧 {section.title}</h4>
                <ul style={{ marginBottom: 0 }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', color: '#2c5282' }}>{item}</li>
                  ))}
                </ul>
              </div>
            );

          case 'stat-box':
            return (
              <div key={index} style={{ marginBottom: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #DA7756 0%, #C15F3C 100%)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{section.stat}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>{section.statLabel}</div>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{section.content}</p>
              </div>
            );

          case 'table':
            return (
              <div key={index} style={{ marginBottom: '2rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: '#DA7756', color: 'white' }}>
                      {section.headers.map((header, i) => (
                        <th key={i} style={{ padding: '1rem', textAlign: 'left' }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#f7fafc' : 'white' }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'warning-box':
            return (
              <div key={index} style={{ marginBottom: '2rem', padding: '1.5rem', background: '#fff5f5', borderRadius: '12px', borderLeft: '4px solid #f56565' }}>
                <h4 style={{ marginTop: 0, color: '#c53030' }}>⚠️ {section.title}</h4>
                <p style={{ marginBottom: 0, color: '#742a2a' }}>{section.content}</p>
              </div>
            );

          case 'success-box':
            return (
              <div key={index} style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f0fff4', borderRadius: '12px', borderLeft: '4px solid #38a169' }}>
                <h4 style={{ marginTop: 0, color: '#22543d' }}>✓ {section.title}</h4>
                <p style={{ marginBottom: 0, color: '#22543d' }}>{section.content}</p>
              </div>
            );

          case 'method':
          case 'method-box':
            return (
              <div key={index} style={{ marginBottom: '3rem' }}>
                <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px 12px 0 0', borderBottom: '3px solid #DA7756' }}>
                  <h3 style={{ marginTop: 0, color: '#2d3748', fontSize: '1.5rem' }}>{section.title}</h3>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#718096', fontStyle: 'italic' }}>{section.subtitle}</p>
                </div>
                {section.warning && (
                  <div style={{ padding: '1rem 1.5rem', background: '#fff5f5', color: '#c53030', fontSize: '0.9rem', borderLeft: '4px solid #f56565' }}>
                    <strong>Warning:</strong> {section.warning}
                  </div>
                )}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '0 0 12px 12px', border: '2px solid #e2e8f0', borderTop: 'none' }}>
                  {section.steps.map((step, i) => {
                    const stepNumber = step.step || step.stepNum || (i + 1);
                    const stepContent = step.content || step.details || '';
                    return (
                      <div key={i} style={{ marginBottom: '2rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '0', top: '0', width: '2rem', height: '2rem', background: '#DA7756', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          {stepNumber}
                        </div>
                        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#2d3748' }}>Step {stepNumber}: {step.title}</h4>
                        <div 
                          style={{ marginBottom: 0, color: '#4a5568', lineHeight: '1.8' }}
                          dangerouslySetInnerHTML={{ 
                            __html: `<p style="margin-bottom:1rem">${renderMarkdown(stepContent)}</p>` 
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );

          case 'tools-grid':
            return (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#2d3748' }}>{section.title}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {section.tools.map((tool, i) => (
                    <div key={i} style={{ padding: '1.5rem', background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px' }}>
                      <strong style={{ display: 'block', fontSize: '1.1rem', color: '#2d3748', marginBottom: '0.5rem' }}>
                        🔧 {tool.name}
                      </strong>
                      <div style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '0.5rem' }}>
                        Purpose: {tool.purpose}
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#DA7756' }}>
                        {tool.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'cost-breakdown':
            return (
              <div key={index} style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {section.items.map((item, i) => (
                  <div key={i} style={{ padding: '1.5rem', background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '0.5rem' }}>
                      {item.method}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#DA7756', marginBottom: '0.5rem' }}>
                      {item.cost}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '0.5rem' }}>
                      Time: {item.time}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#718096' }}>
                      Difficulty: {item.difficulty}
                    </div>
                  </div>
                ))}
              </div>
            );

          case 'longevity-box':
            return (
              <div key={index} style={{ marginBottom: '2rem' }}>
                {section.items.map((item, i) => (
                  <div key={i} style={{ marginBottom: '1.5rem', padding: '1.5rem', background: '#f7fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '1.2rem', color: '#2d3748' }}>{item.method}</strong>
                      <span style={{ padding: '0.4rem 1rem', background: '#DA7756', color: 'white', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {item.duration}
                      </span>
                    </div>
                    <p style={{ marginBottom: 0, color: '#718096' }}>{item.note}</p>
                  </div>
                ))}
              </div>
            );

          case 'related-guides':
            return (
              <div key={index} style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#2d3748' }}>📚 Related Guides</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {section.guides.map((guide, i) => (
                    <li key={i} style={{ marginBottom: '0.75rem' }}>
                      <Link href={guide.link} style={{ color: '#DA7756', textDecoration: 'none', fontWeight: '600' }}>
                        → {guide.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case 'faq':
            return (
              <div key={index} style={{ marginBottom: '2rem' }}>
                {section.questions.map((faq, i) => (
                  <details key={i} style={{ marginBottom: '1rem', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
                    <summary style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#2d3748', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Q: {faq.q}
                    </summary>
                    <p style={{ marginTop: '1rem', marginBottom: 0, color: '#4a5568', lineHeight: '1.8' }}>{faq.a}</p>
                  </details>
                ))}
              </div>
            );

          case 'conclusion':
            return (
              <p key={index} style={{ fontSize: '1.2rem', color: '#4a5568', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                {section.content}
              </p>
            );

          case 'final-cta':
            return (
              <div key={index} style={{ marginTop: '3rem', padding: '2.5rem', background: 'linear-gradient(135deg, #DA7756 0%, #1C6BBB 100%)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '2rem' }}>{section.title}</h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{section.content}</p>
                <Link
                  href={section.buttonLink}
                  style={{
                    display: 'inline-block',
                    padding: '1.2rem 2.5rem',
                    background: 'white',
                    color: '#DA7756',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {section.buttonText} →
                </Link>
              </div>
            );

          default:
            return null;
        }
      })}

      {/* Author Bio */}
      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '2px solid #e2e8f0' }}>
        <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#718096' }}>
            *{hero.author}*
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#a0aec0' }}>
            mygamepadtester.com | <Link href="/about" style={{ color: '#DA7756' }}>About the author</Link>
          </p>
        </div>
      </footer>
    </article>
    </>
  );
}
