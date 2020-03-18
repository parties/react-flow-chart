import * as React from 'react'

interface IEditorContextState {
  isEditingFacts: boolean
}

type Action = { type: 'enterEditMode' } | { type: 'exitEditMode' } | { type: 'toggleEditMode' }
type Dispatch = (action: Action) => void

const EditorStateContext = React.createContext<IEditorContextState | undefined>(undefined)
const EditorDispatchContext = React.createContext<Dispatch | undefined>(undefined)

function editorReducer(state: IEditorContextState, action: Action): IEditorContextState {
  switch (action.type) {
    case "enterEditMode":
      return {
        ...state,
        isEditingFacts: true,
      }
    case 'exitEditMode':
      return {
        ...state,
        isEditingFacts: false,
      }
    case 'toggleEditMode':
      return {
        ...state,
        isEditingFacts: !state.isEditingFacts
      }
    default:
      // @ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function EditorProvider({ children }) {
  const [state, dispatch] = React.useReducer(editorReducer, {
    isEditingFacts: false,
  })

  return (
    <EditorStateContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorStateContext.Provider>
  )
}

export function useEditorState() {
  const context = React.useContext(EditorStateContext)
  if (context === undefined) {
    throw new Error('useEditorState must be used within a EditorProvider')
  }

  return context
}

export function useEditorDispatch() {
  const context = React.useContext(EditorDispatchContext)
  if (context === undefined) {
    throw new Error('useEditorDispatch must be used within a EditorProvider')
  }

  return context
}
