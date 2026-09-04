import React from 'react';

/**
 * Professional, Multi-Variant Universal Loader Component
 * Works seamlessly across React 18/19, Tailwind CSS v3 & v4.
 *
 * @param {Object} props
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Loader dimensions
 * @param {'spinner'|'dots'|'pulse'|'bars'|'dual-ring'} [props.variant='spinner'] - Visual animation style
 * @param {'purple'|'blue'|'indigo'|'emerald'|'rose'|'amber'|'dark'|'white'} [props.color='purple'] - Theme accent
 * @param {string} [props.text] - Optional status message below the animation
 * @param {boolean} [props.fullScreen=false] - If true, renders a fixed backdrop blur overlay
 * @param {boolean} [props.inline=false] - If true, renders compact inline for buttons
 * @param {string} [props.className=''] - Custom container class
 * @param {string} [props.textClassName=''] - Custom text class
 */
const Loader = ({
  size = 'md',
  variant = 'spinner',
  color = 'purple',
  text,
  fullScreen = false,
  inline = false,
  className = '',
  textClassName = '',
}) => {
  // Theme Color Presets
  const colorMap = {
    purple: {
      main: '#9333ea',       // purple-600
      light: '#f3e8ff',      // purple-100
      border: '#c084fc',     // purple-400
      text: 'text-purple-700',
      bg: 'bg-purple-600',
      track: 'border-purple-100',
      ring: 'border-purple-600',
      glow: 'rgba(147, 51, 234, 0.25)',
    },
    indigo: {
      main: '#4f46e5',       // indigo-600
      light: '#e0e7ff',      // indigo-100
      border: '#818cf8',     // indigo-400
      text: 'text-indigo-700',
      bg: 'bg-indigo-600',
      track: 'border-indigo-100',
      ring: 'border-indigo-600',
      glow: 'rgba(79, 70, 229, 0.25)',
    },
    blue: {
      main: '#2563eb',       // blue-600
      light: '#dbeafe',      // blue-100
      border: '#60a5fa',     // blue-400
      text: 'text-blue-700',
      bg: 'bg-blue-600',
      track: 'border-blue-100',
      ring: 'border-blue-600',
      glow: 'rgba(37, 99, 235, 0.25)',
    },
    emerald: {
      main: '#059669',       // emerald-600
      light: '#d1fae5',      // emerald-100
      border: '#34d399',     // emerald-400
      text: 'text-emerald-700',
      bg: 'bg-emerald-600',
      track: 'border-emerald-100',
      ring: 'border-emerald-600',
      glow: 'rgba(5, 150, 105, 0.25)',
    },
    rose: {
      main: '#e11d48',       // rose-600
      light: '#ffe4e6',      // rose-100
      border: '#fb7185',     // rose-400
      text: 'text-rose-700',
      bg: 'bg-rose-600',
      track: 'border-rose-100',
      ring: 'border-rose-600',
      glow: 'rgba(225, 29, 72, 0.25)',
    },
    amber: {
      main: '#d97706',       // amber-600
      light: '#fef3c7',      // amber-100
      border: '#fbbf24',     // amber-400
      text: 'text-amber-700',
      bg: 'bg-amber-600',
      track: 'border-amber-100',
      ring: 'border-amber-600',
      glow: 'rgba(217, 119, 6, 0.25)',
    },
    dark: {
      main: '#1e293b',       // slate-800
      light: '#f1f5f9',      // slate-100
      border: '#94a3b8',     // slate-400
      text: 'text-slate-800',
      bg: 'bg-slate-800',
      track: 'border-slate-200',
      ring: 'border-slate-800',
      glow: 'rgba(30, 41, 59, 0.2)',
    },
    white: {
      main: '#ffffff',
      light: 'rgba(255, 255, 255, 0.2)',
      border: '#ffffff',
      text: 'text-white',
      bg: 'bg-white',
      track: 'border-white/30',
      ring: 'border-white',
      glow: 'rgba(255, 255, 255, 0.3)',
    },
  };

  const theme = colorMap[color] || colorMap.purple;

  // Size Specifications (pixels for exact rendering reliability)
  const sizeConfig = {
    xs: { dim: 16, stroke: 2, dot: 4, barH: 12, barW: 2, fontSize: '11px', gap: '4px' },
    sm: { dim: 24, stroke: 2.5, dot: 6, barH: 16, barW: 3, fontSize: '12px', gap: '8px' },
    md: { dim: 42, stroke: 3.5, dot: 9, barH: 24, barW: 4, fontSize: '14px', gap: '12px' },
    lg: { dim: 58, stroke: 4.5, dot: 12, barH: 32, barW: 5, fontSize: '16px', gap: '16px' },
    xl: { dim: 76, stroke: 5.5, dot: 16, barH: 42, barW: 6, fontSize: '18px', gap: '20px' },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  // Embedded self-contained keyframe styles so animations always work 100% guaranteed
  const animationStyles = `
    @keyframes profLoaderSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes profLoaderSpinRev {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
    @keyframes profLoaderBounce {
      0%, 100% { transform: translateY(0); opacity: 0.5; }
      50% { transform: translateY(-7px); opacity: 1; }
    }
    @keyframes profLoaderPulse {
      0% { transform: scale(0.85); opacity: 0.9; }
      50% { transform: scale(1.1); opacity: 0.4; }
      100% { transform: scale(0.85); opacity: 0.9; }
    }
    @keyframes profLoaderRipple {
      0% { transform: scale(0.6); opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }
    @keyframes profLoaderBarWave {
      0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
      50% { transform: scaleY(1); opacity: 1; }
    }
    @keyframes profLoaderFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  // Render Visual Animation
  const renderGraphic = () => {
    switch (variant) {
      case 'dots':
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${Math.max(4, currentSize.dot * 0.7)}px`,
              height: `${currentSize.dim * 0.6}px`,
            }}
          >
            {[0, 160, 320].map((delay, idx) => (
              <span
                key={idx}
                style={{
                  width: `${currentSize.dot}px`,
                  height: `${currentSize.dot}px`,
                  borderRadius: '50%',
                  backgroundColor: theme.main,
                  boxShadow: `0 2px 6px ${theme.glow}`,
                  animation: `profLoaderBounce 0.9s ease-in-out ${delay}ms infinite`,
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div
            style={{
              position: 'relative',
              width: `${currentSize.dim}px`,
              height: `${currentSize.dim}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Outer expanding ripple */}
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: theme.main,
                animation: 'profLoaderRipple 1.6s cubic-bezier(0, 0.2, 0.8, 1) infinite',
              }}
            />
            {/* Center glowing solid orb */}
            <span
              style={{
                width: `${currentSize.dim * 0.55}px`,
                height: `${currentSize.dim * 0.55}px`,
                borderRadius: '50%',
                backgroundColor: theme.main,
                boxShadow: `0 0 16px ${theme.glow}`,
                animation: 'profLoaderPulse 1.6s ease-in-out infinite',
              }}
            />
          </div>
        );

      case 'bars':
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${currentSize.barW}px`,
              height: `${currentSize.barH}px`,
            }}
          >
            {[0, 150, 300, 450].map((delay, idx) => (
              <span
                key={idx}
                style={{
                  width: `${currentSize.barW}px`,
                  height: `${currentSize.barH}px`,
                  backgroundColor: theme.main,
                  borderRadius: '999px',
                  boxShadow: `0 1px 4px ${theme.glow}`,
                  animation: `profLoaderBarWave 0.9s ease-in-out ${delay}ms infinite`,
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
        );

      case 'dual-ring':
        return (
          <div
            style={{
              position: 'relative',
              width: `${currentSize.dim}px`,
              height: `${currentSize.dim}px`,
            }}
          >
            {/* Outer ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `${currentSize.stroke}px solid transparent`,
                borderTopColor: theme.main,
                borderBottomColor: theme.main,
                animation: 'profLoaderSpin 1.1s linear infinite',
              }}
            />
            {/* Inner counter-rotating ring */}
            <div
              style={{
                position: 'absolute',
                inset: `${currentSize.stroke * 1.8}px`,
                borderRadius: '50%',
                border: `${Math.max(2, currentSize.stroke * 0.75)}px solid transparent`,
                borderLeftColor: theme.border,
                borderRightColor: theme.border,
                animation: 'profLoaderSpinRev 0.8s linear infinite',
              }}
            />
          </div>
        );

      case 'spinner':
      default:
        return (
          <div
            style={{
              position: 'relative',
              width: `${currentSize.dim}px`,
              height: `${currentSize.dim}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Ambient Background Glow */}
            <div
              style={{
                position: 'absolute',
                inset: '2px',
                borderRadius: '50%',
                backgroundColor: theme.main,
                filter: 'blur(8px)',
                opacity: 0.18,
              }}
            />

            {/* Inactive Base Ring Track */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: `${currentSize.stroke}px solid ${theme.light}`,
                boxSizing: 'border-box',
              }}
            />

            {/* Active Rotating Gradient Arc */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `${currentSize.stroke}px solid transparent`,
                borderTopColor: theme.main,
                borderRightColor: size === 'lg' || size === 'xl' ? theme.border : 'transparent',
                boxSizing: 'border-box',
                animation: 'profLoaderSpin 0.75s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              }}
            />

            {/* Inner subtle core dot for larger sizes */}
            {(size === 'md' || size === 'lg' || size === 'xl') && (
              <div
                style={{
                  width: `${Math.max(4, currentSize.stroke * 1.5)}px`,
                  height: `${Math.max(4, currentSize.stroke * 1.5)}px`,
                  borderRadius: '50%',
                  backgroundColor: theme.main,
                  opacity: 0.85,
                  animation: 'profLoaderPulse 1.2s ease-in-out infinite',
                }}
              />
            )}
          </div>
        );
    }
  };

  // Main Loader Body
  const loaderBody = (
    <div
      role="status"
      aria-live="polite"
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: currentSize.gap,
      }}
    >
      <style>{animationStyles}</style>

      {renderGraphic()}

      {/* Optional Status Text */}
      {text && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            userSelect: 'none',
          }}
        >
          <span
            className={`${theme.text} ${textClassName}`}
            style={{
              fontSize: currentSize.fontSize,
              fontWeight: 600,
              letterSpacing: '0.015em',
            }}
          >
            {text}
          </span>
          <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
            <span
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: theme.main,
                animation: 'profLoaderBounce 1s infinite 0ms',
              }}
            />
            <span
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: theme.main,
                animation: 'profLoaderBounce 1s infinite 200ms',
              }}
            />
            <span
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: theme.main,
                animation: 'profLoaderBounce 1s infinite 400ms',
              }}
            />
          </span>
        </div>
      )}

      <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
        Loading...
      </span>
    </div>
  );

  // Full Screen Modal Backdrop Overlay
  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: 'profLoaderFadeIn 0.25s ease-out forwards',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px 32px',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '90vw',
          }}
        >
          {loaderBody}
        </div>
      </div>
    );
  }

  // Inline Mode (e.g., inside buttons or headers)
  if (inline) {
    return loaderBody;
  }

  // Standard Container Mode
  return (
    <div
      style={{
        width: '100%',
        minHeight: '160px',
        padding: '24px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loaderBody}
    </div>
  );
};

export default Loader;
