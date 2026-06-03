/* Assistant — grounded chat over the carrier's data. Calm, no sparkle decor. */

function Assistant() {
  const seed = [
    { role: 'user', text: 'Why is Sunbelt flagged as elevated risk?' },
    { role: 'assistant', text: "The elevated verdict is driven primarily by Vehicle Maintenance, which sits at 82 — 2 points over the 80th-percentile intervention threshold and rising for three consecutive quarters. Vehicle out-of-service rate is 31.2% against a 23.4% national average. Hours of Service (64) is a secondary concern just under threshold. Crash, Admin, and Hazmat are all within normal range." },
  ];
  const [msgs, setMsgs] = useState(seed);
  const [draft, setDraft] = useState('');
  const endRef = useRef(null);
  useEffect(() => { if (endRef.current) endRef.current.parentNode.scrollTop = endRef.current.parentNode.scrollHeight; }, [msgs]);

  const prompts = ['What should I check before binding?', 'Show the maintenance violation history', 'Compare to fleet of similar size'];

  function send(text) {
    const t = (text || draft).trim();
    if (!t) return;
    setDraft('');
    setMsgs(m => [...m, { role: 'user', text: t }]);
    setTimeout(() => setMsgs(m => [...m, { role: 'assistant', text: 'Pulling that from Sunbelt\u2019s 24-month inspection record\u2026 (demo response \u2014 wire to the screening service to answer live).' }]), 450);
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--canvas)', minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 13, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)',
                background: m.role === 'user' ? 'var(--indigo)' : 'var(--surface)', color: m.role === 'user' ? '#fff' : 'var(--fg2)', border: m.role === 'user' ? 'none' : '1px solid var(--border)' }}>
                {m.role === 'user' ? 'NS' : <img src="../../assets/navric-mark.svg" style={{ width: 16, height: 16, color: 'var(--fg2)' }} />}
              </div>
              <div style={{ maxWidth: 520, fontSize: 14, lineHeight: 1.6, color: 'var(--fg1)',
                background: m.role === 'user' ? 'var(--indigo-tint)' : 'var(--surface)',
                border: '1px solid ' + (m.role === 'user' ? 'transparent' : 'var(--border)'),
                borderRadius: 12, padding: '12px 15px', textWrap: 'pretty' }}>{m.text}</div>
            </div>
          ))}
          <div ref={endRef}></div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', padding: '14px 22px 18px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 11, flexWrap: 'wrap' }}>
            {prompts.map(p => (
              <button key={p} onClick={() => send(p)} style={{ fontSize: 12, color: 'var(--fg2)', background: 'var(--canvas)', border: '1px solid var(--border)', borderRadius: 9999, padding: '5px 12px', cursor: 'pointer' }}>{p}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, background: 'var(--canvas)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 8px 8px 14px' }}>
            <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(); }}
              placeholder="Ask about this carrier's safety record…"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--fg1)', height: 30 }} />
            <button onClick={() => send()} style={{ width: 34, height: 34, borderRadius: 8, border: 'none', background: 'var(--indigo)', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon name="arrow-up" size={17} /></button>
          </div>
          <p style={{ fontSize: 10.5, color: 'var(--fg3)', textAlign: 'center', margin: '10px 0 0' }}>Answers are grounded in public FMCSA data. Not an underwriting decision.</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Assistant });
