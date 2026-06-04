export const SEP = { sep: true }

export const TOOLBAR = [
  { label: 'B',    title: 'Negrito',           wrap: ['**', '**'] },
  { label: 'I',    title: 'Itálico',           wrap: ['*', '*'] },
  { label: '~~',   title: 'Tachado',           wrap: ['~~', '~~'] },
  SEP,
  { label: 'H1',   title: 'Título 1',          line: '# ' },
  { label: 'H2',   title: 'Título 2',          line: '## ' },
  { label: 'H3',   title: 'Título 3',          line: '### ' },
  SEP,
  { label: '`',    title: 'Código inline',     wrap: ['`', '`'] },
  { label: '```',  title: 'Bloco de código',   block: '```\n\n```' },
  SEP,
  { label: '—',    title: 'Divisor',           insert: '\n\n---\n\n' },
  { label: '>',    title: 'Citação',           line: '> ' },
  { label: '•',    title: 'Lista',             line: '- ' },
  { label: '1.',   title: 'Lista numerada',    line: '1. ' },
  SEP,
  { label: '⊞',    title: 'Tabela',
    insert: '\n| Coluna 1 | Coluna 2 | Coluna 3 |\n|----------|----------|----------|\n| Valor    | Valor    | Valor    |\n\n' },
]

export function execToolbar(btn, content, textareaRef, setContent) {
  const el = textareaRef.current
  if (!el) return
  const start = el.selectionStart
  const end = el.selectionEnd

  let newVal, newStart, newEnd

  if (btn.wrap) {
    const selected = content.slice(start, end)
    newVal = content.slice(0, start) + btn.wrap[0] + selected + btn.wrap[1] + content.slice(end)
    newStart = start + btn.wrap[0].length
    newEnd   = end   + btn.wrap[0].length
  } else if (btn.line) {
    const lineStart = content.lastIndexOf('\n', start - 1) + 1
    newVal = content.slice(0, lineStart) + btn.line + content.slice(lineStart)
    newStart = newEnd = start + btn.line.length
  } else if (btn.insert) {
    newVal = content.slice(0, start) + btn.insert + content.slice(end)
    newStart = newEnd = start + btn.insert.length
  } else if (btn.block) {
    newVal = content.slice(0, start) + '\n' + btn.block + '\n' + content.slice(end)
    newStart = newEnd = start + btn.block.indexOf('\n') + 2
  } else {
    return
  }

  setContent(newVal)
  requestAnimationFrame(() => {
    el.focus()
    el.setSelectionRange(newStart, newEnd)
  })
}
