import { useState } from 'react'
import { COLORS, CLUSTER_TYPES } from '../data/colors.js'
import EmojiPickerBtn from './EmojiPickerBtn.jsx'
import MDEditorOverlay from './MDEditorOverlay.jsx'

const DEFAULT = {
  label: '',
  subtitle: '',
  icon: '📌',
  colorIdx: 0,
  clusterTypeId: CLUSTER_TYPES[0].id,
  content: '',
  badge: 'cluster',
}

function buildInitialForm(initialData, mode) {
  if (!initialData) return DEFAULT
  const base = {
    label: initialData.label ?? '',
    subtitle: initialData.subtitle ?? '',
    icon: initialData.icon ?? '📌',
    content: initialData.content ?? '',
    badge: initialData.badge ?? 'cluster',
  }
  if (mode === 'cluster') {
    const byId    = CLUSTER_TYPES.find(ct => ct.id    === initialData.categoryId)
    const byColor = CLUSTER_TYPES.find(ct => ct.color === initialData.color)
    return { ...base, colorIdx: 0, clusterTypeId: (byId ?? byColor ?? CLUSTER_TYPES[0]).id }
  }
  const colorIdx = COLORS.findIndex(c => c.color === initialData.color)
  return { ...base, colorIdx: colorIdx >= 0 ? colorIdx : 0, clusterTypeId: CLUSTER_TYPES[0].id }
}

export default function NodeForm({ mode, parentLabel, initialData, onConfirm, onCancel }) {
  const [form, setForm] = useState(() => buildInitialForm(initialData, mode))
  const [editorOpen, setEditorOpen] = useState(false)
  const isEdit = !!initialData

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const isCluster = mode === 'cluster'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.label.trim()) return

    let color, bgColor, badge, categoryId
    if (isCluster) {
      const ct = CLUSTER_TYPES.find(t => t.id === form.clusterTypeId) ?? CLUSTER_TYPES[0]
      color      = ct.color
      bgColor    = ct.bgColor
      badge      = ct.badge
      categoryId = ct.id
    } else {
      color   = COLORS[form.colorIdx].color
      bgColor = COLORS[form.colorIdx].bgColor
      badge   = form.badge || 'cluster'
    }

    onConfirm({
      label: form.label.trim(),
      subtitle: form.subtitle.trim(),
      icon: form.icon || '📌',
      color,
      bgColor,
      content: form.content,
      badge,
      categoryId,
    })
  }

  const selectedClusterType = CLUSTER_TYPES.find(t => t.id === form.clusterTypeId) ?? CLUSTER_TYPES[0]
  const selectedColor = isCluster ? selectedClusterType.color : COLORS[form.colorIdx].color

  return (
    <>
      <div className="form-backdrop" onClick={onCancel}>
        <div className="form-modal" onClick={e => e.stopPropagation()}>

          <div className="form-modal__header">
            <h2 className="form-modal__title">
              {isEdit
                ? (isCluster ? '✏️ Editar Cluster' : '✏️ Editar Card')
                : (isCluster ? '✨ Novo Cluster' : '➕ Novo Card')}
            </h2>
            {!isCluster && !isEdit && parentLabel && (
              <span className="form-modal__parent">em "{parentLabel}"</span>
            )}
            <button className="form-modal__close" onClick={onCancel}>✕</button>
          </div>

          <form onSubmit={handleSubmit} className="form-modal__body">

            {/* Ícone + Título */}
            <div className="form-row form-row--split">
              <div className="form-field">
                <label>Ícone</label>
                <EmojiPickerBtn icon={form.icon} onChange={v => set('icon', v)} />
              </div>
              <div className="form-field" style={{ flex: 1 }}>
                <label>Título *</label>
                <input
                  className="form-input"
                  placeholder="ex: Modal Verbs"
                  value={form.label}
                  onChange={e => set('label', e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Subtítulo */}
            <div className="form-field">
              <label>Subtítulo</label>
              <input
                className="form-input"
                placeholder="ex: can, could, will, would..."
                value={form.subtitle}
                onChange={e => set('subtitle', e.target.value)}
              />
            </div>

            {/* Tipo (só cluster) */}
            {isCluster ? (
              <div className="form-field">
                <label>Categoria</label>
                <div className="form-cluster-types">
                  {CLUSTER_TYPES.map(ct => (
                    <button
                      key={ct.id}
                      type="button"
                      className={`form-cluster-type ${form.clusterTypeId === ct.id ? 'form-cluster-type--active' : ''}`}
                      style={{ '--ct-color': ct.color, '--ct-bg': ct.bgColor }}
                      onClick={() => set('clusterTypeId', ct.id)}
                    >
                      <span className="form-cluster-type__dot" />
                      <span className="form-cluster-type__icon">{ct.icon}</span>
                      <span className="form-cluster-type__info">
                        <span className="form-cluster-type__name">{ct.label}</span>
                        <span className="form-cluster-type__desc">{ct.description}</span>
                      </span>
                      {form.clusterTypeId === ct.id && <span className="form-cluster-type__check">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Cor (só card) */
              <div className="form-field">
                <label>Cor</label>
                <div className="form-colors">
                  {COLORS.map((c, i) => (
                    <button
                      key={c.color}
                      type="button"
                      className={`form-color-swatch ${form.colorIdx === i ? 'form-color-swatch--active' : ''}`}
                      style={{ background: c.color }}
                      title={c.name}
                      onClick={() => set('colorIdx', i)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Conteúdo */}
            <div className="form-field">
              <label>Conteúdo <span className="form-label-hint">(Markdown)</span></label>
              <button
                type="button"
                className="form-content-btn"
                onClick={() => setEditorOpen(true)}
              >
                {form.content
                  ? <span className="form-content-preview">{form.content.substring(0, 120)}{form.content.length > 120 ? '…' : ''}</span>
                  : <span className="form-content-empty">✏ Clique para adicionar conteúdo…</span>
                }
              </button>
            </div>

            <div className="form-modal__footer">
              <button type="button" className="form-btn form-btn--cancel" onClick={onCancel}>
                Cancelar
              </button>
              <button
                type="submit"
                className="form-btn form-btn--confirm"
                style={{ background: selectedColor }}
              >
                {isEdit ? 'Salvar' : (isCluster ? 'Criar Cluster' : 'Criar Card')}
              </button>
            </div>

          </form>
        </div>
      </div>

      {editorOpen && (
        <MDEditorOverlay
          value={form.content}
          icon={form.icon}
          label={form.label || (isCluster ? 'Cluster' : 'Card')}
          color={selectedColor}
          onApply={(content, icon) => {
            set('content', content)
            set('icon', icon)
            setEditorOpen(false)
          }}
          onCancel={() => setEditorOpen(false)}
        />
      )}
    </>
  )
}
