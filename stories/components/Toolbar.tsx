import * as React from "react"
import { useChartState, useChartDispatch } from '../utils/chart-context'
import { __emptyChart } from '../misc/empty-chart'

export const Toolbar = (params) => {
  const chartState = useChartState()
  const chartDispatch = useChartDispatch()

  const logState = React.useCallback(() => console.log(chartState), [chartState])
  const clearState = React.useCallback(() => chartDispatch(__emptyChart), [chartDispatch])

  return (
    <div style={{ display: 'flex' }}>
      <button onClick={logState}>Log state</button>
      <button onClick={clearState}>CLEAR</button>
    </div>
  )
}
