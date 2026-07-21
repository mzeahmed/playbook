interface PaginationProps {
  page: number
  perPage: number
  total: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, perPage, total, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const from = total === 0 ? 0 : (page - 1) * perPage + 1
  const to = Math.min(page * perPage, total)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="d-flex align-items-center justify-content-between mt-5 pt-4 border-top">
      <p className="small mb-0" style={{ color: 'var(--pb-text-muted)' }}>
        Showing{' '}
        <span className="fw-medium" style={{ color: 'var(--pb-text)' }}>
          {from}–{to}
        </span>{' '}
        of <span className="fw-medium" style={{ color: 'var(--pb-text)' }}>{total}</span> coelbooks
      </p>

      {totalPages > 1 && (
        <nav aria-label="Coelbooks pagination">
          <ul className="pagination pagination-sm mb-0 gap-1">
            <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link rounded-3"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                aria-label="Previous page"
              >
                <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.6rem' }}></i>
              </button>
            </li>
            {pages.map((p) => (
              <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                <button type="button" className="page-link rounded-3 fw-semibold" onClick={() => onPageChange(p)}>
                  {p}
                </button>
              </li>
            ))}
            <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link rounded-3"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                aria-label="Next page"
              >
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.6rem' }}></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
