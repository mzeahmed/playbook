import { useNavigate } from 'react-router-dom'

import { clearSession, getUser } from '@/modules/auth/session'

// Placeholder landing page after login. The real dashboard (playbooks,
// stats, ...) isn't built yet — this exists so the login flow has
// somewhere real to land and can be exercised end to end.
export default function DashboardView() {
  const navigate = useNavigate()
  const user = getUser()

  function handleSignOut() {
    clearSession()
    navigate('/login')
  }

  return (
    <div className="pb-wizard-shell d-flex align-items-center justify-content-center p-3">
      <div
        className="pb-card border rounded-4 p-4 p-sm-5 text-center"
        style={{ width: '100%', maxWidth: '24rem' }}
      >
        <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-4 pb-brand-mark">
          <i className="fa-solid fa-circle-check text-white" style={{ fontSize: '1.1rem' }}></i>
        </div>
        <h1 className="h5 fw-bold mb-2">You're in{user ? `, ${user.first_name}` : ''}.</h1>
        <p className="small mb-4" style={{ color: 'var(--pb-text-muted)' }}>
          {user ? `Signed in as ${user.email}. ` : ''}
          The dashboard is coming soon.
        </p>
        <button
          type="button"
          className="btn btn-sm pb-surface border"
          style={{ color: 'var(--pb-text-muted)' }}
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}