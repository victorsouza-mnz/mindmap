// y=580 → root    y=760 → 5 filhos (passo 220px, x: 100…980, centro 645)
const OFFSET_Y = 580

const md = {
  root: `# Despite & Although

Ambos expressam **contraste** — mas com atitudes muito diferentes em relação ao fato mencionado.

| Conector | Atitude | Analogia PT |
|----------|---------|-------------|
| **Despite** | Descarta o fato — não é relevante | — |
| **Although** | Reconhece minimamente | Embora |

## O exemplo que explica tudo

> I want my father at my birthday party **despite** my mother having a beef with him.
> → *Descarto o fato completamente. Ele não entra na equação.*

> **Although** my mother has a beef with my father, I want him at my birthday party.
> → *Reconheço a situação... mas mesmo assim quero ele lá.*

A diferença não é gramatical — é de **atitude** em relação ao fato.
`,

  despite: `# Despite / In Spite Of

"Despite" **descarta** o fato — trata-o como irrelevante para o resultado. Não há reconhecimento real do conflito.

## Estrutura
\`despite + substantivo / gerúndio (-ing)\`

| Forma | Exemplo |
|-------|---------|
| + substantivo | Despite **the rain**, we went out. |
| + gerúndio | Despite **being tired**, she kept going. |
| + the fact that | Despite **the fact that** she was tired... |

## Exemplo do mundo real

> I want my father at my birthday party **despite** my mother having a beef with him.
> → *A briga deles? Irrelevante. Não muda nada para mim.*

## ⚠️ Nunca seguido de cláusula direta

| ❌ Errado | ✅ Correto |
|----------|-----------|
| Despite **it was raining**... | Despite **the rain**... |
| Despite **she was tired**... | Despite **being tired**... |

## In spite of = sinônimo exato

- **In spite of** the rain, we went out.
- **Despite** the rain, we went out. *(idênticos)*
`,

  although: `# Although / Though

"Although" **reconhece** o fato minimamente — equivale ao **"embora"** do português. O fato entra em cena, mas não muda o resultado.

## Estrutura
\`although + cláusula completa (sujeito + verbo)\`

## Exemplos

- **Although** my mother has a beef with my father, I want him at my birthday.
  → *Reconheço a situação, mas mesmo assim...*
- **Although** it was raining, we decided to go out.
- **Although** she studied hard, she didn't pass the exam.

## Though = versão informal

Mesmo significado, menos formal. Pode ir no **final** da frase:

| Posição | Exemplo |
|---------|---------|
| Início | **Though** it was raining, we went out. |
| Final | It was raining. We went out, **though**. |

> "Though" no final é muito comum no inglês falado — soa natural e descontraído.
`,

  structure: `# Estrutura Gramatical

A maior diferença prática: o que vem **depois** de cada conector.

## Despite → nunca aceita cláusula

| ✅ Correto | ❌ Errado |
|-----------|----------|
| Despite **the rain**... | ~~Despite it was raining~~... |
| Despite **being tired**... | ~~Despite she was tired~~... |
| Despite **the fact that** she was tired... | |

## Although → sempre com cláusula

| ✅ Correto | ❌ Errado |
|-----------|----------|
| Although **it was raining**... | ~~Although the rain~~... |
| Although **she was tired**... | ~~Although being tired~~... |

## Transformando um no outro

\`\`\`
Despite the rain, we went out.
        ↕
Although it was raining, we went out.
\`\`\`

\`\`\`
Despite being tired, she kept going.
        ↕
Although she was tired, she kept going.
\`\`\`

> Regra prática: se você tem um **verbo conjugado**, use although. Se tem um **substantivo ou -ing**, use despite.
`,

  evenThough: `# Even Though

Funciona igual ao "although", mas com **ênfase maior** no contraste — expressa mais surpresa ou intensidade.

## Comparação

| Frase | Tom |
|-------|-----|
| Although he practiced, he didn't improve. | Neutro |
| **Even though** he practiced every day, he didn't improve. | Surpresa / ênfase |

## Quando usar

Use "even though" quando o contraste é **surpreendente** ou você quer **reforçar** a contradição:

- **Even though** she had a broken leg, she finished the race.
- **Even though** it was freezing, he was wearing shorts.
- I still love that movie **even though** I've seen it 10 times.
- **Even though** I knew the answer, I got nervous and blanked.

## Regra
\`even though + cláusula completa\` — mesmo comportamento do although.

| Intensidade | Conector |
|-------------|----------|
| Neutro | although |
| Médio | though |
| Forte | **even though** |
`,

  others: `# Outros Conectivos de Contraste

Além de despite e although, o inglês tem vários outros conectivos para expressar contraste.

## Conectando frases separadas

| Conector | Registro | Exemplo |
|----------|----------|---------|
| **However** | Neutro/formal | It was raining. **However**, we went out. |
| **Nevertheless** | Formal | The task was hard. **Nevertheless**, she completed it. |
| **Nonetheless** | Formal | Sinônimo de nevertheless. |
| **Yet** | Literário | She tried hard, **yet** she failed. |
| **Still** | Informal | It was expensive. I bought it **still**. |

## Dentro de uma frase

| Conector | Uso | Exemplo |
|----------|-----|---------|
| **but** | Oposição direta | I was tired, **but** I kept going. |
| **while** | Contraste paralelo | **While** she loves cities, he prefers nature. |
| **whereas** | Formal | I like coffee, **whereas** she prefers tea. |

## ⚠️ Erro comum com "however"

"However" começa uma **nova frase** — não conecta duas orações diretamente:

| ❌ Errado | ✅ Correto |
|----------|-----------|
| I was tired **however** I kept going. | I was tired. **However**, I kept going. |
`,
}

