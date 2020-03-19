import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Draggable, { DraggableData } from 'react-draggable'
import ResizeObserver from 'react-resize-observer'
import {
  IConfig, ILink, INode, INodeInnerDefaultProps, IOnDragNode,
  IOnDragNodeStop, IOnLinkCancel,
  IOnLinkComplete, IOnLinkMove,
  IOnLinkStart, IOnNodeClick, IOnNodeMouseEnter,
  IOnNodeMouseLeave, IOnNodeSizeChange, IOnPortPositionChange,
  IPortDefaultProps, IPortsDefaultProps,
  IPosition, ISelectedOrHovered, ISize, PortWrapper,
} from '../../'
import { noop } from '../../utils'
import { INodeDefaultProps, NodeDefault } from './Node.default'
import { useChartState } from '../../../stories/utils/chart-context'

export interface INodeWrapperProps {
  config: IConfig
  node: INode
  Component: React.FunctionComponent<INodeDefaultProps>
  offset: IPosition
  selected: ISelectedOrHovered | undefined
  hovered: ISelectedOrHovered | undefined
  selectedLink: ILink | undefined
  hoveredLink: ILink | undefined
  isSelected: boolean
  NodeInner: React.FunctionComponent<INodeInnerDefaultProps>
  Ports: React.FunctionComponent<IPortsDefaultProps>
  Port: React.FunctionComponent<IPortDefaultProps>
  onPortPositionChange: IOnPortPositionChange
  onLinkStart: IOnLinkStart
  onLinkMove: IOnLinkMove
  onLinkComplete: IOnLinkComplete
  onLinkCancel: IOnLinkCancel
  onDragNode: IOnDragNode
  onDragNodeStop: IOnDragNodeStop
  onNodeClick: IOnNodeClick
  onNodeSizeChange: IOnNodeSizeChange
  onNodeMouseEnter: IOnNodeMouseEnter
  onNodeMouseLeave: IOnNodeMouseLeave
}

export function NodeWrapper({
  config,
  node,
  onDragNode,
  onDragNodeStop,
  onNodeClick,
  isSelected,
  Component = NodeDefault,
  onNodeSizeChange,
  onNodeMouseEnter,
  onNodeMouseLeave,
  NodeInner,
  Ports,
  Port,
  offset,
  selected,
  selectedLink,
  hovered,
  hoveredLink,
  onPortPositionChange,
  onLinkStart,
  onLinkMove,
  onLinkComplete,
  onLinkCancel,
}: INodeWrapperProps) {
  const { isEditing: isEditingFacts } = useChartState()
  const [size, setSize] = React.useState<ISize>({ width: 0, height: 0 })

  const isDragging = React.useRef(false)

  const onStart = React.useCallback((e: MouseEvent) => {
    if (e.shiftKey || isEditingFacts) {
      console.log('shift?', e.shiftKey)
      e.stopPropagation()
      e.preventDefault()
      isDragging.current = false
      return false
    }

    // Stop propagation so the canvas does not move
    e.stopPropagation()
    isDragging.current = false
    return
  }, [isEditingFacts])

  const onDrag = React.useCallback((event: MouseEvent, data: DraggableData) => {
    isDragging.current = true
    onDragNode({ config, event, data, id: node.id })
  }, [onDragNode, config, node.id])

  const onStop = React.useCallback((event: MouseEvent, data: DraggableData) => {
    isDragging.current = false
    onDragNodeStop({ config, event, data, id: node.id })
  }, [onDragNodeStop, config, node.id])

  const onClick = React.useCallback((e: React.MouseEvent) => {
    if (!config.readonly) {
      e.stopPropagation()
      if (!isDragging.current) {
        onNodeClick({ config, nodeId: node.id })
      }
    }
  }, [config, node.id])

  const onMouseEnter = React.useCallback(() => {
    onNodeMouseEnter({ config, nodeId: node.id })
  }, [config, node.id])

  const onMouseLeave = React.useCallback(() => {
    onNodeMouseLeave({ config, nodeId: node.id })
  }, [config, node.id])

  const compRef = React.useRef<HTMLElement>(null)

  // TODO: probably should add an observer to track node component size changes
  React.useLayoutEffect(() => {
    const el = ReactDOM.findDOMNode(compRef.current) as HTMLInputElement
    if (el) {
      if (
        (node.size && node.size.width) !== el.offsetWidth ||
        (node.size && node.size.height) !== el.offsetHeight
      ) {
        const newSize = { width: el.offsetWidth, height: el.offsetHeight }
        setSize(newSize)
        onNodeSizeChange({ config, nodeId: node.id, size: newSize })
      }
    }
  }, [node, compRef.current, size.width, size.height])

  const children = (
    <>
      <ResizeObserver
        onResize={(rect) => {
          const newSize = { width: rect.width, height: rect.height }
          setSize(newSize)
        }}
      />
      <NodeInner node={node} config={config} />
      <Ports node={node} config={config}>
        {Object.keys(node.ports).map((portId) => (
          <PortWrapper
            config={config}
            key={portId}
            offset={offset}
            selected={selected}
            selectedLink={selectedLink}
            hoveredLink={hoveredLink}
            hovered={hovered}
            node={node}
            port={node.ports[portId]}
            Component={Port}
            onPortPositionChange={onPortPositionChange}
            onLinkStart={config.readonly ? noop : onLinkStart}
            onLinkMove={config.readonly ? noop : onLinkMove}
            onLinkComplete={onLinkComplete}
            onLinkCancel={onLinkCancel}
          />
        ))}
      </Ports>
    </>
  )

  return (
    <Draggable
      bounds="parent"
      axis="both"
      position={node.position}
      grid={[1, 1]}
      onStart={onStart}
      onDrag={onDrag}
      onStop={onStop}
      disabled={config.readonly}
    >
      <Component
        config={config}
        ref={compRef}
        children={children}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        isSelected={isSelected}
        node={node}
      />
    </Draggable>
  )
}
