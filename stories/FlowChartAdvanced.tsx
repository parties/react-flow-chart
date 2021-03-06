import { TextField } from '@material-ui/core'
import { cloneDeep, get, mapValues, mergeWith, throttle, debounce } from 'lodash'
import * as React from 'react'
import { GithubPicker } from 'react-color'
import styled, { css, createGlobalStyle } from 'styled-components'
import 'typeface-roboto'
import { FlowChart, IChart, ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultProps, IOnCanvasClick, LinkDefault, ILinkBaseInput, IOnCanvasDropInput, IOnDragCanvasInput, IOnDragCanvasStopInput, IOnDragNodeInput, IOnDragNodeStopInput, IOnLinkBaseEvent, IOnLinkCompleteInput, IOnLinkMoveInput, INodeBaseInput, IOnNodeSizeChangeInput, IOnPortPositionChangeInput } from '../src'
import * as actions from '../src/container/actions'
import { ChartProvider, useChartDispatch, useChartState } from './utils/chart-context'
import { __emptyChart } from './misc/empty-chart'
import { Toolbar } from './components/Toolbar'

const LightBox = styled.div`
  position: absolute;
  background: #fff;
  color: #000;
  border-radius: 10px;
  // border: 2px solid rgba(100, 100, 100, 0.5);
`

const Outer = styled.div<{ isSelected: boolean }>`
  padding: 20px 30px;
  border-radius: 10px;
  background: ${(props) => props.color || '#fff'};

  /* minor box shadow */
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
  transition: all 150ms ease-in-out;

  ${(props) => props.isSelected && css`
    box-shadow: 0 10px 10px rgba(0,0,0,.1);
    margin-top: -1px
  `}
`

const NodeEditContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


const Label = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
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
  font-size: 16px;
  cursor: pointer;
`

const ColorButtonContainer = styled.div`
  height: 22px;
  width: 30px;
  border: 1px solid black;
  margin-left: 10px;
  flex: 0 0 auto;
  border-radius: 2px;

  position: relative;
`

const ColorButton = styled.div`
  position: absolute;
  z-index: 2;
  top: 40px;
`

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
function NodeInnerCustom({ node }: INodeInnerDefaultProps) {
  const [] = React.useState(node.properties.label)
  const [isEditing, setIsEditing] = React.useState(false)
  const [showColor, setShowColor] = React.useState(false)

  const chartState = useChartState()
  const chartDispatch = useChartDispatch()

  const inputRef = React.createRef<HTMLInputElement>()

  React.useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus()
    }
  }, [inputRef.current, isEditing])

  const isSelected = chartState.selected.id === node.id

  return (
    <Outer
      isSelected={isSelected}
      color={node.properties.color}
      data-id="NodeInnerCustom__Outer"
    >
      {
        isEditing ? (
          <NodeEditContainer data-id="NodeEditContainer">
            <TextField
              data-id="Input"
              ref={inputRef}
              autoFocus={true}
              defaultValue={node.properties.label}
              onKeyDown={(e: React.KeyboardEvent) => {
                // block the delete key from removing the node
                if (e.which === 8) {
                  e.stopPropagation()
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
                            label: get(e, 'target.value'),
                          },
                        },
                      },
                    }),
                  )

                  setIsEditing(false)
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />

            <ColorButtonContainer onClick={() => setShowColor(true)}>
              {showColor && (
                <ColorButton>
                  <GithubPicker
                    onChangeComplete={(color) => {
                      chartDispatch(
                        mergeWith(chartState, {
                          nodes: {
                            [node.id]: {
                              ...node,
                              properties: {
                                ...node.properties,
                                color: color.hex,
                              },
                            },
                          },
                        }),
                      )
                      setShowColor(false)
                    }}
                  />
                </ColorButton>
              )}
            </ColorButtonContainer>
          </NodeEditContainer>
        ) : (
            <span
              onDoubleClick={(event: React.MouseEvent) => {
                event.stopPropagation()
                setIsEditing(true)
              }}
            >
              {node.properties.label}
            </span>
          )}
    </Outer>
  )
}

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 * You'll need to add {...otherProps} so the event listeners are added to your component
 */
const NodeCustom = React.forwardRef(function _NodeCustom({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <LightBox ref={ref} {...otherProps}>
      {children}
    </LightBox>
  )
})

const LinkContainer = styled.div`
  position: relative;
