// y=1160 → root    y=1340 → filhos (passo 220px, x: 100…1100, centro 640)
const OFFSET_Y = 1160

const md = {
  root: `# Statement in English

Um **statement** (oração declarativa) é a estrutura mais comum do inglês — usada para **afirmar ou negar** um fato.

## Por que isso importa

O inglês organiza as orações de forma mais rígida que o português. Entender como a oração é construída e **separada** evita erros muito comuns.

## Os 4 tipos de oração em inglês

| Tipo | Função | Exemplo |
|------|--------|---------|
| **Statement** | Afirmar / negar | She works here. |
| **Question** | Perguntar | Does she work here? |
| **Command** | Ordenar | Work harder. |
| **Exclamation** | Exclamar | What a great job! |

> Neste cluster, foco total no **Statement** — a espinha dorsal da gramática inglesa.
`,

  svo: `# Estrutura SVO

O inglês segue uma ordem quase **imutável**: **Sujeito → Verbo → Objeto/Complemento**.

## A fórmula

\`\`\`
S        +  V       +  O/C
She      +  loves   +  coffee.
The team +  won     +  the game.
I        +  am      +  happy.
\`\`\`

## Por que a ordem é tão rígida?

No português, a flexão verbal indica quem faz o quê — "Amei-o" e "Ele me amou" funcionam. No inglês, sem flexão forte, a **posição** carrega esse significado:

| ✅ Inglês | Significado |
|----------|-------------|
| The cat chased the dog. | O gato perseguiu o cachorro. |
| The dog chased the cat. | O cachorro perseguiu o gato. |

Trocar a ordem muda completamente o sentido — ou deixa a frase sem sentido.

## Complementos opcionais

A estrutura pode crescer com advérbios e adjuntos — mas o núcleo SVO não muda:

\`\`\`
She       works      here      every day.
[S]       [V]        [lugar]   [tempo]
\`\`\`

> Regra geral de advérbios: **lugar antes de tempo** no final da frase.
`,

  affirmative: `# Affirmative & Negative

A diferença entre afirmar e negar em inglês está no **auxiliar** — nunca no verbo principal.

## Affirmative (afirmativa)

Estrutura direta: **S + V + ...**

- She **works** here.
- They **are** happy.
- I **have** a car.

## Negative (negativa)

Nunca se adiciona "not" diretamente ao verbo principal (exceto "to be" e "to have" como auxiliares).

| Tempo | Estrutura | Exemplo |
|-------|-----------|---------|
| Simple Present | S + **do/does not** + V base | She **doesn't** work here. |
| Simple Past | S + **did not** + V base | They **didn't** win. |
| Presente cont. | S + **to be + not** + V-ing | I **am not** working. |
| Com auxiliar | S + **aux + not** + V base | She **can't** drive. |

## ⚠️ Erro clássico do falante de português

| ❌ Errado | ✅ Correto |
|----------|-----------|
| She not works here. | She **doesn't** work here. |
| I not like it. | I **don't** like it. |
| He no have a car. | He **doesn't have** a car. |

> O verbo principal **nunca recebe o "not"** diretamente no inglês padrão.
`,

  separation: `# Separação de Orações

O inglês tem regras claras sobre como **conectar** ou **separar** orações. Esse é um dos pontos onde brasileiros mais erram.

## 1. Orações independentes

Duas orações completas (com sujeito e verbo) precisam de:
- Um **ponto final**: *She was tired. She kept going.*
- Um **coordinating conjunction** (FANBOYS): *She was tired, **but** she kept going.*
- Um **ponto e vírgula**: *She was tired; she kept going.*

## 2. O erro do "Comma Splice"

Unir duas orações independentes **só com vírgula** é erro gramatical no inglês:

| ❌ Comma Splice | ✅ Correto |
|----------------|-----------|
| She was tired, she kept going. | She was tired, **but** she kept going. |
| I called him, he didn't answer. | I called him, **but** he didn't answer. |

## 3. Orações dependentes (subordinadas)

Uma oração dependente **não pode ficar sozinha** — precisa de uma oração principal:

| ❌ Fragment | ✅ Correto |
|------------|-----------|
| *Because she was tired.* | She stopped **because she was tired**. |
| *Although it was raining.* | **Although it was raining**, we went out. |

## 4. Conjunções mais usadas

| Tipo | Exemplos |
|------|---------|
| Coordenação | and, but, or, so, yet, for, nor |
| Contraste | although, even though, while |
| Causa | because, since, as |
| Tempo | when, after, before, until |
`,

  simple: `# Simple, Compound & Complex

Os três tipos de **statement** conforme a quantidade e relação entre orações.

## Simple Sentence

Uma única oração independente com **um sujeito e um verbo**.

- *She laughed.*
- *The dog ran across the yard.*
- *My friends and I went to the park.* ← sujeito composto, ainda é simples

## Compound Sentence

**Duas ou mais orações independentes** unidas por FANBOYS + vírgula ou ponto e vírgula.

\`Oração independente + , + FANBOYS + oração independente\`

- *I was tired, **but** I stayed.*
- *She called, **and** he answered.*
- *It was raining; we stayed inside.*

## Complex Sentence

**Uma oração independente + uma ou mais dependentes** (com subordinating conjunction).

\`Oração dependente, + oração principal\`
\`Oração principal + oração dependente\`

- ***Although** it was late, she kept studying.*
- *He left **before** the movie ended.*
- *I'll call you **when** I arrive.*

## Compound-Complex

Combina os dois — ao menos duas independentes e uma dependente:

- *She was tired, **but** she kept going **because** she had a deadline.*
`,

  punctuation: `# Pontuação na Oração

A pontuação inglesa tem regras específicas que diferem do português — e errar aqui afeta a clareza da frase.

## Vírgula antes de FANBOYS

Quando duas **orações independentes** são unidas por and, but, or, so, yet → vírgula antes da conjunção:

- *She studied hard**, but** she failed.*
- *I wanted to go**, but** it was too late.*

Sem oração completa no segundo lado → sem vírgula:
- *She studied hard **and** passed.* (sem vírgula — não há sujeito no segundo trecho)

## Oração subordinada no início → vírgula

Quando a oração dependente vem primeiro, usa vírgula após ela:

- ***Because it was raining**, we stayed inside.*
- ***Although she tried**, she couldn't finish.*

Quando vem depois → sem vírgula (geralmente):
- *We stayed inside **because it was raining**.*

## Ponto e vírgula

Une orações independentes sem conjunção — o conteúdo deve ter relação próxima:

- *It was cold; she wore a coat.*
- *He arrived late; the meeting had already started.*

## Dois-pontos

Introduz uma explicação, lista ou consequência:

- *She had one goal: to win.*
- *I need three things: patience, practice, and time.*
`,
}

