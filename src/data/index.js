import { nodes as ingNodes, edges as ingEdges } from './clusters/ing.js'
import { nodes as despiteNodes, edges as despiteEdges } from './clusters/despite.js'
import { nodes as statementNodes, edges as statementEdges } from './clusters/statement.js'
import { nodes as subjectNodes, edges as subjectEdges } from './clusters/subject.js'

// Registre novos clusters aqui — o restante da app usa estes exports automaticamente
export const allNodes = [
  ...ingNodes,
  ...despiteNodes,
  ...statementNodes,
  ...subjectNodes,
]

export const allEdges = [
  ...ingEdges,
  ...despiteEdges,
  ...statementEdges,
  ...subjectEdges,
]
