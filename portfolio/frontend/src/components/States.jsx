import { AlertTriangle, Inbox } from 'lucide-react'

export function Skeleton({ className = '', style }) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden="true" />
}

export function SkeletonCards({ count = 3 }) {
  return (
    <div className="grid grid-3" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div className="card" key={i}>
          <Skeleton style={{ height: 150, marginBottom: 16 }} />
          <Skeleton style={{ height: 18, width: '70%', marginBottom: 10 }} />
          <Skeleton style={{ height: 12, marginBottom: 8 }} />
          <Skeleton style={{ height: 12, width: '85%' }} />
        </div>
      ))}
    </div>
  )
}

export function EmptyState({ title = 'Nothing here yet', children }) {
  return (
    <div className="state-box">
      <Inbox size={28} aria-hidden="true" />
      <strong>{title}</strong>
      {children && <p>{children}</p>}
    </div>
  )
}

export function OfflineNotice() {
  return (
    <div className="notice" role="status">
      <AlertTriangle size={16} aria-hidden="true" />
      <span>The API is not reachable right now, so sample content is shown.</span>
    </div>
  )
}
