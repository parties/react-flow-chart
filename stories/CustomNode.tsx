import { cloneDeep, get, mapValues, mergeWith, throttle } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { FlowChart, IChart, ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultProps, IOnCanvasClick, LinkDefault } from '../src';
import * as actions from '../src/container/actions';
import { Page } from './components';
import { chartSimple } from './misc/exampleChartState';

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
`;

const Outer = styled.div`
  padding: 30px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 100%;
`;

const Label = styled.div`
  position: absolute;
`;

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
`;

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
`;

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
  const [label, setLabel] = React.useState(node.properties.label);
  const [isEditing, setIsEditing] = React.useState(false);

  const chartState = useChartState();
  const chartDispatch = useChartDispatch();

  const inputRef = React.createRef<HTMLInputElement>();

  React.useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [inputRef.current, isEditing]);

  if (node.type === 'output-only') {
    return (
      <Outer>
        {
          isEditing ? (
            <Input
              type="text"
              ref={inputRef}
              defaultValue={node.properties.label}
              onKeyDown={(e: React.KeyboardEvent) => {
                // block delete key from deleting the node
                if (e.key === '8') {
                  e.stopPropagation();
                }

                // enter key will submit the value
                if (e.which === 13) {
                  chartDispatch(
                    mergeWith(chartState, {
                      nodes: {
                        [node.id]: {
                          ...node,
                          properties: {
                            ...node.properties,
                            label: inputRef.current && inputRef.current.value,
                          },
                        },
                      },
                    }),
                  );

                  setIsEditing(false);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          ) : <p onDoubleClick={() => setIsEditing(true)}>{node.properties.label}</p>
        }
      </Outer>
    );
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
    );
  }
};

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
  );
});

const LinkCustom = (stateActions: typeof actions) => (props: ILinkDefaultProps) => {
  const { startPos, endPos, onLinkClick, link } = props;
  const centerX = startPos.x + (endPos.x - startPos.x) / 2;
  const centerY = startPos.y + (endPos.y - startPos.y) / 2;

  const [isEditing, setIsEditing] = React.useState(false);
  const [label, setLabel] = React.useState(get(props, 'link.properties.label') || '');

  const chartState = useChartState();
  const chartDispatch = useChartDispatch();

  const inputRef = React.createRef<HTMLInputElement>();

  React.useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [inputRef.current, isEditing]);

  return (
    <>
      <LinkDefault {...props} />
      <Label style={{ left: centerX, top: centerY }}>
        {props.link.properties && props.link.properties.label && !isEditing && (
          <LabelContent
            onDoubleClick={() => setIsEditing(true)}
            onClick={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {props.link.properties && props.link.properties.label}
          </LabelContent>
        )}
        {isEditing && (
          <Input
            type="text"
            ref={inputRef}
            defaultValue={link.properties.label}
            onKeyDown={(e: React.KeyboardEvent) => {
              // block delete key from deleting the node
              if (e.key === '8') {
                e.stopPropagation();
              }

              // enter key will submit the value
              if (e.which === 13) {
                chartDispatch(
                  mergeWith(chartState, {
                    links: {
                      [link.id]: {
                        ...link,
                        properties: {
                          ...link.properties,
                          label: inputRef.current && inputRef.current.value,
                        },
                      },
                    },
                  }),
                );

                setIsEditing(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        )}
      </Label>
    </>
  );
};

export class CustomNodeDemo extends React.Component {
  public state = cloneDeep(chartSimple);

  public render () {
    const chart = this.state;
    const stateActions = mapValues(actions, (func: any) => (...args: any) => this.setState(func(...args))) as typeof actions;
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
    );
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

function ChartProvider ({ children }) {
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

function useForceUpdate () {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

export const MyNodeDemo = () => {
  const chartState = useChartState();
  const chartDispatch = useChartDispatch();
  const [val, setValue] = React.useState(0);
  const forceUpdate = React.useCallback(throttle(() => setValue((value) => ++value), 50), []);

  const stateActions = mapValues(actions, (actionFunc: any) => (...args: any) => {
    chartDispatch(actionFunc(...args));
    forceUpdate();
  }) as typeof actions;

  return (
    <Page>
      <button onClick={() => console.log(chartState)}>Log state</button>
      <FlowChart
        chart={chartState}
        callbacks={stateActions}
        Components={{
          Node: NodeCustom,
          NodeInner: NodeInnerCustom,
          Link: LinkCustom(stateActions),
        }}
      />
    </Page>
  );
};

export const Demo = () => {
  return (
    <ChartProvider>
      <MyNodeDemo />
    </ChartProvider>
  );
};