export const nodes = [
  {
    id: 'da-root',
    type: 'mindNode',
    position: { x: 565, y: OFFSET_Y },
    data: { label: 'Despite & Although', subtitle: 'Contraste com atitudes diferentes', icon: '⚖️', color: '#ea580c', bgColor: '#fff7ed', isRoot: true, badge: 'conector', categoryId: 'conector', content: md.root },
  },
  {
    id: 'da-despite',
    type: 'mindNode',
    position: { x: 100, y: OFFSET_Y + 180 },
    data: { label: 'Despite / In Spite Of', subtitle: 'Descarta o fato', icon: '🚫', color: '#b91c1c', bgColor: '#fef2f2', content: md.despite },
  },
  {
    id: 'da-although',
    type: 'mindNode',
    position: { x: 320, y: OFFSET_Y + 180 },
    data: { label: 'Although / Though', subtitle: 'Reconhece minimamente', icon: '🤝', color: '#15803d', bgColor: '#f0fdf4', content: md.although },
  },
  {
    id: 'da-structure',
    type: 'mindNode',
    position: { x: 540, y: OFFSET_Y + 180 },
    data: { label: 'Estrutura Gramatical', subtitle: 'substantivo vs cláusula', icon: '🔧', color: '#1d4ed8', bgColor: '#eff6ff', content: md.structure },
  },
  {
    id: 'da-even',
    type: 'mindNode',
    position: { x: 760, y: OFFSET_Y + 180 },
    data: { label: 'Even Though', subtitle: 'Ênfase e surpresa', icon: '😲', color: '#6d28d9', bgColor: '#f5f3ff', content: md.evenThough },
  },
  {
    id: 'da-others',
    type: 'mindNode',
    position: { x: 980, y: OFFSET_Y + 180 },
    data: { label: 'Outros Conectivos', subtitle: 'however, whereas, yet...', icon: '🗂️', color: '#0369a1', bgColor: '#f0f9ff', content: md.others },
  },
]

const S = 's-bottom'
const T = 't-top'

export const edges = [
  { id: 'e-da-despite',   source: 'da-root', target: 'da-despite',   sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#b91c1c', strokeWidth: 2 } },
  { id: 'e-da-although',  source: 'da-root', target: 'da-although',  sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#15803d', strokeWidth: 2 } },
  { id: 'e-da-structure', source: 'da-root', target: 'da-structure', sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#1d4ed8', strokeWidth: 2 } },
  { id: 'e-da-even',      source: 'da-root', target: 'da-even',      sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#6d28d9', strokeWidth: 2 } },
  { id: 'e-da-others',    source: 'da-root', target: 'da-others',    sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#0369a1', strokeWidth: 2 } },
]
