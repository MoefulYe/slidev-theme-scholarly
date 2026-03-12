// Utility functions for theorem numbering and state management

export const THEOREM_TYPES = ['theorem', 'lemma', 'proposition', 'corollary', 'definition', 'example', 'remark', 'proof', 'note', 'claim'] as const
export type TheoremType = typeof THEOREM_TYPES[number]
export type TheoremCounters = Record<TheoremType, number>

// 1. Occurrence Index Management
const getOccurrenceState = () => {
  if (typeof window === 'undefined') return { counts: {} as Record<string, number> }
  const win = window as any
  if (!win.__theoremOccurrences) win.__theoremOccurrences = { counts: {} }
  return win.__theoremOccurrences as { counts: Record<string, number> }
}

export const getOccurrenceIndex = (slideNo: number, type: TheoremType): number => {
  const state = getOccurrenceState()
  const key = `${slideNo}-${type}`
  state.counts[key] = (state.counts[key] || 0) + 1
  return state.counts[key]
}

export const releaseOccurrenceIndex = (slideNo: number, type: TheoremType) => {
  const state = getOccurrenceState()
  const key = `${slideNo}-${type}`
  if (state.counts[key]) {
    state.counts[key] = Math.max(0, state.counts[key] - 1)
  }
}

// 2. Pure Lookup with Caching
interface CacheState {
  fingerprint: string
  counts: Record<number, Record<TheoremType, number>>
}

const getCacheState = (): CacheState => {
  if (typeof window === 'undefined') return { fingerprint: '', counts: {} }
  const win = window as any
  if (!win.__theoremCache) win.__theoremCache = { fingerprint: '', counts: {} }
  return win.__theoremCache
}

const computeFingerprint = (slides: any[]): string => {
  return slides.map(s => {
    const content = s?.meta?.slide?.content || s?.content || ''
    return content.length
  }).join(',')
}

const countTheoremsInContent = (content: string, targetType: TheoremType): number => {
  if (!content) return 0
  let count = 0
  
  const cleanedContent = content.replace(/```[\s\S]*?```/g, '')
  
  const containerRegex = /^:::\s*([a-zA-Z]+)(.*)$/gm
  let match
  while ((match = containerRegex.exec(cleanedContent)) !== null) {
    if (match[1].toLowerCase() === targetType) count++
  }
  
  const componentRegex = /<theorem\b([^>]*)>/gi
  while ((match = componentRegex.exec(cleanedContent)) !== null) {
    const attrs = match[1]
    const typeMatch = attrs.match(/type=["']([^"']+)["']/)
    const type = typeMatch ? typeMatch[1].toLowerCase() : 'theorem'
    if (type === targetType) count++
  }
  
  return count
}

const rebuildCache = (slides: any[], state: CacheState, fingerprint: string) => {
  state.counts = {}
  state.fingerprint = fingerprint
  
  for (let i = 0; i < slides.length; i++) {
    const slideNo = i + 1
    const slide = slides[i]
    const content = slide?.meta?.slide?.content || slide?.content || ''
    
    state.counts[slideNo] = {} as Record<TheoremType, number>
    for (const type of THEOREM_TYPES) {
      state.counts[slideNo][type] = countTheoremsInContent(content, type)
    }
  }
}

export const lookupTheoremNumber = (slides: any[], slideNo: number, type: TheoremType, occurrenceIndex: number): number => {
  if (!slides || slides.length === 0) return occurrenceIndex
  
  const state = getCacheState()
  const fingerprint = computeFingerprint(slides)
  
  if (state.fingerprint !== fingerprint) {
    rebuildCache(slides, state, fingerprint)
  }
  
  let totalBefore = 0
  for (let i = 1; i < slideNo; i++) {
    totalBefore += state.counts[i]?.[type] || 0
  }
  
  return totalBefore + occurrenceIndex
}

// 3. Backward Compatibility (Legacy functions)
const createEmptyCounters = (): TheoremCounters => ({
  theorem: 0, lemma: 0, proposition: 0, corollary: 0, definition: 0,
  example: 0, remark: 0, proof: 0, note: 0, claim: 0,
})

export const snapshotTheoremCounters = (): TheoremCounters => createEmptyCounters()
export const restoreTheoremCounters = (snapshot?: Partial<TheoremCounters>) => {}
export const prepareTheoremCountersForRoute = (routePath?: string) => {}
export const invalidateTheoremCounterBases = (keepPath?: string) => {}
export const resetTheoremCounters = () => {}
export const resetTheoremCounter = (type: TheoremType) => {}
export const getTheoremCounter = (type: TheoremType): number => 0
export const getTheoremNumber = getTheoremCounter // For proposed backwards compatibility
export const ensureTheoremCounters = (): TheoremCounters => createEmptyCounters()
