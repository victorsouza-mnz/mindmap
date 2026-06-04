import { createContext, useContext } from 'react'

export const MindMapContext = createContext(null)
export const useMindMap = () => useContext(MindMapContext)
