import { Handle, Position } from 'reactflow'
import { useMindMap } from '../context/MindMapContext.jsx'

function AllSourceHandles() {
  return (
    <>
      <Handle type="source" position={Position.Top}    id="s-top"    style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right}  id="s-right"  style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="s-bottom" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Left}   id="s-left"   style={{ opacity: 0 }} />
    </>
  )
}

function AllTargetHandles() {
  return (
    <>
      <Handle type="target" position={Position.Top}    id="t-top"    style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Right}  id="t-right"  style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Bottom} id="t-bottom" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left}   id="t-left"   style={{ opacity: 0 }} />
    </>
  )
}

function AddCardBtn({ nodeId }) {
  const ctx = useMindMap()
  if (!ctx) return null
  return (
    <button
      className="node-add-btn"
      title="Adicionar card"
      onClick={e => { e.stopPropagation(); ctx.openAddCard(nodeId) }}
    >
      +
    </button>
  )
}

function EditBtn({ nodeId }) {
  const ctx = useMindMap()
  if (!ctx) return null
  return (
    <button
      className="node-edit-btn"
      title="Editar"
      onClick={e => { e.stopPropagation(); ctx.openEditNode(nodeId) }}
    >
      ✏️
    </button>
  )
}

export default function CustomNode({ id, data, selected }) {
  const { label, subtitle, icon, color, bgColor, isRoot, isHub } = data
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'

  // In dark mode use a subtle colour-tinted dark surface instead of light pastels
  const adaptedBg = isDark ? `${color}22` : bgColor

  /* ── Root (cluster umbrella) ──────────────── */
  if (isRoot) {
    return (
      <>
        <AllSourceHandles />
        <div
          className="mind-node mind-node--root"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
            boxShadow: selected
              ? isDark
                ? `0 0 0 3px ${color}dd, 0 0 0 7px ${color}55, 0 16px 48px ${color}66`
                : `0 0 0 3px #fff, 0 0 0 6px ${color}, 0 16px 48px ${color}55`
              : `0 8px 36px ${color}44`,
          }}
        >
          <span className="mind-node__badge" style={{ color, background: '#fff', boxShadow: `0 0 0 1.5px ${color}44` }}>
            {data.badge ?? 'sufixo'}
          </span>
          <span className="mind-node__icon">{icon}</span>
          <div className="mind-node__label mind-node__label--root">{label}</div>
          <div className="mind-node__subtitle mind-node__subtitle--root">{subtitle}</div>
          <div className="node-actions">
            <AddCardBtn nodeId={id} />
            <EditBtn nodeId={id} />
          </div>
        </div>
      </>
    )
  }

  /* ── Hub (intermediate) ───────────────────── */
  if (isHub) {
    return (
      <>
        <AllSourceHandles />
        <AllTargetHandles />
        <div
          className="mind-node mind-node--hub"
          style={{
            background: adaptedBg,
            border: `2px solid ${color}`,
            boxShadow: selected
              ? isDark
                ? `0 0 0 3px ${color}, 0 0 0 6px ${color}55, 0 8px 32px ${color}55`
                : `0 0 0 3px ${color}88, 0 8px 32px ${color}44`
              : isDark
                ? `0 4px 20px rgba(0,0,0,0.5)`
                : `0 4px 20px ${color}28`,
          }}
        >
          <span className="mind-node__icon mind-node__icon--sm">{icon}</span>
          <div>
            <div className="mind-node__label mind-node__label--hub" style={{ color }}>{label}</div>
            <div className="mind-node__subtitle">{subtitle}</div>
          </div>
          <div className="node-actions">
            <AddCardBtn nodeId={id} />
            <EditBtn nodeId={id} />
          </div>
        </div>
      </>
    )
  }

  /* ── Leaf ─────────────────────────────────── */
  return (
    <>
      <AllTargetHandles />
      <div
        className="mind-node"
        style={{
          background: adaptedBg,
          borderLeft: `4px solid ${color}`,
          boxShadow: selected
            ? isDark
              ? `0 0 0 3px ${color}, 0 0 0 6px ${color}55, 0 8px 28px ${color}55`
              : `0 0 0 2px ${color}, 0 8px 24px ${color}44`
            : isDark
              ? `0 2px 12px rgba(0,0,0,0.5)`
              : '0 2px 12px rgba(0,0,0,0.08)',
        }}
      >
        <span className="mind-node__icon mind-node__icon--sm">{icon}</span>
        <div style={{ flex: 1 }}>
          <div className="mind-node__label" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>{label}</div>
          <div className="mind-node__subtitle">{subtitle}</div>
        </div>
        <EditBtn nodeId={id} />
      </div>
    </>
  )
}
