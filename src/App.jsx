import { useCallback, useState, useRef, useMemo, useEffect } from 'react'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from 'reactflow'

import CustomNode from './components/CustomNode.jsx'
import MarkdownPanel from './components/MarkdownPanel.jsx'
import NodeForm from './components/NodeForm.jsx'
import { MindMapContext } from './context/MindMapContext.jsx'
import { allNodes, allEdges } from './data/index.js'

const nodeTypes = { mindNode: CustomNode }
const STORAGE_KEY = 'english-mindmap-positions'
const THEME_KEY = 'english-mindmap-theme'

function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem(THEME_KEY) === 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  }, [dark])

  return [dark, () => setDark(d => !d)]
}

function loadNodes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return allNodes.map(n => ({ ...n, position: saved[n.id] ?? n.position }))
  } catch {
    return allNodes
  }
}

function savePositions(nodes) {
  const positions = Object.fromEntries(nodes.map(n => [n.id, n.position]))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
}

export default function App() {
  const [nodes, setNodes] = useNodesState(loadNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(allEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [toast, setToast] = useState(null)
  const [formState, setFormState] = useState({ open: false, mode: 'card', parentId: null })
  const fileInputRef = useRef(null)

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  /* ── posições ─────────────────────────────── */
  const onNodesChange = useCallback((changes) => {
    setNodes(nds => {
      const updated = applyNodeChanges(changes, nds)
      if (changes.some(c => c.type === 'position' && c.dragging === false)) {
        savePositions(updated)
      }
      return updated
    })
  }, [setNodes])

  /* ── painel de conteúdo ───────────────────── */
  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(prev => prev?.id === node.id ? null : node)
  }, [])

  const closePanel = useCallback(() => setSelectedNode(null), [])

  /* ── reset ────────────────────────────────── */
  const resetPositions = useCallback(() => {
    if (!confirm('Resetar todas as posições para o layout padrão?')) return
    localStorage.removeItem(STORAGE_KEY)
    setNodes(allNodes)
    showToast('Posições resetadas')
  }, [setNodes, showToast])

  /* ── download JSON ────────────────────────── */
  const handleDownload = useCallback(() => {
    const payload = { version: '1.0', exportedAt: new Date().toISOString(), nodes, edges }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mindmap-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('JSON baixado!')
  }, [nodes, edges, showToast])

  /* ── carregar JSON ────────────────────────── */
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result)
        if (!Array.isArray(data.nodes) || !Array.isArray(data.edges))
          throw new Error('Formato inválido: esperado { nodes, edges }')
        setNodes(data.nodes)
        setEdges(data.edges)
        savePositions(data.nodes)
        setSelectedNode(null)
        showToast(`Mapa carregado · ${data.nodes.length} nós`)
      } catch (err) {
        showToast(err.message || 'Erro ao ler JSON', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [setNodes, setEdges, showToast])

  /* ── criar nó ────────────────────────────── */
  const openAddCard = useCallback((parentId) => {
    setFormState({ open: true, mode: 'card', parentId })
  }, [])

  const openCreateCluster = useCallback(() => {
    setFormState({ open: true, mode: 'cluster', parentId: null })
  }, [])

  const closeForm = useCallback(() => {
    setFormState({ open: false, mode: 'card', parentId: null })
  }, [])

  const handleFormConfirm = useCallback((formData) => {
    const { label, subtitle, icon, color, bgColor, content, badge } = formData
    const id = `node-${crypto.randomUUID()}`

    if (formState.mode === 'cluster') {
      const maxY = nodes.reduce((m, n) => Math.max(m, n.position.y), 0)
      const newNode = {
        id,
        type: 'mindNode',
        position: { x: 600, y: maxY + 250 },
        data: { label, subtitle, icon, color, bgColor, isRoot: true, badge, content },
      }
      setNodes(nds => {
        const updated = [...nds, newNode]
        savePositions(updated)
        return updated
      })
      showToast(`Cluster "${label}" criado!`)
    } else {
      const parent = nodes.find(n => n.id === formState.parentId)
      const siblingCount = edges.filter(e => e.source === formState.parentId).length
      const newNode = {
        id,
        type: 'mindNode',
        position: {
          x: (parent?.position.x ?? 400) - 100 + siblingCount * 230,
          y: (parent?.position.y ?? 400) + 200,
        },
        data: { label, subtitle, icon, color, bgColor, content },
      }
      const newEdge = {
        id: `e-${formState.parentId}-${id}`,
        source: formState.parentId,
        target: id,
        sourceHandle: 's-bottom',
        targetHandle: 't-top',
        type: 'smoothstep',
        style: { stroke: color, strokeWidth: 2 },
      }
      setNodes(nds => {
        const updated = [...nds, newNode]
        savePositions(updated)
        return updated
      })
      setEdges(eds => [...eds, newEdge])
      showToast(`Card "${label}" adicionado!`)
    }

    closeForm()
  }, [formState, nodes, edges, setNodes, setEdges, closeForm, showToast])

  /* ── context value (memoized) ─────────────── */
  const ctxValue = useMemo(() => ({ openAddCard, openCreateCluster }), [openAddCard, openCreateCluster])

  /* ── parent label for form ────────────────── */
  const parentLabel = formState.parentId
    ? nodes.find(n => n.id === formState.parentId)?.data?.label
    : null

  return (
    <MindMapContext.Provider value={ctxValue}>
      <div className="app-shell">
        <header className="app-header">
          <span className="app-header__flag">🇺🇸</span>
          <h1 className="app-header__title">English Mind Map</h1>
          <span className="app-header__tag">Gramática</span>

          <div className="app-header__actions">
            <span className="app-header__hint">Arrastar = selecionar · Botão direito = mover tela</span>

            <button className="app-header__btn app-header__btn--new" onClick={openCreateCluster}>
              ＋ Novo Cluster
            </button>

            <input ref={fileInputRef} type="file" accept=".json,application/json" style={{ display: 'none' }} onChange={handleFileChange} />
            <button className="app-header__btn" onClick={() => fileInputRef.current.click()}>
              📂 Carregar
            </button>
            <button className="app-header__btn app-header__btn--primary" onClick={handleDownload}>
              ⬇ Baixar JSON
            </button>
            <button className="app-header__btn app-header__btn--ghost" onClick={resetPositions}>
              ↺ Reset
            </button>
          </div>
        </header>

        <div className="map-wrap">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.18 }}
            minZoom={0.2}
            maxZoom={2}
            deleteKeyCode={null}
            selectionOnDrag
            panOnDrag={[1, 2]}
            selectionMode="partial"
            multiSelectionKeyCode="Shift"
            onContextMenu={(e) => e.preventDefault()}
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#cbd5e1" />
            <Controls showInteractive={false} />
            <MiniMap nodeColor={(n) => n.data.color} maskColor="rgba(240,244,248,0.7)" pannable zoomable />
          </ReactFlow>

          <MarkdownPanel node={selectedNode} onClose={closePanel} />

          {toast && <div className={`toast toast--${toast.type}`}>{toast.msg}</div>}
        </div>

        {formState.open && (
          <NodeForm
            mode={formState.mode}
            parentLabel={parentLabel}
            onConfirm={handleFormConfirm}
            onCancel={closeForm}
          />
        )}
      </div>
    </MindMapContext.Provider>
  )
}
