/* Navric marketing — Hero, Trust, Features, Pricing, CTA */

function sev(level) {
  const m = { Low: 'low', Moderate: 'moderate', Elevated: 'elevated', Severe: 'severe' }[level];
  const v = { low: 'low', moderate: 'mod', elevated: 'elev', severe: 'sev' }[m];
  const ic = { Low: 'shield-check', Moderate: 'info', Elevated: 'triangle-alert', Severe: 'octagon-alert' }[level];
  return { v, ic, fill: 'var(--sev-' + m + ')' };
}

function ProductPreview() {
  const dims = [['Maintenance', 82, 'Severe'], ['Driver', 64, 'Elevated'], ['Crash', 41, 'Moderate'], ['Hazmat', 12, 'Low']];
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, boxShadow: 'var(--shadow-md)', padding: 20, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg1)' }}>Sunbelt Freight Logistics</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg3)', marginTop: 2, whiteSpace: 'nowrap' }}>USDOT 2143875 · Laredo, TX</div>
        </div>
        {(() => { const s = sev('Elevated'); return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 8, fontSize: 12.5, fontWeight: 600, border: '1px solid var(--sev-elev-border)', background: 'var(--sev-elev-tint)', color: 'var(--sev-elev-ink)', whiteSpace: 'nowrap' }}>
            <MIcon name={s.ic} size={14} /> Elevated risk
          </span>); })()}
      </div>
      {dims.map(([name, score, level]) => { const s = sev(level); return (
        <div key={name} style={{ display: 'grid', gridTemplateColumns: '92px 34px 1fr 78px', gap: 12, alignItems: 'center', padding: '9px 0', borderTop: '1px solid var(--border-faint)' }}>
          <span style={{ fontSize: 12.5, color: 'var(--fg2)', fontWeight: 500 }}>{name}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 15, textAlign: 'right', color: level === 'Severe' ? 'var(--sev-sev-ink)' : 'var(--fg1)' }}>{score}</span>
          <div style={{ height: 5, borderRadius: 9999, background: 'var(--surface-container)', overflow: 'hidden' }}><div style={{ height: '100%', width: score + '%', background: s.fill, borderRadius: 9999 }}></div></div>
          <span style={{ justifySelf: 'end', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'var(--sev-' + s.v + '-ink)' }}><MIcon name={s.ic} size={12} /> {level}</span>
        </div>
      ); })}
      <div style={{ marginTop: 14, paddingTop: 13, borderTop: '1px solid var(--border-faint)', fontSize: 12, lineHeight: 1.55, color: 'var(--fg2)', textWrap: 'pretty' }}>
        Driven primarily by maintenance: vehicle out-of-service rates have climbed for three consecutive quarters.
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ position: 'relative', padding: '88px 32px 72px', overflow: 'hidden' }}>
      <div className="dotted-bg" style={{ position: 'absolute', inset: 0, opacity: .5, maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000, transparent)' }}></div>
      <div style={{ position: 'relative', maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 56, alignItems: 'center' }} className="hero-grid">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, fontWeight: 500, color: 'var(--fg2)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '5px 12px', borderRadius: 9999, marginBottom: 22, whiteSpace: 'nowrap' }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: 'var(--teal)' }}></span> Live FMCSA data · updated daily
          </div>
          <h1 style={{ font: '600 50px/1.05 var(--font-sans)', letterSpacing: '-.03em', color: 'var(--fg1)', margin: 0 }}>Screen any carrier in seconds, not spreadsheets.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg2)', margin: '22px 0 0', maxWidth: 480, textWrap: 'pretty' }}>
            Navric turns public FMCSA safety data into a clear risk verdict across five dimensions — with the executive summary already written.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 30, maxWidth: 440 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, height: 46, padding: '0 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <MIcon name="search" size={17} style={{ color: 'var(--fg3)' }} />
              <input placeholder="Search by USDOT or carrier name" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14.5, fontFamily: 'var(--font-sans)', color: 'var(--fg1)' }} />
            </div>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', height: 46, padding: '0 20px', background: 'var(--indigo)', color: '#fff', borderRadius: 10, fontSize: 14.5, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>Run a screen</a>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--fg3)', margin: '14px 0 0' }}>For underwriters, freight brokers, and fleet safety teams.</p>
        </div>
        <div><ProductPreview /></div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    ['layers', 'Five-dimension risk index', 'Maintenance, Driver, Crash, Admin, and Hazmat — each scored 0–100 with a severity level you can read at a glance.'],
    ['file-text', 'The summary is already written', 'An executive brief sits inline on every profile, grounded in the carrier\u2019s 24-month inspection history. No prompt, no waiting.'],
    ['bell', 'Watchlist & monitoring', 'Track a carrier and get a quiet alert the moment its profile shifts — before a renewal or a load.'],
  ];
  return (
    <section style={{ padding: '72px 32px', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--indigo)' }}>What you get</span>
        <h2 style={{ font: '600 34px/1.1 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--fg1)', margin: '14px 0 0', maxWidth: 560 }}>A screening decision, not a data dump.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 44 }} className="feat-grid">
          {items.map(([ic, h, b]) => (
            <div key={h}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--indigo-tint)', color: 'var(--indigo)', display: 'grid', placeItems: 'center', marginBottom: 16 }}><MIcon name={ic} size={19} /></div>
              <h3 style={{ font: '600 17px/1.3 var(--font-sans)', color: 'var(--fg1)', margin: '0 0 8px' }}>{h}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg2)', margin: 0, textWrap: 'pretty' }}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    ['Analyst', '$149', '/ seat · mo', ['Unlimited carrier screens', 'Five-dimension risk index', 'Executive summaries', 'PDF export'], false],
    ['Team', '$129', '/ seat · mo', ['Everything in Analyst', 'Watchlist & monitoring alerts', 'Shared carrier lists', 'Compare carriers'], true],
    ['Enterprise', 'Custom', '', ['Everything in Team', 'API & bulk screening', 'SSO & audit log', 'Dedicated support'], false],
  ];
  return (
    <section style={{ padding: '72px 32px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ font: '600 34px/1.1 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--fg1)', margin: 0 }}>Pricing that scales with screening.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginTop: 44, textAlign: 'left' }} className="price-grid">
          {tiers.map(([name, price, unit, feats, hot]) => (
            <div key={name} style={{
              background: 'var(--surface)', border: '1px solid ' + (hot ? 'var(--indigo)' : 'var(--border)'), borderRadius: 16, padding: 26,
              boxShadow: hot ? 'var(--shadow-md)' : 'var(--shadow-sm)', position: 'relative',
            }}>
              {hot && <span style={{ position: 'absolute', top: 18, right: 18, fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--indigo)', background: 'var(--indigo-tint)', padding: '3px 9px', borderRadius: 9999 }}>Popular</span>}
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg1)' }}>{name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '14px 0 18px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 600, letterSpacing: '-.02em', color: 'var(--fg1)' }}>{price}</span>
                <span style={{ fontSize: 12.5, color: 'var(--fg3)', whiteSpace: 'nowrap' }}>{unit}</span>
              </div>
              <a href="#" style={{ display: 'block', textAlign: 'center', padding: '10px 0', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', marginBottom: 20,
                background: hot ? 'var(--indigo)' : 'var(--surface)', color: hot ? '#fff' : 'var(--fg1)', border: hot ? 'none' : '1px solid var(--border)' }}>
                {name === 'Enterprise' ? 'Contact sales' : 'Start free trial'}
              </a>
              {feats.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13.5, color: 'var(--fg2)', marginBottom: 11 }}>
                  <MIcon name="check" size={16} style={{ color: 'var(--indigo)', marginTop: 1 }} /> {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: '0 32px 72px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', background: 'var(--navy)', borderRadius: 22, padding: '56px 48px', position: 'relative', overflow: 'hidden' }}>
        <div className="dotted-bg" style={{ position: 'absolute', inset: 0, opacity: .12 }}></div>
        <div style={{ position: 'relative', maxWidth: 560 }}>
          <h2 style={{ font: '600 32px/1.15 var(--font-sans)', letterSpacing: '-.02em', color: '#fff', margin: 0 }}>Stop guessing which carriers are safe to work with.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: '#A9B4D8', margin: '16px 0 28px' }}>See a full risk profile for any USDOT in seconds.</p>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: 'var(--indigo)', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Contact sales <MIcon name="arrow-right" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Features, Pricing, CTA });
