import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithState, INodeDefaultProps, INodeInnerDefaultProps } from '../src'
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

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 * You'll need to add {...otherProps} so the event listeners are added to your component
 */
const NodeCustom = React.forwardRef(({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) => {
  // console.log("children: ", children);
  console.log({node})
  return (
    <LightBox ref={ref} {...otherProps}>
      {children}
    </LightBox>
  )
})

export const CustomNodeDemo = () => {
  return (
    <Page>
      <FlowChartWithState
        initialValue={chartSimple}
        Components={ {
          Node: NodeCustom,
          NodeInner: NodeInnerCustom,
        }}
      />
    </Page>
  )
}
