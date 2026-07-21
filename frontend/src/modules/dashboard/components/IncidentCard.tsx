import type { IncidentStatus, IncidentSummary } from '../api'

const CATEGORY_BADGES = ['badge-blue', 'badge-purple', 'badge-amber', 'badge-red', 'badge-green', 'badge-cyan']

// categoryBadgeClass picks a stable color for a category from its slug, so
// the same category always gets the same badge color without needing a
// color field in the data model.
function categoryBadgeClass(slug: string): string {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  }

  return CATEGORY_BADGES[hash % CATEGORY_BADGES.length]!
}

const STATUS_LABEL: Record<IncidentStatus, string> = {
  published: 'Published',
  draft: 'Draft',
  archived: 'Archived',
}

const STATUS_BADGE: Record<IncidentStatus, string> = {
  published: 'badge-success-soft',
  draft: 'badge-warning-soft',
  archived: 'badge-muted-soft',
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`

  const years = Math.floor(months / 12)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

interface IncidentCardProps {
  incident: IncidentSummary
}

// Not clickable: there's no incident detail page yet, so this card only
// ever shows a summary — no cursor:pointer, no hover cue implying it
// leads somewhere.
export default function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <div className="col">
      <article className="pb-card card h-100 border rounded-4 p-4">
        <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
          <span className={`badge-soft ${categoryBadgeClass(incident.category.slug)}`}>
            {incident.category.name}
          </span>
          <span className={`badge-soft ${STATUS_BADGE[incident.status]}`}>
            <span className="badge-dot"></span> {STATUS_LABEL[incident.status]}
          </span>
        </div>

        <h3 className="fs-6 fw-semibold mb-0" style={{ lineHeight: 1.35 }}>
          {incident.title}
        </h3>

        <p className="small mt-3 mb-3" style={{ color: 'var(--pb-text-muted)', lineHeight: 1.5 }}>
          {incident.summary}
        </p>

        {incident.tags.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {incident.tags.map((tag) => (
              <span key={tag} className="tag-pill px-2 py-1 rounded-2" style={{ fontSize: '0.625rem' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-auto">
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-semibold"
              style={{ width: '1.25rem', height: '1.25rem', backgroundColor: 'var(--pb-surface-hover)', fontSize: '0.6rem' }}
            >
              {incident.author.first_name[0]?.toUpperCase()}
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--pb-text-muted)' }} className="fw-medium">
              {incident.author.first_name} {incident.author.last_name[0]}.
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--pb-text-muted)' }} className="d-flex align-items-center gap-1">
            <i className="fa-regular fa-clock" style={{ fontSize: '0.55rem' }}></i> {timeAgo(incident.updated_at)}
          </span>
        </div>
      </article>
    </div>
  )
}
