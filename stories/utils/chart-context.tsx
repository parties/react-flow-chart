import { cloneDeep, isEmpty } from 'lodash'
import * as React from 'react'

import { IChart } from '../../src'
import { __emptyChart } from '../misc/empty-chart'
import { parentsChart } from '../misc/parents-chart-state'

type Dispatch = React.Dispatch<React.SetStateAction<IChart>>

const ChartStateContext = React.createContext<IChart | undefined>(undefined)
const ChartDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export function ChartProvider({ children }) {
  const [state, dispatch] = React.useState<IChart>(cloneDeep(parentsChart))

  return (
    <ChartStateContext.Provider value={state}>
      <ChartDispatchContext.Provider value={dispatch}>
        {children}
      </ChartDispatchContext.Provider>
    </ChartStateContext.Provider>
  )
}

export function useChartState() {
  const context = React.useContext(ChartStateContext)
  if (context === undefined) {
    throw new Error('useChartState must be used within a ChartProvider')
  }

  return context
}

export function useChartDispatch() {
  const context = React.useContext(ChartDispatchContext)
  if (context === undefined) {
    throw new Error('useChartDispatch must be used within a ChartProvider')
  }

  return context
}
