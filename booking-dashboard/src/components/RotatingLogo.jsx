import React from 'react';

/**
 * RotatingLogo Component
 * Implements Hotel Lara International's signature luxury emblem:
 * - Central floral/geometric emblem remains rock-solid and stable.
 * - Circular perimeter typography ("HOTEL LARA INTERNATIONAL") rotates smoothly and continuously.
 * - Pure scalable vector SVG with crisp rendering at any size.
 */
export default function RotatingLogo({
  size = 120,
  theme = 'gold', // 'gold' | 'light' | 'dark'
  speed = 22, // seconds per full 360-degree rotation
  className = '',
  onClick = null,
  idPrefix = 'logo',
  isOpening = false,
}) {
  const isLight = theme === 'light';
  const isDark = theme === 'dark';
  
  // Color configuration
  const textColor = isOpening ? '#F5E0B2' : (isDark ? '#101C35' : (isLight ? '#F7F4EC' : '#C6A15B'));
  const ringColor = isOpening ? 'rgba(245, 224, 178, 0.5)' : (isDark ? 'rgba(16, 28, 53, 0.35)' : 'rgba(198, 161, 91, 0.45)');
  const navyPetalColor = isDark ? '#101C35' : (isLight ? '#1B2C4F' : '#0B1324');

  const goldGradId = `${idPrefix}-goldGrad-${theme}`;
  const navyGradId = `${idPrefix}-navyGrad-${theme}`;
  const textCirclePathId = `${idPrefix}-textCirclePath-${theme}`;

  return (
    <div
      className={`rotating-logo-container ${isOpening ? 'is-opening-logo' : ''} ${className}`}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      title="Hotel Lara International"
    >
      <svg
        viewBox="0 0 300 300"
        width={size}
        height={size}
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          {/* Metallic Luxury Gold Gradient */}
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E0B2" />
            <stop offset="35%" stopColor="#DFBF7D" />
            <stop offset="70%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#9A752F" />
          </linearGradient>

          {/* Deep Royal Navy Gradient */}
          <linearGradient id={navyGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E325C" />
            <stop offset="100%" stopColor={navyPetalColor} />
          </linearGradient>

          {/* Circular Path for Rotating Text: Radius 112px centered at (150, 150) */}
          <path
            id={textCirclePathId}
            d="M 150, 150 m -112, 0 a 112,112 0 1,1 224,0 a 112,112 0 1,1 -224,0"
            fill="none"
          />
        </defs>

        {/* 1. ROTATING RING WITH CIRCULAR TYPOGRAPHY & STAR ACCENTS */}
        <g className={`rotating-text-wrapper ${isOpening ? 'opening-text-fade' : ''}`}>
          <g
            className="rotating-text-group"
            style={{
              transformOrigin: '150px 150px',
              animation: `rotateContinuously ${speed}s linear infinite`,
            }}
          >
          {/* Subtle Outer Guide Rings */}
          <circle
            cx="150"
            cy="150"
            r="128"
            fill="none"
            stroke={ringColor}
            strokeWidth="0.8"
            strokeDasharray="2 4"
            opacity="0.6"
          />
          <circle
            cx="150"
            cy="150"
            r="98"
            fill="none"
            stroke={ringColor}
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Rotating Text along Circular Path */}
          <text
            fill={textColor}
            style={{
              fontFamily: "'Cinzel', 'Montserrat', serif",
              fontSize: '15.5px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
            }}
          >
            <textPath
              href={`#${textCirclePathId}`}
              startOffset="50%"
              textAnchor="middle"
            >
              HOTEL LARA INTERNATIONAL  ✦  HOTEL LARA INTERNATIONAL  ✦
            </textPath>
          </text>
        </g>
      </g>

        {/* 2. STATIC CENTRAL LUXURY EMBLEM (STAYS TOTALLY STABLE & PERFECTLY CENTERED) */}
        <g transform="translate(150, 150)">
          <g className={`central-emblem-inner ${isOpening ? 'opening-central-emblem' : ''}`}>
            {/* Subtle Inner Ring */}
          <circle
            cx="0"
            cy="0"
            r="82"
            fill="none"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1.2"
            opacity="0.75"
          />

          {/* 4 Cardinal Diamond Accent Points on axes */}
          <path d="M 0,-76 L 5,-64 L 0,-52 L -5,-64 Z" fill={`url(#${goldGradId})`} />
          <path d="M 0,76 L 5,64 L 0,52 L -5,64 Z" fill={`url(#${goldGradId})`} />
          <path d="M -76,0 L -64,5 L -52,0 L -64,-5 Z" fill={`url(#${goldGradId})`} />
          <path d="M 76,0 L 64,5 L 52,0 L 64,-5 Z" fill={`url(#${goldGradId})`} />

          {/* 4 Cardinal Navy Petals (Cross formation) */}
          <g>
            <path
              d="M 0,-8 C -22,-26 -28,-50 0,-68 C 28,-50 22,-26 0,-8 Z"
              fill={`url(#${navyGradId})`}
            />
            <path
              d="M 0,8 C -22,26 -28,50 0,68 C 28,50 22,26 0,8 Z"
              fill={`url(#${navyGradId})`}
            />
            <path
              d="M -8,0 C -26,-22 -50,-28 -68,0 C -50,28 -26,22 -8,0 Z"
              fill={`url(#${navyGradId})`}
            />
            <path
              d="M 8,0 C 26,-22 50,-28 68,0 C 50,28 26,22 8,0 Z"
              fill={`url(#${navyGradId})`}
            />
          </g>

          {/* 4 Diagonal Gold Petals (45-degree angle) */}
          <g transform="rotate(45)">
            <path
              d="M 0,-6 C -16,-20 -20,-42 0,-56 C 20,-42 16,-20 0,-6 Z"
              fill={`url(#${goldGradId})`}
            />
            <path
              d="M 0,6 C -16,20 -20,42 0,56 C 20,42 16,20 0,6 Z"
              fill={`url(#${goldGradId})`}
            />
            <path
              d="M -6,0 C -20,-16 -42,-20 -56,0 C -42,20 -20,16 -6,0 Z"
              fill={`url(#${goldGradId})`}
            />
            <path
              d="M 6,0 C 20,-16 42,-20 56,0 C 42,20 20,16 6,0 Z"
              fill={`url(#${goldGradId})`}
            />
          </g>

          {/* Intermediate Golden Leaf Highlights */}
          <g transform="rotate(22.5)">
            <ellipse cx="0" cy="-42" rx="3.5" ry="12" fill={`url(#${goldGradId})`} opacity="0.85" />
            <ellipse cx="0" cy="42" rx="3.5" ry="12" fill={`url(#${goldGradId})`} opacity="0.85" />
            <ellipse cx="-42" cy="0" rx="12" ry="3.5" fill={`url(#${goldGradId})`} opacity="0.85" />
            <ellipse cx="42" cy="0" rx="12" ry="3.5" fill={`url(#${goldGradId})`} opacity="0.85" />
          </g>

          {/* Central Layered Diamond Jewel Core */}
          <polygon
            points="0,-16 16,0 0,16 -16,0"
            fill={`url(#${goldGradId})`}
            stroke="#101C35"
            strokeWidth="1.5"
          />
          <polygon
            points="0,-10 10,0 0,10 -10,0"
            fill={`url(#${navyGradId})`}
          />
          <circle cx="0" cy="0" r="3" fill="#F5E0B2" />
          </g>
        </g>
      </svg>
    </div>
  );
}
