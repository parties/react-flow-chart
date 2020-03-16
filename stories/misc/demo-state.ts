import { IChart } from '../../src'

export const chartDemo: IChart = {
  offset: {
    x: 0,
    y: 0,
  },
  nodes: {
    node1: {
      id: 'node1',
      type: 'output-only',
      position: {
        x: 300,
        y: 100,
      },
      properties: {
        label: 'node1',
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
        },
        right: {
          id: 'right',
          type: 'right',
        },
        top: {
          id: 'top',
          type: 'input'
        },
        bottom: {
          id: 'bottom',
          type: 'output'
        }
      },
    },
    node2: {
      id: 'node2',
      type: 'input-output',
      position: {
        x: 300,
        y: 300,
      },
      properties: {
        label: 'node2',
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
        },
        right: {
          id: 'right',
          type: 'right',
        },
        top: {
          id: 'top',
          type: 'input'
        },
        bottom: {
          id: 'bottom',
          type: 'output'
        }
      },
    },
    node3: {
      id: 'node3',
      type: 'input-output',
      position: {
        x: 100,
        y: 600,
      },
      properties: {
        label: 'node3',
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
        },
        right: {
          id: 'right',
          type: 'right',
        },
        top: {
          id: 'top',
          type: 'input'
        },
        bottom: {
          id: 'bottom',
          type: 'output'
        }
      },
    },
    node4: {
      id: 'node4',
      type: 'input-output',
      position: {
        x: 500,
        y: 600,
      },
      properties: {
        label: 'node4',
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
        },
        right: {
          id: 'right',
          type: 'right',
        },
        top: {
          id: 'top',
          type: 'input'
        },
        bottom: {
          id: 'bottom',
          type: 'output'
        }
      },
    },
  },
  links: {
    link1: {
      id: 'link1',
      from: {
        nodeId: 'node1',
        portId: 'bottom',
      },
      to: {
        nodeId: 'node2',
        portId: 'top',
      },
      properties: {
        label: 'example link label',
      },
    },
    link2: {
      id: 'link2',
      from: {
        nodeId: 'node2',
        portId: 'bottom',
      },
      to: {
        nodeId: 'node3',
        portId: 'top',
      },
      properties: {
        label: 'another example link label',
      },
    },
    link3: {
      id: 'link3',
      from: {
        nodeId: 'node2',
        portId: 'bottom',
      },
      to: {
        nodeId: 'node4',
        portId: 'top',
      },
      properties: {
        label: 'another example link label',
      },
    },
  },
  selected: {},
  hovered: {},
}
