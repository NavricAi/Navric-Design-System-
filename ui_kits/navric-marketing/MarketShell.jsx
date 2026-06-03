/* Navric marketing — Navbar + Footer */
const { useState, useEffect } = React;

function MIcon({ name, size = 16, style }) {
  return <i data-lucide={name} style={{ width: size, height: size, display: 'inline-flex', flexShrink: 0, ...style }}></i>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ['Product', 'Solutions', 'Resources', 'Pricing'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 32px', background: 'color-mix(in srgb, var(--surface) 82%, transparent)',
      backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <img src="../../assets/navric-mark.svg" alt="" style={{ width: 24, height: 24, color: 'var(--fg1)' }} />
          <span style={{ fontWeight: 300, fontSize: 19, letterSpacing: '.2em', color: 'var(--fg1)' }}>NAVRIC</span>
        </a>
        <nav style={{ display: 'flex', gap: 30 }} className="m-desktop">
          {links.map(l => <a key={l} href="#" style={{ fontSize: 14, color: 'var(--fg2)', textDecoration: 'none', fontWeight: 500 }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg1)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--fg2)'}>{l}</a>)}
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }} className="m-desktop">
        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg2)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Log in</a>
        <a href="#" style={{
          fontSize: 14, fontWeight: 600, color: '#fff', background: 'var(--indigo)', padding: '9px 18px',
          borderRadius: 8, textDecoration: 'none', boxShadow: 'var(--shadow-xs)',
        }}>Contact sales</a>
      </div>
      <button className="m-mobile" onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', color: 'var(--fg1)', cursor: 'pointer', display: 'none' }}>
        <MIcon name={open ? 'x' : 'menu'} size={22} />
      </button>
    </header>
  );
}

function Footer() {
  const cols = [
    ['Product', ['Carrier screening', 'Risk monitoring', 'Watchlist alerts', 'Methodology']],
    ['Solutions', ['Underwriters', 'Freight brokers', 'Fleet safety']],
    ['Company', ['About', 'Resources', 'Pricing', 'Contact']],
  ];
  return (
    <footer style={{ background: 'var(--navy)', color: '#C7D0EA', padding: '56px 32px 36px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
            <img src="../../assets/navric-mark.svg" alt="" style={{ width: 22, height: 22, color: '#fff' }} />
            <span style={{ fontWeight: 300, fontSize: 17, letterSpacing: '.2em', color: '#fff' }}>NAVRIC</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#8B97BD', maxWidth: 240, margin: 0 }}>Carrier risk intelligence built on public FMCSA safety data.</p>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: '#6B77A0', marginBottom: 14 }}>{h}</div>
            {items.map(it => <a key={it} href="#" style={{ display: 'block', fontSize: 13.5, color: '#C7D0EA', textDecoration: 'none', marginBottom: 9 }}>{it}</a>)}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1120, margin: '36px auto 0', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B77A0' }}>
        <span>© 2026 Navric Systems. Not an official FMCSA safety rating.</span>
        <span>RISK · INTELLIGENCE · COMPLIANCE</span>
      </div>
    </footer>
  );
}

Object.assign(window, { MIcon, Navbar, Footer });
