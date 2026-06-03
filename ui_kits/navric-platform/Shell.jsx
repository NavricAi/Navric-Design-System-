/* App shell — LeftNav, TopBar, CarrierContextBar */

function LeftNav({ active, onNav }) {
  const items = [
    { id: 'dashboard',   label: 'Dashboard',   icon: 'layout-dashboard' },
    { id: 'inspections', label: 'Inspections', icon: 'clipboard-list', badge: NAVRIC.inspections.length },
    { id: 'assistant',   label: 'Assistant',   icon: 'message-circle' },
  ];
  return (
    <aside style={{
      width: 208, flexShrink: 0, background: 'var(--surface)', borderRight: '1px solid var(--border)',
      height: '100%', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '18px 18px 16px', display: 'flex', alignItems: 'center', gap: 9 }}>
        <img src="../../assets/navric-mark.svg" alt="" style={{ width: 22, height: 22, color: 'var(--fg1)' }} />
        <span style={{ fontWeight: 300, fontSize: 16, letterSpacing: '.2em', color: 'var(--fg1)' }}>NAVRIC</span>
      </div>

      <div style={{ padding: '0 12px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          background: 'var(--canvas)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 10px', cursor: 'pointer',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--fg1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sunbelt Freight</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--fg3)' }}>USDOT 2143875</div>
          </div>
          <Icon name="chevrons-up-down" size={14} style={{ color: 'var(--fg3)' }} />
        </div>
      </div>

      <div style={{ padding: '0 18px 6px' }}>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '.12em' }}>Menu</span>
      </div>
      <nav style={{ padding: '0 12px', flex: 1 }}>
        {items.map(it => {
          const on = active === it.id;
          return (
            <button key={it.id} onClick={() => onNav(it.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 11px', marginBottom: 2,
              borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left',
              font: '500 13px/1 var(--font-sans)',
              background: on ? 'var(--indigo-tint)' : 'transparent',
              color: on ? 'var(--indigo)' : 'var(--fg2)',
              transition: 'background var(--dur) var(--ease-out), color var(--dur) var(--ease-out)',
            }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = 'var(--surface-container)'; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
              <Icon name={it.icon} size={16} style={{ color: on ? 'var(--indigo)' : 'var(--fg3)' }} />
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.badge != null && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600, minWidth: 20, height: 18,
                  padding: '0 5px', borderRadius: 5, display: 'grid', placeItems: 'center',
                  background: on ? 'var(--indigo-tint-2)' : 'var(--surface-container)', color: on ? 'var(--indigo)' : 'var(--fg2)',
                }}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: 14, borderTop: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 9999, background: 'var(--indigo)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 10.5, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>NS</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg1)', whiteSpace: 'nowrap' }}>North Star</div>
          <div style={{ fontSize: 10.5, color: 'var(--fg3)' }}>Underwriting</div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ title, theme, onTheme }) {
  return (
    <div style={{
      height: 52, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px',
      background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0,
    }}>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--fg1)', whiteSpace: 'nowrap' }}>{title}</span>
      <div style={{ flex: 1 }} />
      <button onClick={onTheme} title="Toggle theme" style={iconBtn}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} /></button>
      <button style={iconBtn}><Icon name="search" size={16} /></button>
      <div style={{ position: 'relative' }}>
        <button style={iconBtn}><Icon name="bell" size={16} /></button>
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 9999, background: 'var(--sev-severe)', border: '1.5px solid var(--surface)' }}></span>
      </div>
    </div>
  );
}
const iconBtn = {
  width: 32, height: 32, display: 'grid', placeItems: 'center', borderRadius: 8,
  border: 'none', background: 'transparent', color: 'var(--fg2)', cursor: 'pointer',
};

function CarrierContextBar() {
  const c = NAVRIC.carrier;
  const meta = [
    ['hash', 'USDOT ' + c.usdot, true],
    [null, c.operation],
    ['truck', c.powerUnits + ' units'],
    ['users', c.drivers + ' drivers'],
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18, padding: '11px 22px',
      background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0, overflowX: 'auto',
    }}>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--fg1)', whiteSpace: 'nowrap' }}>{c.name}</span>
      {meta.map(([ic, txt, mono], i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg2)', whiteSpace: 'nowrap', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>
          {ic && <Icon name={ic} size={13} style={{ color: 'var(--fg3)' }} />}{txt}
        </span>
      ))}
      <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500, color: 'var(--teal-text)', background: 'var(--teal-tint)', border: '1px solid color-mix(in srgb,var(--teal) 30%,transparent)', padding: '3px 11px', borderRadius: 9999, whiteSpace: 'nowrap' }}>
        <Icon name="circle-check-big" size={13} style={{ color: 'var(--teal)' }} /> Authority Active
      </span>
    </div>
  );
}

Object.assign(window, { LeftNav, TopBar, CarrierContextBar, iconBtn });
