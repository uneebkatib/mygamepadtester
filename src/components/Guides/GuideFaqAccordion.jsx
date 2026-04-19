'use client'

import React, { useState } from "react";

const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ marginBottom: '15px', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', textAlign: 'left', padding: '20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span style={{ fontWeight: '700', color: '#2d3748', fontSize: '1.1rem' }}>{q}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s', fontSize: '1.2rem', color: '#667eea' }}>{isOpen ? '−' : '+'}</span>
      </button>
      <div style={{ maxHeight: isOpen ? '1000px' : '0', padding: isOpen ? '0 20px 20px 20px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.3s ease-out, padding 0.3s', color: '#4a5568', lineHeight: '1.8' }}>
        {a}
      </div>
    </div>
  );
};

const GuideFaqAccordion = ({ faqs }) => {
  return (
    <>
      {faqs.map((f, i) => (
        <FaqItem key={i} q={f.q} a={f.a} />
      ))}
    </>
  );
};

export default GuideFaqAccordion;
