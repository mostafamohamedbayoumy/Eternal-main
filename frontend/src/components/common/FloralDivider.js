import React from 'react';

// Lightweight inline-SVG section separator used instead of hard color-block edges.
const FloralDivider = ({ flip = false }) => (
  <div className={`floral-divider ${flip ? 'floral-divider-flip' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 200 24" preserveAspectRatio="none">
      <path
        d="M0 16 Q 25 4, 50 16 T 100 16 T 150 16 T 200 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="16" r="2.5" fill="currentColor" />
      <circle cx="100" cy="16" r="3.5" fill="currentColor" />
      <circle cx="150" cy="16" r="2.5" fill="currentColor" />
    </svg>
  </div>
);

export default FloralDivider;
