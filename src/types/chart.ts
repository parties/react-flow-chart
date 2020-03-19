import { IPosition, ISize } from './generics'

export type IEditPath = 'pathA' | 'pathB'

export interface IFact {
  source?: INode
  target?: INode
  pathA: string[]
  pathB: string[]
}

export interface IChart {
  offset: IPosition
  nodes: {
    [id: string]: INode,
  }
  links: {
    [id: string]: ILink,
  }
  properties?: any

  /** System Temp */
  selected: ISelectedOrHovered
  hovered: ISelectedOrHovered

  /** Edit Facts mode */
  isEditing: boolean
  facts: Record<string, IFact>
  editPath: IEditPath
  selectedFactId: string | null
}

export interface ISelectedOrHovered {
  type?: 'link' | 'node' | 'port',
  id?: string
}

export interface INode {
  id: string
  type: string
  position: IPosition
  orientation?: number
  ports: {
    [id: string]: IPort,
  }
  properties?: any
  /** System Temp */
  size?: ISize
}

export interface IPort {
  id: string
  type: string
  value?: string
  properties?: any
  /** System Temp */
  position?: IPosition
}

export interface ILink {
  id: string
  from: {
    nodeId: string
    portId: string,
  }
  to: {
    nodeId?: string
    portId?: string
    /** System Temp */
    position?: IPosition,
  }
  properties?: any
}
