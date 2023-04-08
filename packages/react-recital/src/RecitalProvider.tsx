import { type Song, type Synth } from '@resonance-box/recital-core'
import { useMemo, type ReactNode } from 'react'
import { RecitalContext, createRecitalContext } from './RecitalProviderContext'

export type InitialConfigType = Readonly<{
  synth?: Synth
  song?: Song
}>

interface Props {
  children: ReactNode
  initialConfig?: InitialConfigType
}

export function RecitalProvider({
  initialConfig,
  children,
}: Props): JSX.Element {
  const composerContext = useMemo(() => {
    return createRecitalContext(initialConfig)
  }, [])

  return (
    <RecitalContext.Provider value={composerContext}>
      {children}
    </RecitalContext.Provider>
  )
}
