import { cloneDeep, mapValues, get } from 'lodash'
import * as React from 'react'
import styled from 'styled-components'
import { FlowChart, ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultProps, LinkDefault, IChart, IOnCanvasClick } from '../src'
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

const useInput = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue)

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
      }
    }
  }
}

// https://dev.to/stanleyjovel/simplify-controlled-components-with-react-hooks-23nn
const useInputChange = () => {
  const [input, setInput] = React.useState({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value,
  })

  return [input, handleInputChange]
}

const EditableLabel = ({ defaultLabel }: { defaultLabel?: string }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [label, setLabel] = React.useState(defaultLabel);

  return (
    <>
      <p>label: {label}</p>
      {
        isEditing ? (
          <input
            type="text"
            value={label}
            onChange={(e) => {
              e.persist()
              setLabel(e.target.value)
            }}
          />
        ) : <p onDoubleClick={() => setIsEditing(true)}>dbl click me: {label}</p>
      }
    </>
  );
};

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
  const [label, setLabel] = React.useState(get(node, 'properties.label'))
  const [isEditing, setIsEditing] = React.useState(false)

  if (node.type === 'output-only') {
    return (
      <Outer>
        {
          isEditing ? (
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // console.log(e.nativeEvent);
                // e.stopPropagation();
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                console.log('keydown', e.nativeEvent);
                if (e.key === '8') {
                  e.stopPropagation();
                }

                if (e.which === 13) {
                  alert('submitted');
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          ) : <p onDoubleClick={() => setIsEditing(true)}>dbl click me: {label}</p>
        }
      </Outer>
    )
  } else {
    return (
      <Outer>
        <p>Add custom displays for each node.type</p>
        <p>You may need to stop event propagation so your forms work.</p>
        <br />
        <Input
          type="text"
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
  // console.log({otherProps})
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

  const [isEditing, setIsEditing] = React.useState(false)
  const [label, setLabel] = React.useState(get(props, 'link.properties.label') || '')

  return (
    <>
      <LinkDefault {...props} />
      <Label style={{ left: centerX, top: centerY }}>
        {props.link.properties && props.link.properties.label && (
          <LabelContent onDoubleClick={() => setIsEditing(true)}>{props.link.properties && props.link.properties.label}</LabelContent>
        )}
        {isEditing && <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />}
        <Button
          onClick={(e) => {
            console.log('clicked button')
            onLinkClick({ linkId: link.id })
            stateActions.onDeleteKey({})
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
  public state = cloneDeep(chartSimple);

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

enum EChartActionTypes {
  onDragNode = 'onDragNode',
  onDragNodeStop = 'onDragNodeStop',
  onDragCanvas = 'onDragCanvas',
  onCanvasDrop = 'onCanvasDrop',
  onDragCanvasStop = 'onDragCanvasStop',
  onLinkStart = 'onLinkStart',
  onLinkMove = 'onLinkMove',
  onLinkComplete = 'onLinkComplete',
  onLinkCancel = 'onLinkCancel',
  onPortPositionChange = 'onPortPositionChange',
  onLinkMouseEnter = 'onLinkMouseEnter',
  onLinkMouseLeave = 'onLinkMouseLeave',
  onLinkClick = 'onLinkClick',
  onCanvasClick = 'onCanvasClick',
  onDeleteKey = 'onDeleteKey',
  onNodeClick = 'onNodeClick',
  onNodeMouseEnter = 'onNodeMouseEnter',
  onNodeMouseLeave = 'onNodeMouseLeave',
  onNodeSizeChange = 'onNodeSizeChange',
}

type Dispatch = React.Dispatch<React.SetStateAction<IChart>>;

const ChartStateContext = React.createContext<IChart | undefined>(undefined);
const ChartDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function ChartProvider({ children }) {
  const [state, dispatch] = React.useState(cloneDeep(chartSimple));

  return (
    <ChartStateContext.Provider value={state}>
      <ChartDispatchContext.Provider value={dispatch}>
        {children}
      </ChartDispatchContext.Provider>
    </ChartStateContext.Provider>
  );
}

function useChartState () {
  const context = React.useContext(ChartStateContext);
  if (context === undefined) {
    throw new Error('useChartState must be used within a ChartProvider');
  }

  return context;
}

function useChartDispatch () {
  const context = React.useContext(ChartDispatchContext);
  if (context === undefined) {
    throw new Error('useChartDispatch must be used within a ChartProvider');
  }

  return context;
}

export const MyNodeDemo = () => {
  const chartState = useChartState();
  const chartDispatch = useChartDispatch();

  const stateActions = mapValues(actions, (actionFunc: any) => (...args: any) => chartDispatch(actionFunc(...args))) as typeof actions;

  return (
    <Page>
      <FlowChart
        chart={chartState}
        callbacks={stateActions}
      />
    </Page>
  )
}

export const Demo = () => {
  return (
    <ChartProvider>
      <MyNodeDemo />
    </ChartProvider>
  )
}
