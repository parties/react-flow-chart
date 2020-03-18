import * as React from "react"
import { useChartState, useChartDispatch } from '../utils/chart-context'
import { __emptyChart } from '../misc/empty-chart'
import { Button, Toolbar as MuiToolbar } from '@material-ui/core'
import { useEditorDispatch, useEditorState } from '../utils/editor-context'

export const Toolbar = (params) => {
  const chartState = useChartState()
  const editorState = useEditorState()
  const chartDispatch = useChartDispatch()
  const editorDispatch = useEditorDispatch()

  const logState = React.useCallback(() => console.log(chartState), [chartState])
  const clearState = React.useCallback(() => chartDispatch({ type: 'replaceState', payload: __emptyChart }), [chartDispatch])
  const toggleEditMode = React.useCallback(() => editorDispatch({ type: 'toggleEditMode' }), [editorDispatch])

  React.useEffect(() => {
    console.log(JSON.stringify(editorState))
  }, [editorState])

  return (
    <MuiToolbar >
      <Button variant="contained" color={editorState.isEditingFacts ? 'secondary' : 'primary'} onClick={toggleEditMode}>Fact Editor</Button>
      <Button variant="contained" onClick={logState}>Log state</Button>
      <Button variant="contained" onClick={clearState}>CLEAR</Button>
    </MuiToolbar>
  )
}
