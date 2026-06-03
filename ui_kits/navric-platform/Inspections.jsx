/* Inspections — sortable-looking table with severity flags */

function Inspections() {
  const rows = NAVRIC.inspections;
  const cols = ['Report', 'Date', 'State', 'Level', 'Violations', 'Primary BASIC', 'Status'];
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--canvas)' }}>
      <div style={{ padding: 22, maxWidth: 1120 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 style={{ font: '600 18px/1 var(--font-sans)', color: 'var(--fg1)', margin: 0, letterSpacing: '-.02em' }}>Roadside inspections</h2>
            <p style={{ fontSize: 12.5, color: 'var(--fg3)', margin: '6px 0 0' }}>{rows.length} of 38 on record · last 24 months</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={ghostBtn}><Icon name="filter" size={15} /> Filter</button>
            <button style={ghostBtn}><Icon name="download" size={15} /> Export</button>
          </div>
        </div>

        <Card pad={0} style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--canvas)' }}>
                {cols.map(c => <th key={c} style={{ textAlign: c === 'Violations' ? 'right' : 'left', padding: '11px 16px', fontSize: 10.5, fontWeight: 600, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '.08em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border-faint)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--indigo)', fontWeight: 500 }}>{r.id}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--fg2)' }}>{r.date}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fg2)' }}>{r.state}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fg2)' }}>{r.level}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: r.violations > 0 ? 'var(--fg1)' : 'var(--fg3)' }}>{r.violations}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fg1)' }}>{r.basic}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {r.oos
                      ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600, color: 'var(--sev-sev-ink)', background: 'var(--sev-sev-tint)', border: '1px solid var(--sev-sev-border)', padding: '3px 9px', borderRadius: 9999 }}><Icon name="octagon-alert" size={13} /> Out of service</span>
                      : <SevBadge level={r.sev} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
const ghostBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 7, height: 36, padding: '0 14px', borderRadius: 8,
  font: '500 13px/1 var(--font-sans)', background: 'var(--surface)', color: 'var(--fg2)', border: '1px solid var(--border)', cursor: 'pointer',
};

Object.assign(window, { Inspections, ghostBtn });
