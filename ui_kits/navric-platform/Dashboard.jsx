/* Dashboard — Navric Score, Needs Attention, Safety briefing, BASIC grid, OOS */

function Card({ children, style, pad = 22 }) {
  return <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, boxShadow: 'var(--shadow-sm)', padding: pad, ...style }}>{children}</div>;
}
function Eyebrow({ children, style }) {
  return <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '.12em', whiteSpace: 'nowrap', ...style }}>{children}</span>;
}

function ScoreCard() {
  const c = NAVRIC.carrier, score = c.score;
  return (
    <Card>
      <Eyebrow>Navric Score</Eyebrow>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14, whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 46, fontWeight: 600, letterSpacing: '-.03em', color: 'var(--fg1)' }}>{score.toFixed(1)}</span>
        <span style={{ fontSize: 12, color: 'var(--fg3)' }}>percentile</span>
      </div>
      <div style={{ position: 'relative', height: 8, borderRadius: 9999, background: 'var(--surface-container)', overflow: 'hidden', marginTop: 14 }}>
        <div style={{ position: 'absolute', inset: 0, width: score + '%', borderRadius: 9999, background: 'var(--sev-elevated)' }}></div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: 'var(--fg2)', left: '65%' }}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg3)', marginTop: 6 }}>
        <span>0</span><span style={{ color: 'var(--fg2)' }}>65 threshold</span><span>100</span>
      </div>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
        <SevBadge level="Elevated" />
        <span style={{ fontSize: 12, color: 'var(--fg3)' }}>1 BASIC over threshold</span>
      </div>
    </Card>
  );
}

function NeedsAttention() {
  const flagged = NAVRIC.basics.filter(b => b.score >= b.threshold * 0.95)
    .sort((a, b) => (b.score - b.threshold) - (a.score - a.threshold)).slice(0, 3);
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Eyebrow>Needs attention</Eyebrow>
        <span style={{ fontSize: 11.5, color: 'var(--fg3)', whiteSpace: 'nowrap' }}>{flagged.length} of 8 BASICs flagged</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {flagged.map(b => {
          const over = b.score - b.threshold;
          const level = NAVRIC.scoreLevel(b.score, b.threshold);
          return (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: 'var(--sev-' + NAVRIC.sevClass(level) + ')', flexShrink: 0 }}></span>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg1)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 13, fontWeight: 600, color: 'var(--fg1)' }}>{b.score.toFixed(1)}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: over >= 0 ? 'var(--sev-sev-ink)' : 'var(--fg3)', background: over >= 0 ? 'var(--sev-sev-tint)' : 'transparent', padding: '2px 6px', borderRadius: 5, whiteSpace: 'nowrap' }}>
                {over >= 0 ? '+' + over.toFixed(1) + ' over' : Math.abs(over).toFixed(1) + ' to thr'}
              </span>
              <div style={{ width: 44, flexShrink: 0 }}><Sparkline data={NAVRIC.spark(b.score, over >= 0)} color={over >= 0 ? 'var(--sev-elevated)' : 'var(--border-strong)'} width={44} height={20} /></div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function SafetyBriefing() {
  // Inline, unlabeled — reads like a colleague's note (no AI badge, no sparkle).
  const c = NAVRIC.carrier;
  return (
    <Card style={{ background: 'var(--canvas)', borderColor: 'var(--border)' }}>
      <Eyebrow>Safety briefing</Eyebrow>
      <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--fg1)', margin: '14px 0 0', textWrap: 'pretty' }}>{c.summary}</p>
      <div style={{ marginTop: 16, paddingTop: 13, borderTop: '1px solid var(--border-faint)', fontSize: 10.5, color: 'var(--fg3)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="history" size={12} /> Reflects data updated {c.updated} · 24-month window
      </div>
    </Card>
  );
}

function BasicCard({ b }) {
  const level = NAVRIC.scoreLevel(b.score, b.threshold);
  const over = b.score >= b.threshold;
  const cls = NAVRIC.sevClass(level);
  return (
    <button className="basic-card" style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 17, textAlign: 'left',
      cursor: 'pointer', transition: 'box-shadow var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 13 }}>
        <Icon name={b.icon} size={15} style={{ color: 'var(--fg3)' }} />
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg1)', flex: 1, lineHeight: 1.2 }}>{b.label}</span>
        <SevBadge level={level} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 28, fontWeight: 600, letterSpacing: '-.02em', color: over ? 'var(--sev-' + cls + '-ink)' : 'var(--fg1)', lineHeight: 1 }}>{b.score > 0 ? b.score.toFixed(1) : '—'}</span>
          <div style={{ fontSize: 10, color: 'var(--fg3)', marginTop: 3 }}>percentile</div>
        </div>
        {b.score > 0 && <div style={{ width: 56 }}><Sparkline data={NAVRIC.spark(b.score, over)} color={over ? 'var(--sev-' + cls + ')' : 'var(--border-strong)'} width={56} height={22} /></div>}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ height: 5, borderRadius: 9999, background: 'var(--surface-container)', overflow: 'hidden' }}>
          {b.score > 0 && <div style={{ height: '100%', width: Math.min(b.score, 100) + '%', borderRadius: 9999, background: over ? 'var(--sev-' + cls + ')' : 'var(--border-strong)' }}></div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'var(--fg3)' }}>
          <span>Threshold {b.threshold}</span>
          {b.score > 0 && (over ? <span style={{ color: 'var(--sev-sev-ink)', fontWeight: 600 }}>+{(b.score - b.threshold).toFixed(1)} over</span> : <span>{(b.threshold - b.score).toFixed(1)} to thr</span>)}
        </div>
      </div>
    </button>
  );
}

