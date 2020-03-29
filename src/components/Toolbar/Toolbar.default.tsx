import styled, { css } from 'styled-components'
import { IConfig } from '../../'

export interface IToolbarDefaultProps {
  config: IConfig
}

const ToolbarContainer = styled.div`
  border-bottom: 5px solid black;
`

export const ToolbarDefault = (props) => {
  return (
    <ToolbarContainer>
      {props.children}
    </ToolbarContainer>
  )
}
