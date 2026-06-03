/* Navric Platform — shared mock data + helpers (plain JS, attached to window) */
window.NAVRIC = (function () {
  const carrier = {
    name: 'Sunbelt Freight Logistics LLC',
    usdot: '2143875',
    mc: '781204',
    location: 'Laredo, TX',
    operation: 'For-Hire · Interstate',
    powerUnits: 48,
    drivers: 61,
    authority: 'Active',
    overallRisk: 'Elevated',
    confidence: 'High',
    updated: '4 days ago',
    score: 63.4, // Navric rollup percentile
    summary:
      "Sunbelt's elevated profile is driven primarily by maintenance: vehicle out-of-service rates have climbed for three consecutive quarters and now sit well above the national average. Driver hours-of-service violations are a secondary concern; crash and administrative signals are within normal range.",
  };

  // FMCSA BASIC categories (the granular source signals)
  const basics = [
    { label: 'Unsafe Driving',        score: 52, threshold: 65, icon: 'gauge' },
    { label: 'Hours of Service',      score: 64, threshold: 65, icon: 'clock' },
    { label: 'Vehicle Maintenance',   score: 82, threshold: 80, icon: 'wrench' },
    { label: 'Driver Fitness',        score: 48, threshold: 80, icon: 'id-card' },
    { label: 'Controlled Substances', score: 9,  threshold: 65, icon: 'flask-conical' },
    { label: 'Crash Indicator',       score: 41, threshold: 65, icon: 'car-front' },
    { label: 'Hazardous Materials',   score: 12, threshold: 80, icon: 'triangle-alert' },
    { label: 'Safety Management',     score: 38, threshold: 65, icon: 'clipboard-check' },
  ];

  // The five rolled-up Navric dimensions (used on the profile)
  const dimensions = [
    { name: 'Maintenance', score: 82, level: 'Severe' },
    { name: 'Driver',      score: 64, level: 'Elevated' },
    { name: 'Crash',       score: 41, level: 'Moderate' },
    { name: 'Admin',       score: 38, level: 'Moderate' },
    { name: 'Hazmat',      score: 12, level: 'Low' },
  ];

  const oos = [
    { label: 'Vehicle', carrier: 31.2, national: 23.4 },
    { label: 'Driver',  carrier: 7.1,  national: 6.7 },
    { label: 'Hazmat',  carrier: null, national: 4.4 },
  ];

  const inspections = [
    { id: 'TX-4471902', date: '2026-05-18', state: 'TX', level: 'I',   violations: 4, oos: true,  basic: 'Vehicle Maintenance', sev: 'Severe' },
    { id: 'NM-3320817', date: '2026-04-02', state: 'NM', level: 'II',  violations: 2, oos: false, basic: 'Hours of Service',    sev: 'Elevated' },
    { id: 'TX-4419006', date: '2026-03-21', state: 'TX', level: 'I',   violations: 3, oos: true,  basic: 'Vehicle Maintenance', sev: 'Severe' },
    { id: 'AZ-2208114', date: '2026-02-09', state: 'AZ', level: 'III', violations: 1, oos: false, basic: 'Driver Fitness',      sev: 'Moderate' },
    { id: 'TX-4380221', date: '2026-01-15', state: 'TX', level: 'II',  violations: 0, oos: false, basic: '—',                   sev: 'Low' },
    { id: 'OK-1190884', date: '2025-12-04', state: 'OK', level: 'I',   violations: 2, oos: false, basic: 'Unsafe Driving',      sev: 'Moderate' },
  ];

  function sevClass(level) {
    return { Low: 'low', Moderate: 'moderate', Elevated: 'elevated', Severe: 'severe' }[level] || 'moderate';
  }
  function sevIcon(level) {
    return { Low: 'shield-check', Moderate: 'info', Elevated: 'triangle-alert', Severe: 'octagon-alert' }[level] || 'info';
  }
  // map a BASIC score+threshold to a Navric severity level
  function scoreLevel(score, threshold) {
    if (score <= 0) return 'Low';
    if (score >= threshold * 1.02) return 'Severe';
    if (score >= threshold) return 'Elevated';
    if (score >= threshold * 0.55) return 'Moderate';
    return 'Low';
  }
  // synthesize a rising/steady 7-pt sparkline series for a score
  function spark(score, rising) {
    const base = Math.max(score - (rising ? 22 : 6), 4);
    return Array.from({ length: 8 }, (_, i) =>
      i === 7 ? score : Math.max(base + (rising ? i * (score - base) / 7 : Math.sin(i) * 3), 2)
    );
  }

  return { carrier, basics, dimensions, oos, inspections, sevClass, sevIcon, scoreLevel, spark };
})();
