import { cloneDeep, mapValues } from 'lodash'
import * as React from 'react'
import styled from 'styled-components'
import { FlowChart, ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultProps, LinkDefault } from '../src'
import * as actions from '../src/container/actions'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'


// const DarkBox = styled.div`
//   position: absolute;
//   background: #3e3e3e;
//   color: white;
//   border-radius: 10px;
// `

const LightBox = styled.div`
  position: absolute;
  background: #fff;
  color: #000;
  border-radius: 10px;
  border: 2px solid rgba(100, 100, 100, 0.5);
`

const Outer = styled.div`
  padding: 30px;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 100%;
`

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
  if (node.type === 'output-only') {
    return (
      <Outer>
        <p>Output only node</p>
      </Outer>
    )
  } else {
    return (
      <Outer>
        <p>Add custom displays for each node.type</p>
        <p>You may need to stop event propagation so your forms work.</p>
        <br />
        <Input
          type="number"
          placeholder="Some Input"
          onChange={(e) => console.log(e)}
          onClick={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />
      </Outer>
    )
  }
}

const Label = styled.div`
  position: absolute;
`

const Button = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px;
  height: 15px;
  width: 15px;
  transform: translate(50%, -50%);
  background: red;
  color: white;
  border-radius: 50%;
  transition: 0.3s ease all;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
  }
`

const LabelContent = styled.div`
  padding: 5px 10px;
  background: cornflowerblue;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
`

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 * You'll need to add {...otherProps} so the event listeners are added to your component
 */
const NodeCustom = React.forwardRef(({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) => {
  // console.log("children: ", children);
  // console.log({node})
  return (
    <LightBox ref={ref} {...otherProps}>
      {children}
    </LightBox>
  )
})

const LinkCustom = (stateActions: typeof actions) => (props: ILinkDefaultProps) => {
  const { startPos, endPos, onLinkClick, link } = props
  const centerX = startPos.x + (endPos.x - startPos.x) / 2
  const centerY = startPos.y + (endPos.y - startPos.y) / 2
  return (
    <>
      <LinkDefault {...props} />
      <Label style={{ left: centerX, top: centerY }}>
          { props.link.properties && props.link.properties.label && (
            <LabelContent>{props.link.properties && props.link.properties.label}</LabelContent>
          )}
        <Button
          onClick={(e) => {
            console.log("clicked button")
            onLinkClick({ linkId: link.id })
            // stateActions.onDeleteKey({})
            e.stopPropagation()
          }}
        >
          x
        </Button>
      </Label>
    </>
  )
}

export class CustomNodeDemo extends React.Component {
  public state = cloneDeep(chartSimple)

  public render() {
    const chart = this.state
    const stateActions = mapValues(actions, (func: any) => (...args: any) => this.setState(func(...args))) as typeof actions
    return (
      <Page>
        <FlowChart
          chart={chart}
          callbacks={stateActions}
          Components={{
            Node: NodeCustom,
            NodeInner: NodeInnerCustom,
            Link: LinkCustom(stateActions),
          }}
        />
      </Page>
    )
  }
}
