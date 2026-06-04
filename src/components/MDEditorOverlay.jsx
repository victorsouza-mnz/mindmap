import { useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import EmojiPickerBtn from './EmojiPickerBtn.jsx'
import { COLORS } from '../data/colors.js'

// ── Toolbar config ──────────────────────────────────────
const SEP = { sep: true }

const TOOLBAR = [
  { label: 'B',   title: 'Negrito (Ctrl+B)',     wrap: ['**', '**'] },
  { label: 'I',   title: 'Itálico (Ctrl+I)',     wrap: ['*', '*'] },
  { label: '~~',  title: 'Tachado',              wrap: ['~~', '~~'] },
  SEP,
  { label: 'H1',  title: 'Título 1',             line: '# ' },
  { label: 'H2',  title: 'Título 2',             line: '## ' },
  { label: 'H3',  title: 'Título 3',             line: '### ' },
  SEP,
  { label: '`',   title: 'Código inline',        wrap: ['`', '`'] },
  { label: '```', title: 'Bloco de código',      block: '```\n\n```' },
  SEP,
  { label: '—',   title: 'Divisor horizontal',  insert: '\n\n---\n\n' },
  { label: '> ',  title: 'Citação',              line: '> ' },
  { label: '• ',  title: 'Lista',               line: '- ' },
  { label: '1.',  title: 'Lista numerada',       line: '1. ' },
  SEP,
  { label: '⊞',   title: 'Tabela',
    insert: '\n| Coluna 1 | Coluna 2 | Coluna 3 |\n|----------|----------|----------|\n| Valor    | Valor    | Valor    |\n\n' },
]

// ── Helpers ─────────────────────────────────────────────
function applyWrap(val, start, end, before, after) {
  const selected = val.slice(start, end)
  return {
    newVal: val.slice(0, start) + before + selected + after + val.slice(end),
    newStart: start + before.length,
    newEnd: end + before.length,
  }
}

function applyLine(val, cursorPos, prefix) {
  const lineStart = val.lastIndexOf('\n', cursorPos - 1) + 1
  return {
    newVal: val.slice(0, lineStart) + prefix + val.slice(lineStart),
    newStart: cursorPos + prefix.length,
    newEnd: cursorPos + prefix.length,
  }
}

// ── Component ────────────────────────────────────────────
export default function MDEditorOverlay({ value, icon: initIcon, color, onApply, onCancel }) {
  const [content, setContent] = useState(value ?? '')
  const [icon, setIcon] = useState(initIcon ?? '📌')
  const textareaRef = useRef(null)

  const accentColor = color ?? COLORS[0].color

  const exec = useCallback((btn) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const val = content

    let newVal, newStart, newEnd

    if (btn.wrap) {
      ;({ newVal, newStart, newEnd } = applyWrap(val, start, end, btn.wrap[0], btn.wrap[1]))
    } else if (btn.line) {
      ;({ newVal, newStart, newEnd } = applyLine(val, start, btn.line))
    } else if (btn.insert) {
      newVal = val.slice(0, start) + btn.insert + val.slice(end)
      newStart = newEnd = start + btn.insert.length
    } else if (btn.block) {
      newVal = val.slice(0, start) + '\n' + btn.block + '\n' + val.slice(end)
      newStart = newEnd = start + btn.block.indexOf('\n') + 2
    } else {
      return
    }

    setContent(newVal)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(newStart, newEnd)
    })
  }, [content])

  return (
    <div className="mde-overlay">
      {/* Header */}
      <div className="mde-header">
        <EmojiPickerBtn icon={icon} onChange={setIcon} size="lg" />
        <span className="mde-header__label">Editor de Conteúdo</span>
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

      {/* Toolbar */}
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

      {/* Split pane */}
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
              : <p className="mde-preview__empty">O preview aparece aqui conforme você digita...</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
