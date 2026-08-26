import React from 'react'

/*
 * Inline SVG icons for the home redesign.
 * Paths copied verbatim from the design reference (design/home-desktop.html).
 * All use a 24px viewBox, fill:none, stroke:currentColor, round caps/joins.
 */

// Arrow → (buttons, text links). Default 15px per the reference; hero uses 16.
export const ArrowRight = ({ size = 15, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

// Downward arrow into a tray (Download CV button).
export const Download = ({ size = 16, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12" />
    <path d="m7 11 5 5 5-5" />
    <path d="M4 20h16" />
  </svg>
)

// Envelope (contact button + footer social).
export const Mail = ({ size = 16, strokeWidth = 1.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.6 7 8.4 6 8.4-6" />
  </svg>
)

// Camera / photo placeholder glyph (image wells). Fixed stroke color per reference.
export const Camera = ({ size = 28, strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A2957F" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <circle cx="8.6" cy="10" r="1.6" />
    <path d="m4 17 5-5 4.5 4.5L16.5 13l3.5 3.5" />
  </svg>
)

// Hamburger (mobile nav).
export const Menu = ({ size = 18, strokeWidth = 1.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
    <path d="M4 8h16" />
    <path d="M4 16h16" />
  </svg>
)

export const LinkedIn = ({ size = 18, strokeWidth = 1.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M7.5 10.5v6.5" />
    <circle cx="7.5" cy="7.3" r="0.9" />
    <path d="M11.5 17v-3.8a2.4 2.4 0 0 1 4.8 0V17" />
    <path d="M11.5 10.5V17" />
  </svg>
)

export const GitHub = ({ size = 18, strokeWidth = 1.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-4 1.3-4-2.2-5.5-2.8M15 21v-3.5a3 3 0 0 0-.8-2.3c2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.5 4.5 0 0 0 4.3 9.4c0 4.5 2.7 5.5 5.3 5.8a3 3 0 0 0-.8 2.3V21" />
  </svg>
)
