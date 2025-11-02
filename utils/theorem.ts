// Utility functions for theorem numbering and state management

export const THEOREM_TYPES = ['theorem', 'lemma', 'proposition', 'corollary', 'definition', 'example', 'remark'] as const

export type TheoremType = typeof THEOREM_TYPES[number]
export type TheoremCounters = Record<TheoremType, number>

const createEmptyCounters = (): TheoremCounters => ({
  theorem: 0,
  lemma: 0,
  proposition: 0,
  corollary: 0,
  definition: 0,
  example: 0,
  remark: 0,
})

const ensureCounterStore = (): TheoremCounters => {
  if (typeof window === 'undefined') {
    return createEmptyCounters()
  }
  const win = window as any
  if (!win.__theoremCounters) {
    win.__theoremCounters = createEmptyCounters()
  }
  return win.__theoremCounters as TheoremCounters
}

const ensureCounterBases = (): Map<string, TheoremCounters> | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }
  const win = window as any
  if (!win.__theoremCounterBases) {
    win.__theoremCounterBases = new Map<string, TheoremCounters>()
  }
  return win.__theoremCounterBases as Map<string, TheoremCounters>
}

export const snapshotTheoremCounters = (): TheoremCounters => {
  const counters = ensureCounterStore()
  const snapshot = createEmptyCounters()
  for (const type of THEOREM_TYPES) {
    snapshot[type] = counters[type] ?? 0
  }
  return snapshot
}

export const restoreTheoremCounters = (snapshot?: Partial<TheoremCounters>) => {
  if (!snapshot) return
  const counters = ensureCounterStore()
  for (const type of THEOREM_TYPES) {
    counters[type] = snapshot[type] ?? 0
  }
}

export const prepareTheoremCountersForRoute = (routePath?: string) => {
  if (typeof window === 'undefined' || !routePath) return
  const bases = ensureCounterBases()
  if (!bases) return
  if (bases.has(routePath)) {
    restoreTheoremCounters(bases.get(routePath))
  } else {
    bases.set(routePath, snapshotTheoremCounters())
  }
}

export const invalidateTheoremCounterBases = (keepPath?: string) => {
  const bases = ensureCounterBases()
  if (!bases || bases.size === 0) return
  if (!keepPath) {
    bases.clear()
    return
  }
  const retained = bases.get(keepPath)
  bases.clear()
  if (retained) {
    bases.set(keepPath, retained)
  }
}

export const resetTheoremCounters = () => {
  const counters = ensureCounterStore()
  for (const type of THEOREM_TYPES) {
    counters[type] = 0
  }
  invalidateTheoremCounterBases()
}

export const resetTheoremCounter = (type: TheoremType) => {
  const counters = ensureCounterStore()
  if (counters[type] !== undefined) {
    counters[type] = 0
  }
}

export const getTheoremCounter = (type: TheoremType): number => {
  const counters = ensureCounterStore()
  return counters[type] ?? 0
}

export const ensureTheoremCounters = (): TheoremCounters => ensureCounterStore()