function OosRow({ d }) {
  const has = d.carrier !== null;
  const below = has && d.carrier < d.national;
  const pct = has ? Math.min((d.carrier / d.national) * 100, 100) : 0;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg1)' }}>{d.label}</span>
        <div style={{ display: 'flex', gap: 14, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 13 }}>
          <span style={{ fontWeight: 600, color: has ? (below ? 'var(--teal-text)' : 'var(--sev-sev-ink)') : 'var(--fg3)' }}>{has ? d.carrier.toFixed(1) + '%' : '—'}</span>
          <span style={{ color: 'var(--fg3)' }}>{d.national.toFixed(1)}%</span>
        </div>
      </div>
      <div style={{ height: 6, borderRadius: 9999, background: 'var(--surface-container)', overflow: 'hidden' }}>
        {has && <div style={{ height: '100%', width: pct + '%', borderRadius: 9999, background: below ? 'var(--teal)' : 'var(--sev-severe)' }}></div>}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--canvas)' }}>
      <div style={{ padding: 22, maxWidth: 1120, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.1fr', gap: 16 }}>
          <ScoreCard /><NeedsAttention /><SafetyBriefing />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
          <h2 style={{ font: '600 16px/1 var(--font-sans)', color: 'var(--fg1)', margin: 0 }}>BASIC categories</h2>
          <span style={{ fontSize: 11.5, color: 'var(--fg3)', whiteSpace: 'nowrap' }}>FMCSA SMS percentile · higher is worse</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {NAVRIC.basics.map(b => <BasicCard key={b.label} b={b} />)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card>
            <Eyebrow style={{ marginBottom: 0 }}>Out-of-service rates</Eyebrow>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14, fontSize: 10, color: 'var(--fg3)', marginTop: 8 }}><span>Carrier</span><span>National</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
              {NAVRIC.oos.map(d => <OosRow key={d.label} d={d} />)}
            </div>
          </Card>
          <Card>
            <Eyebrow>Inspection activity</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, textAlign: 'center', marginTop: 18 }}>
              {[['38', 'Inspections', 'on record'], ['14', 'Level I', 'full'], ['12', 'Violations', 'cited']].map(([n, l, s], i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 32, fontWeight: 600, letterSpacing: '-.02em', color: 'var(--fg1)' }}>{n}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg2)', marginTop: 3 }}>{l}</div>
                  <div style={{ fontSize: 10, color: 'var(--fg3)' }}>{s}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div style={{ height: 8 }}></div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard, Card, Eyebrow });
