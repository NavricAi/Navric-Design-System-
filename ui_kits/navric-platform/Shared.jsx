/* Shared primitives — Sparkline, SevBadge, Track, Icon */
const { useState, useEffect, useRef } = React;

function Icon({ name, size = 16, style, className }) {
  return <i data-lucide={name} style={{ width: size, height: size, display: 'inline-flex', flexShrink: 0, ...style }} className={className}></i>;
}

function Sparkline({ data, color = 'var(--indigo)', width = 64, height = 24, strokeWidth = 1.75 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const rng = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - 2 - ((v - min) / rng) * (height - 4);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SevBadge({ level, size = 'sm' }) {
  const cls = NAVRIC.sevClass(level), icon = NAVRIC.sevIcon(level);
  const pad = size === 'md' ? '5px 12px' : '3px 9px';
  const fs = size === 'md' ? 12.5 : 11.5;
  const v = { low: 'low', moderate: 'mod', elevated: 'elev', severe: 'sev' }[cls];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: pad, borderRadius: 9999,
      fontSize: fs, fontWeight: 600, border: '1px solid var(--sev-' + v + '-border)',
      background: 'var(--sev-' + v + '-tint)', color: 'var(--sev-' + v + '-ink)', whiteSpace: 'nowrap',
    }}>
      <Icon name={icon} size={fs + 2} /> {level}
    </span>
  );
}

function Track({ value, level, threshold }) {
  const cls = NAVRIC.sevClass(level);
  return (
    <div>
      <div style={{ height: 6, borderRadius: 9999, background: 'var(--surface-container)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: Math.min(value, 100) + '%', borderRadius: 9999, background: 'var(--sev-' + cls + ')' }}></div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Sparkline, SevBadge, Track });
