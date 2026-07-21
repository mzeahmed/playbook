export default function Topbar() {
  return (
    <header
      className="pb-header d-flex align-items-center justify-content-between px-4 px-lg-5 border-bottom sticky-top flex-shrink-0"
      style={{ height: '3.5rem', zIndex: 10 }}
    >
      <div className="d-flex align-items-center gap-2 small">
        <span style={{ color: 'var(--pb-text-muted)' }}>Coelbook</span>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.55rem', color: 'var(--pb-border)' }}></i>
        <span className="fw-medium">Coelbooks</span>
      </div>
    </header>
  )
}
