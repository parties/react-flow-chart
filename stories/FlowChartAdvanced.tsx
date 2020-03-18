import { TextField } from '@material-ui/core'
import { cloneDeep, get, mapValues, mergeWith, throttle } from 'lodash'
import * as React from 'react'
import { GithubPicker } from 'react-color'
import styled, { css, createGlobalStyle } from 'styled-components'
import 'typeface-roboto'
import { FlowChart, IChart, ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultProps, IOnCanvasClick, LinkDefault } from '../src'
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

function LinkCustom(props: ILinkDefaultProps) {
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
      <LinkDefault className="link-shadow" {...props} />
      <Label style={{ left: centerX, top: centerY }}>
        {props.link.properties && props.link.properties.label && !isEditing && (
          <LabelContent
            onDoubleClick={(event) => {
              event.stopPropagation()
              setIsEditing(true)
            }}
            onClick={(e) => e.stopPropagation()}
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

              chartDispatch(newChart)
            }}
          >
            x
          </Button>
        </LinkToolbox>
      </Label>
    </LinkContainer>
  )
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100vw;
  max-height: 100vh;
`

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

export function FlowChartContainer() {
  const chartState = useChartState()
  const chartDispatch = useChartDispatch()
  const [, setValue] = React.useState(0)
  const forceUpdate = React.useCallback(throttle(() => setValue((value) => ++value), 50), [])

  const stateActions = mapValues(actions, (actionFunc: any) => (...args: any) => {
    chartDispatch(actionFunc(...args))
    forceUpdate()
  }) as typeof actions

  React.useEffect(() => {
    // backup to local storage
    window.localStorage.setItem('chart', JSON.stringify(chartState))

    // @ts-ignore
    window.chart = chartState
  }, [chartState])

  return (
    <Page>
      <Toolbar />
      <FlowChart
        chart={chartState}
        callbacks={stateActions}
        Components={{
          Node: NodeCustom,
          NodeInner: NodeInnerCustom,
          Link: LinkCustom,

        }}
      />
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
