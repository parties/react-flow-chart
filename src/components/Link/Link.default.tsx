import * as React from 'react'
import { generateCurvePath, generateRightAnglePath, generateSmartPath, IConfig, ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IPort, IPosition, generateStraightPath } from '../../'

export interface ILinkDefaultProps {
  config: IConfig
  link: ILink
  startPos: IPosition
  endPos: IPosition
  fromPort: IPort
  toPort?: IPort
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  isHovered: boolean
  isSelected: boolean
  matrix?: number[][]
  className?: string
}

export function LinkDefault ({
  config,
  link,
  startPos,
  endPos,
  fromPort,
  toPort,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
  isHovered,
  isSelected,
  matrix,
  className = '',
}: ILinkDefaultProps) {

  // const points = config.smartRouting ?
  //   !!toPort && !!matrix ? generateSmartPath(matrix, startPos, endPos, fromPort, toPort) : generateRightAnglePath(startPos, endPos)
  //   : generateCurvePath(startPos, endPos)

  const points = generateStraightPath(startPos, endPos)

  const linkColor: string = (fromPort.properties && fromPort.properties.linkColor) || 'cornflowerblue'

  return (
    <svg className={className} style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="15"
          refY="5"
          markerWidth="20"
          markerHeight="20"
          fill={linkColor}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <circle
        r="4"
        cx={startPos.x}
        cy={startPos.y}
        fill={linkColor}
      />
      {/* Main line */}
      <path
        d={points}
        stroke={linkColor}
        strokeWidth="3"
        fill="none"
        markerEnd="url(#arrow)"
      />
      {/* Thick line to make selection easier */}
      <path
        d={points}
        stroke={linkColor}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeOpacity={(isHovered || isSelected) ? 0.1 : 0}
        onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
        onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
        onClick={(e) => {
          onLinkClick({ config, linkId: link.id })
          e.stopPropagation()
        }}
      />
      <circle
        r="4"
        cx={endPos.x}
        cy={endPos.y}
        fill={linkColor}
      />
    </svg>
  )
}
