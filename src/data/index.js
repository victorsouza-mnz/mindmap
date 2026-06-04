import { nodes as ingNodes, edges as ingEdges } from './clusters/ing.js'
import { nodes as despiteNodes, edges as despiteEdges } from './clusters/despite.js'

// Registre novos clusters aqui — o restante da app usa estes exports automaticamente
export const allNodes = [
  ...ingNodes,
  ...despiteNodes,
]

export const allEdges = [
  ...ingEdges,
  ...despiteEdges,
]
