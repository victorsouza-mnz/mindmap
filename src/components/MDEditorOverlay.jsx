import { useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import EmojiPickerBtn from './EmojiPickerBtn.jsx'
import { COLORS } from '../data/colors.js'
import { TOOLBAR, execToolbar } from './mdToolbar.js'

export default function MDEditorOverlay({ value, icon: initIcon, color, label, onApply, onCancel }) {
  const [content, setContent] = useState(value ?? '')
  const [icon, setIcon]       = useState(initIcon ?? '📌')
  const textareaRef           = useRef(null)

  const accentColor = color ?? COLORS[0].color

  const exec = useCallback((btn) => {
    execToolbar(btn, content, textareaRef, setContent)
  }, [content])

  return (
    <>
      <div className="mde-backdrop" onClick={onCancel} />
      <div className="mde-overlay">

        <div className="mde-header">
          <EmojiPickerBtn icon={icon} onChange={setIcon} size="lg" />
          <span className="mde-header__label">{label || 'Conteúdo'}</span>
          <div className="mde-header__actions">
            <button className="form-btn form-btn--cancel" onClick={onCancel}>Cancelar</button>
            <button
              className="form-btn form-btn--confirm"
              style={{ background: accentColor }}
              onClick={() => onApply(content, icon)}
            >
              ✓ Aplicar
            </button>
          </div>
        </div>

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

        <div className="mde-panes">
          <div className="mde-pane mde-pane--editor">
            <div className="mde-pane__label">Editar</div>
            <textarea
              ref={textareaRef}
              className="mde-textarea"
              value={content}
              onChange={e => setContent(e.target.value)}
              spellCheck={false}
              autoFocus
            />
          </div>

          <div className="mde-pane mde-pane--preview">
            <div className="mde-pane__label">Preview</div>
            <div className="mde-preview md-content">
              {content
                ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                : <p className="mde-preview__empty">O preview aparece aqui conforme você digita…</p>
              }
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
