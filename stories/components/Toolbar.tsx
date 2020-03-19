import * as React from "react"
import { useChartState, useChartDispatch } from '../utils/chart-context'
import { __emptyChart } from '../misc/empty-chart'
import { Button, Toolbar as MuiToolbar } from '@material-ui/core'

export const Toolbar = (params) => {
  const chartState = useChartState()
  const chartDispatch = useChartDispatch()

  // const logState = React.useCallback(() => console.log(chartState), [chartState])
  // const clearState = React.useCallback(() => chartDispatch({ type: 'replaceState', payload: __emptyChart }), [chartDispatch])
  const toggleEditMode = React.useCallback(() => chartDispatch({ type: !chartState.isEditing ? 'beginEditing' : 'endEditing' }), [chartDispatch])

  return (
    <MuiToolbar >
      <Button variant="contained" color={chartState.isEditing ? 'secondary' : 'primary'} onClick={toggleEditMode}>Fact Editor</Button>
      {chartState.isEditing && (
        <div>
          <Button
            color="primary"
            variant={chartState.editPath === "pathA" ? 'contained' : 'outlined'}
            onClick={() => chartDispatch({ type: 'setEditPath', payload: 'pathA' })}
          >
            Path A
          </Button>

          <Button
            color="secondary"
            variant={chartState.editPath === "pathB" ? 'contained' : 'outlined'}
            onClick={() => chartDispatch({ type: 'setEditPath', payload: 'pathB' })}
          >
            Path B
          </Button>
        </div>
      )}
    </MuiToolbar>
  )
}
