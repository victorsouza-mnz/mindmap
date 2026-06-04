import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownPanel({ node, onClose }) {
  if (!node) return null

  const { label, icon, color, bgColor, content } = node.data

  return (
    <>
      <div className="panel-backdrop" onClick={onClose} />
      <aside className="panel" style={{ borderTop: `4px solid ${color}` }}>
        <div className="panel__header" style={{ background: bgColor }}>
          <div className="panel__header-left">
            <span className="panel__icon" style={{ background: color }}>{icon}</span>
            <span className="panel__title" style={{ color }}>{label}</span>
          </div>
          <button className="panel__close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>
        <div className="panel__body md-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </aside>
    </>
  )
}
