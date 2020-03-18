import { IChart, IOnDragNode, IOnDragNodeStop, IOnDragCanvas, IOnDragCanvasStop, IOnLinkStart, IOnLinkMove, IOnLinkComplete, IOnLinkCancel, IOnLinkMouseEnter, IOnLinkMouseLeave, IOnCanvasClick, IOnCanvasDoubleClick, IOnNodeMouseEnter, IOnNodeMouseLeave, IOnDeleteKey, IOnNodeClick, IOnNodeSizeChange, IOnPortPositionChange, IOnCanvasDrop, IOnDragNodeInput, IOnDragNodeStopInput, IOnDragCanvasInput, IOnDragCanvasStopInput, IOnLinkBaseEvent, IOnLinkMoveInput, IOnLinkCompleteInput, ILinkBaseInput, IConfig, INodeBaseInput, IOnNodeSizeChangeInput, IOnPortPositionChangeInput, IOnCanvasDropInput } from '../../src'
import * as actions from "../../src/container/actions"

export type ChartAction =
  // action to fully replace the entire state object
  { type: 'replaceState', payload: IChart } |
  { type: 'onCanvasClick', payload: { config?: IConfig } } |
  { type: 'onCanvasDoubleClick', payload: { event: React.MouseEvent } } |
  { type: 'onCanvasDrop', payload: IOnCanvasDropInput } |
  { type: 'onDeleteKey', payload: { config?: IConfig } } |
  { type: 'onDragCanvas', payload: IOnDragCanvasInput } |
  { type: 'onDragCanvasStop', payload: IOnDragCanvasStopInput } |
  { type: 'onDragNode', payload: IOnDragNodeInput } |
  { type: 'onDragNodeStop', payload: IOnDragNodeStopInput } |
  { type: 'onLinkCancel', payload: IOnLinkBaseEvent } |
  { type: 'onLinkClick', payload: ILinkBaseInput } |
  { type: 'onLinkComplete', payload: IOnLinkCompleteInput } |
  { type: 'onLinkMouseEnter', payload: ILinkBaseInput } |
  { type: 'onLinkMouseLeave', payload: ILinkBaseInput } |
  { type: 'onLinkMove', payload: IOnLinkMoveInput } |
  { type: 'onLinkStart', payload: IOnLinkBaseEvent } |
  { type: 'onNodeClick', payload: INodeBaseInput } |
  { type: 'onNodeMouseEnter', payload: INodeBaseInput } |
  { type: 'onNodeMouseLeave', payload: INodeBaseInput } |
  { type: 'onNodeSizeChange', payload: IOnNodeSizeChangeInput } |
  { type: 'onPortPositionChange', payload: IOnPortPositionChangeInput }

export function chartReducer(state: IChart, action: ChartAction): IChart {
  switch (action.type) {
    case 'onDragNode':
      return actions.onDragNode(action.payload)(state)
    case 'onDragNodeStop':
      return actions.onDragNodeStop(action.payload)(state)
    case 'onDragCanvas':
      return actions.onDragCanvas(action.payload)(state)
    case 'onDragCanvasStop':
      return actions.onDragCanvasStop(action.payload)(state)
    case 'onLinkStart':
      return actions.onLinkStart(action.payload)(state)
    case 'onLinkMove':
      return actions.onLinkMove(action.payload)(state)
    case 'onLinkComplete':
      return actions.onLinkComplete(action.payload)(state)
    case 'onLinkCancel':
      return actions.onLinkCancel(action.payload)(state)
    case 'onLinkMouseEnter':
      return actions.onLinkMouseEnter(action.payload)(state)
    case 'onLinkMouseLeave':
      return actions.onLinkMouseLeave(action.payload)(state)
    case 'onLinkClick':
      return actions.onLinkClick(action.payload)(state)
    case 'onCanvasClick':
      return actions.onCanvasClick(action.payload)(state)
    case 'onCanvasDoubleClick':
      return actions.onCanvasDoubleClick(action.payload.event)(state)
    case 'onNodeMouseEnter':
      return actions.onNodeMouseEnter(action.payload)(state)
    case 'onNodeMouseLeave':
      return actions.onNodeMouseLeave(action.payload)(state)
    case 'onDeleteKey':
      return actions.onDeleteKey(action.payload)(state)
    case 'onNodeClick':
      return actions.onNodeClick(action.payload)(state)
    case 'onNodeSizeChange':
      return actions.onNodeSizeChange(action.payload)(state)
    case 'onPortPositionChange':
      return actions.onPortPositionChange(action.payload)(state)
    case 'onCanvasDrop':
      return actions.onCanvasDrop(action.payload)(state)
    default:
      return state
  }
}
