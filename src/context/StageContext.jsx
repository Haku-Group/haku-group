import { createContext, useContext, useMemo, useState } from 'react'
import { STAGES } from '../content'

const StageContext = createContext(null)

export function StageProvider({ children }) {
  const [index, setIndex] = useState(0)

  const value = useMemo(() => {
    const stage = STAGES[index]
    return {
      index,
      stage,
      setIndex,
      setStage: (id) => {
        const next = STAGES.findIndex((item) => item.id === id)
        if (next >= 0) setIndex(next)
      },
    }
  }, [index])

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>
}

export function useStage() {
  const ctx = useContext(StageContext)
  if (!ctx) throw new Error('useStage must be used within StageProvider')
  return ctx
}
