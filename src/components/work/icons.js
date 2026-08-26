import React from 'react'

/*
 * Inline SVG icons for the Work page. Paths copied verbatim from design/*.dc.html.
 * 24px viewBox, fill:none, round caps/joins. Footer/link icons use currentColor
 * so they inherit token colours; the placeholder camera keeps its fixed well tone.
 */

// Arrow used by ArrowLink. 17px on desktop links, 15px on compact/mobile.
export const Arrow = ({ size = 16, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

// Placeholder camera glyph — fixed #B3AA9D against the warm well ground.
export const CameraGlyph = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#B3AA9D" strokeWidth="1.2" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="1.5" />
    <circle cx="8.5" cy="9.5" r="1.6" />
    <path d="M3 16.5l5-4.5 4.5 4 3-2.5L21 18" />
  </svg>
)

// Hamburger (mobile masthead).
export const Menu = ({ size = 22, strokeWidth = 1.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
    <path d="M4 8h16" />
    <path d="M4 16h16" />
  </svg>
)

// Heart (footer "Crafted with ♥ by Shira Sonigo") — filled, terracotta.
export const Heart = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 20.5l-1.5-1.36C5.4 14.5 2.5 11.9 2.5 8.7 2.5 6.1 4.5 4.1 7 4.1c1.5 0 2.9.7 3.8 1.8L12 7.2l1.2-1.3c.9-1.1 2.3-1.8 3.8-1.8 2.5 0 4.5 2 4.5 4.6 0 3.2-2.9 5.8-8 10.44z" />
  </svg>
)

export const LinkedIn = ({ size = 19, strokeWidth = 1.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 10.5V17" />
    <circle cx="7" cy="7" r="0.6" fill="currentColor" />
    <path d="M11.5 17v-3.6a2.4 2.4 0 014.8 0V17" />
    <path d="M11.5 10.5V17" />
  </svg>
)

export const GitHub = ({ size = 19, strokeWidth = 1.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-4 1.2-4-2.2-5.6-2.7M15 21v-3.3a2.9 2.9 0 00-.8-2.2c2.6-.3 5.4-1.3 5.4-5.9a4.6 4.6 0 00-1.3-3.2 4.3 4.3 0 00-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 00-6 0C6.4 2.9 5.4 3.2 5.4 3.2a4.3 4.3 0 00-.1 3.2A4.6 4.6 0 004 9.6c0 4.6 2.8 5.6 5.4 5.9a2.9 2.9 0 00-.8 2.2V21" />
  </svg>
)

export const Mail = ({ size = 19, strokeWidth = 1.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)
