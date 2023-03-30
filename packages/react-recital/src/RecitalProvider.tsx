import { type Song, type Synth } from '@resonance-box/recital-core'
import { useMemo, type ReactNode } from 'react'
import { RecitalContext, createRecitalContext } from './RecitalProviderContext'

export type InitialConfigType = Readonly<{
  synth?: Synth
  song?: Song
}>

interface Props {
  children: ReactNode
  initialConfig: InitialConfigType
}

export function RecitalProvider({
  initialConfig,
  children,
}: Props): JSX.Element {
  const composerContext = useMemo(() => {
    console.log('useMemo RecitalProvider')
    return createRecitalContext(initialConfig)
  }, [])

  console.log('RecitalProvider composerContext:', composerContext)
  console.log('RecitalProvider RecitalContext:', RecitalContext)

  return (
    <RecitalContext.Provider value={composerContext}>
      {children}
    </RecitalContext.Provider>
  )
}

// function initializeEditor(
//   editor: LexicalEditor,
//   initialEditorState?: InitialEditorStateType
// ): void {
//   if (initialEditorState === null) {
//   } else if (initialEditorState === undefined) {
//     editor.update(() => {
//       const root = $getRoot()
//       if (root.isEmpty()) {
//         const paragraph = $createParagraphNode()
//         root.append(paragraph)
//         const activeElement = CAN_USE_DOM ? document.activeElement : null
//         if (
//           $getSelection() !== null ||
//           (activeElement !== null && activeElement === editor.getRootElement())
//         ) {
//           paragraph.select()
//         }
//       }
//     }, HISTORY_MERGE_OPTIONS)
//   } else if (initialEditorState !== null) {
//     switch (typeof initialEditorState) {
//       case 'string': {
//         const parsedEditorState = editor.parseEditorState(initialEditorState)
//         editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS)
//         break
//       }
//       case 'object': {
//         editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS)
//         break
//       }
//       case 'function': {
//         editor.update(() => {
//           const root = $getRoot()
//           if (root.isEmpty()) {
//             initialEditorState(editor)
//           }
//         }, HISTORY_MERGE_OPTIONS)
//         break
//       }
//     }
//   }
// }