`

const LinkToolbox = styled.div<{ isHovered: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  opacity: ${props => props.isHovered ? "1.0" : "0"};

  &:hover {
    opacity: 1;
  }

  transition: opacity 100ms ease;
`

function LinkWithLabel(props: ILinkDefaultProps) {
  const { startPos, endPos, link } = props
  const centerX = startPos.x + (endPos.x - startPos.x) / 2
  const centerY = startPos.y + (endPos.y - startPos.y) / 2

  const [isEditing, setIsEditing] = React.useState(false)
  const [] = React.useState(get(props, 'link.properties.label') || '')

  const chartState = useChartState()
  const chartDispatch = useChartDispatch()

  const inputRef = React.createRef<HTMLInputElement>()

  React.useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus()
    }
  }, [inputRef.current, isEditing])

  return (
    <LinkContainer
      data-id="LinkContainer"
      onDoubleClick={(event) => {
        event.stopPropagation()

        setIsEditing(true)
      }}
    >
      <LinkDefault
        {...props}
        onLinkClick={(input: ILinkBaseInput) => {
          // console.log('onLinkClick [LinkDefault]')
          props.onLinkClick(input)
        }}
      />
      <Label style={{ left: centerX, top: centerY }}>
        {props.link.properties && props.link.properties.label && !isEditing && (
          <LabelContent
            onDoubleClick={(event) => {
              event.stopPropagation()
              setIsEditing(true)
            }}
            onClick={(e) => {
              console.log('onClick LabelContent')
              e.stopPropagation()
            }}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {props.link.properties && props.link.properties.label}
          </LabelContent>
        )}
        {isEditing && (
          <TextField
            autoFocus={true}
            label="Label"
            onDoubleClick={(event) => event.stopPropagation()}
            ref={inputRef}
            defaultValue={link.properties.label}
            onKeyDown={(e: React.KeyboardEvent) => {
              // block delete key from deleting the node
              if (e.which === 8) {
                e.stopPropagation()
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
                          label: get(e, 'target.value'),
                        },
                      },
                    },
                  }),
                )

                setIsEditing(false)
              }
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        )}

        <LinkToolbox data-id="LinkToolbox" isHovered={props.isHovered}>
          <Button
            data-id="Button"
            onClick={(event) => {
              // remove link
              event.stopPropagation()

              const newChart = cloneDeep(chartState)
              delete newChart.links[link.id]

              chartDispatch({ type: 'replaceState', payload: newChart })
            }}
          >
            x
          </Button>
        </LinkToolbox>
      </Label>
    </LinkContainer>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  *, :after, :before {
    box-sizing: inherit;
  }
`

const FactEditorView = () => {
  const chartState = useChartState()

  const facts = React.useMemo(() => chartState.facts, [chartState.facts])

  return (
    <pre>Facts: {JSON.stringify(facts, null, 2)}</pre>
  )
}

const Page = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
`

