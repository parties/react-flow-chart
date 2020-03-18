import * as React from 'react'
import styled from 'styled-components'
import { IConfig, IPort } from '../../'

export interface IPortDefaultProps {
  config: IConfig
  port: IPort
  isSelected: boolean
  isHovered: boolean
  isLinkSelected: boolean
  isLinkHovered: boolean
}

const PortDefaultOuter = styled.div<{ active: boolean, hovered: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover > div {
    background: ${(props) => props.active ? 'cornflowerblue' : 'grey'};
  }

  opacity: ${(props) => props.hovered ? '1' : '0'};
  &:hover {
    opacity: 1;

    & > div {
      opacity: 1;
    }
  }

  transition: all 150ms ease;
`

const PortDefaultInner = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.active ? 'cornflowerblue' : 'grey'};
  cursor: pointer;

  opacity: ${(props) => props.active ? '1' : '0'};

  transition: all 150ms ease;
`

export const PortDefault = ({ isLinkSelected, isLinkHovered, config, isSelected, isHovered }: IPortDefaultProps) => (
  <PortDefaultOuter
    data-id="PortDefaultOuter"
    active={!config.readonly && (isLinkSelected || isLinkHovered)}
    hovered={!config.readonly && (isLinkSelected || isLinkHovered || isSelected || isHovered)}
  >
    <PortDefaultInner
      data-id="PortDefaultInner"
      active={!config.readonly && (isLinkSelected || isLinkHovered)}
    />
  </PortDefaultOuter>
)