export const nodes = [
  {
    id: 'st-root',
    type: 'mindNode',
    position: { x: 610, y: OFFSET_Y },
    data: { label: 'Statement in English', subtitle: 'Como a oração funciona em inglês', icon: '📝', color: '#0369a1', bgColor: '#f0f9ff', isRoot: true, badge: 'base', categoryId: 'estrutura', content: md.root },
  },
  {
    id: 'st-svo',
    type: 'mindNode',
    position: { x: 100, y: OFFSET_Y + 180 },
    data: { label: 'Estrutura SVO', subtitle: 'Sujeito → Verbo → Objeto', icon: '🔢', color: '#0369a1', bgColor: '#e0f2fe', content: md.svo },
  },
  {
    id: 'st-affirmative',
    type: 'mindNode',
    position: { x: 320, y: OFFSET_Y + 180 },
    data: { label: 'Affirmative & Negative', subtitle: 'Afirmar e negar com auxiliares', icon: '✅', color: '#15803d', bgColor: '#f0fdf4', content: md.affirmative },
  },
  {
    id: 'st-separation',
    type: 'mindNode',
    position: { x: 540, y: OFFSET_Y + 180 },
    data: { label: 'Separação de Orações', subtitle: 'Como conectar e separar orações', icon: '🔗', color: '#b91c1c', bgColor: '#fef2f2', content: md.separation },
  },
  {
    id: 'st-types',
    type: 'mindNode',
    position: { x: 760, y: OFFSET_Y + 180 },
    data: { label: 'Simple, Compound & Complex', subtitle: 'Os três tipos de statement', icon: '🏗️', color: '#7c3aed', bgColor: '#f5f3ff', content: md.simple },
  },
  {
    id: 'st-punctuation',
    type: 'mindNode',
    position: { x: 980, y: OFFSET_Y + 180 },
    data: { label: 'Pontuação', subtitle: 'Vírgula, ponto e vírgula, dois-pontos', icon: '🖊️', color: '#b45309', bgColor: '#fffbeb', content: md.punctuation },
  },
]

const S = 's-bottom'
const T = 't-top'

export const edges = [
  { id: 'e-st-svo',         source: 'st-root', target: 'st-svo',         sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#0369a1', strokeWidth: 2 } },
  { id: 'e-st-affirmative', source: 'st-root', target: 'st-affirmative', sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#15803d', strokeWidth: 2 } },
  { id: 'e-st-separation',  source: 'st-root', target: 'st-separation',  sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#b91c1c', strokeWidth: 2 } },
  { id: 'e-st-types',       source: 'st-root', target: 'st-types',       sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#7c3aed', strokeWidth: 2 } },
  { id: 'e-st-punctuation', source: 'st-root', target: 'st-punctuation', sourceHandle: S, targetHandle: T, type: 'smoothstep', style: { stroke: '#b45309', strokeWidth: 2 } },
]