export function FlowChartContainer() {
  const chartState = useChartState()
  const chartDispatch = useChartDispatch()
  const [, setValue] = React.useState(0)
  const forceUpdate = React.useCallback(throttle(() => setValue((value) => ++value), 50), [])

  // const stateActions = mapValues(actions, (actionFunc: any) => (...args: any) => {
  //   chartDispatch(actionFunc(...args))
  //   forceUpdate()
  // }) as typeof actions

  React.useEffect(debounce(() => {
    // backup to local storage
    window.localStorage.setItem('chart', JSON.stringify(chartState))

    // @ts-ignore
    window.chart = chartState
  }, 1000), [chartState])

  return (
    <Page>
      <div style={{ flex: '0 1 80%', width: 0 }}>
        <Toolbar />
        <FlowChart
          chart={chartState}
          callbacks={{
            onCanvasClick: () => {
              chartDispatch({ type: 'onCanvasClick', payload: {} })
              forceUpdate()
            },
            onCanvasDoubleClick: (event) => {
              chartDispatch({ type: 'onCanvasDoubleClick', payload: { event } })
              forceUpdate()
            },
            onCanvasDrop: (input: IOnCanvasDropInput) => {
              chartDispatch({ type: 'onCanvasDrop', payload: input })
              forceUpdate()
            },
            onDeleteKey: () => {
              chartDispatch({ type: 'onDeleteKey', payload: {} })
              forceUpdate()
            },
            onDragCanvas: (input: IOnDragCanvasInput) => {
              chartDispatch({ type: 'onDragCanvas', payload: input })
              forceUpdate()
            },
            onDragCanvasStop: (input: IOnDragCanvasStopInput) => {
              chartDispatch({ type: 'onDragCanvasStop', payload: input })
              forceUpdate()
            },
            onDragNode: (payload: IOnDragNodeInput) => {
              chartDispatch({ type: 'onDragNode', payload })
              forceUpdate()
            },
            onDragNodeStop: (payload: IOnDragNodeStopInput) => {
              chartDispatch({ type: 'onDragNodeStop', payload })
              forceUpdate()
            },
            onLinkCancel: (payload: IOnLinkBaseEvent) => {
              chartDispatch({ type: 'onLinkCancel', payload })
              forceUpdate()
            },
            onLinkClick: (input: ILinkBaseInput) => {
              chartDispatch({ type: 'onLinkClick', payload: input })
              forceUpdate()
            },
            onLinkComplete: (payload: IOnLinkCompleteInput) => {
              chartDispatch({ type: 'onLinkComplete', payload })
              forceUpdate()
            },
            onLinkMouseEnter: (payload: ILinkBaseInput) => {
              chartDispatch({ type: 'onLinkMouseEnter', payload })
              forceUpdate()
            },
            onLinkMouseLeave: (payload: ILinkBaseInput) => {
              chartDispatch({ type: 'onLinkMouseLeave', payload })
              forceUpdate()
            },
            onLinkMove: (payload: IOnLinkMoveInput) => {
              chartDispatch({ type: 'onLinkMove', payload })
              forceUpdate()
            },
            onLinkStart: (payload: IOnLinkBaseEvent) => {
              chartDispatch({ type: 'onLinkStart', payload })
              forceUpdate()
            },
            onNodeClick: (payload: INodeBaseInput) => {
              chartDispatch({ type: 'onNodeClick', payload })
              forceUpdate()
            },
            onNodeMouseEnter: (payload: INodeBaseInput) => {
              chartDispatch({ type: 'onNodeMouseEnter', payload })
              forceUpdate()
            },
            onNodeMouseLeave: (payload: INodeBaseInput) => {
              chartDispatch({ type: 'onNodeMouseLeave', payload })
              forceUpdate()
            },
            onNodeSizeChange: (payload: IOnNodeSizeChangeInput) => {
              chartDispatch({ type: 'onNodeSizeChange', payload })
              forceUpdate()
            },
            onPortPositionChange: (payload: IOnPortPositionChangeInput) => {
              chartDispatch({ type: 'onPortPositionChange', payload })
              forceUpdate()
            },
          }}
          Components={{
            Node: NodeCustom,
            NodeInner: NodeInnerCustom,
            Link: LinkWithLabel,
          }}
        />
      </div>
      <div style={{ flex: '0 1 auto' }}>
        <FactEditorView />
      </div>
      <GlobalStyle />
    </Page>
  )
}

export function FlowChartAdvanced() {
  return (
    <ChartProvider>
      <FlowChartContainer />
    </ChartProvider>
  )
}
