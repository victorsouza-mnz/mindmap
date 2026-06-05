import { useState, useEffect, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TOOLBAR, execToolbar } from './mdToolbar.js'

const SIDE_KEY = 'english-panel-side'

export default function MarkdownPanel({ node, onClose, onUpdateContent }) {
  const [side, setSide]       = useState(() => localStorage.getItem(SIDE_KEY) || 'right')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState('')
  const textareaRef           = useRef(null)

  useEffect(() => {
    setEditing(false)
    setDraft(node?.data?.content ?? '')
  }, [node?.id])

  const toggleSide = () => {
    const next = side === 'right' ? 'left' : 'right'
    setSide(next)
    localStorage.setItem(SIDE_KEY, next)
  }

  const startEdit = () => {
    setDraft(node.data.content ?? '')
    setEditing(true)
  }

  const saveEdit = () => {
    onUpdateContent(node.id, draft)
    setEditing(false)
  }

  const cancelEdit = () => {
    setDraft(node.data.content ?? '')
    setEditing(false)
  }

  const exec = useCallback((btn) => {
    execToolbar(btn, draft, textareaRef, setDraft)
  }, [draft])

  if (!node) return null

  const { label, icon, color, bgColor } = node.data

  return (
    <>
      <div className="panel-backdrop" onClick={onClose} />
      <aside
        className={`panel panel--${side}${editing ? ' panel--editing' : ''}`}
        style={{ borderTop: `4px solid ${color}` }}
      >
        <div className="panel__header" style={{ background: bgColor }}>
          <div className="panel__header-left">
            <span className="panel__icon" style={{ background: color }}>{icon}</span>
            <span className="panel__title" style={{ color }}>{label}</span>
          </div>
          <div className="panel__header-actions">
            {editing ? (
              <>
                <button className="panel__edit-save" onClick={saveEdit} title="Salvar">
                  Salvar
                </button>
                <button className="panel__side-btn" onClick={cancelEdit} title="Cancelar">
                  ✕
                </button>
              </>
            ) : (
              <button className="panel__side-btn" onClick={startEdit} title="Editar conteúdo">
                ✏
              </button>
            )}
            <button
              className="panel__side-btn"
              onClick={toggleSide}
              title={side === 'right' ? 'Mover para a esquerda' : 'Mover para a direita'}
              aria-label="Alternar lado do painel"
            >
              {side === 'right' ? '←' : '→'}
            </button>
            <button className="panel__close" onClick={onClose} aria-label="Fechar">
              ✕
            </button>
          </div>
        </div>

        {editing ? (
          <div className="panel__editor">
            <div className="mde-toolbar">
              {TOOLBAR.map((btn, i) =>
                btn.sep
                  ? <div key={i} className="mde-toolbar__sep" />
                  : (
                    <button
                      key={i}
                      type="button"
                      className="mde-toolbar__btn"
                      title={btn.title}
                      onClick={() => exec(btn)}
                    >
                      {btn.label}
                    </button>
                  )
              )}
            </div>
            <div className="panel__editor-split">
              <textarea
                ref={textareaRef}
                className="panel__editor-textarea"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Escreva em Markdown…"
                autoFocus
              />
              <div className="panel__editor-preview md-content">
                {draft
                  ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{draft}</ReactMarkdown>
                  : <p className="panel__editor-empty">Prévia aparece aqui…</p>
                }
              </div>
            </div>
          </div>
        ) : (
          <div className="panel__body md-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{node.data.content}</ReactMarkdown>
          </div>
        )}
      </aside>
    </>
  )
}
