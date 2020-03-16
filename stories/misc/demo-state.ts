import { IChart } from '../../src'

export const chartDemo: IChart = {
  offset: {
    x: 7,
    y: 29
  },
  nodes: {
    'node3': {
      id: 'node3',
      type: 'input-output',
      position: {
        x: 516,
        y: 458
      },
      properties: {
        label: 'The system',
        color: '#c4def6'
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
          position: {
            x: 0,
            y: 29
          }
        },
        right: {
          id: 'right',
          type: 'right',
          position: {
            x: 143,
            y: 29
          }
        },
        top: {
          id: 'top',
          type: 'input',
          position: {
            x: 71,
            y: 0
          }
        },
        bottom: {
          id: 'bottom',
          type: 'output',
          position: {
            x: 71,
            y: 58
          }
        }
      },
      size: {
        width: 143,
        height: 58
      }
    },
    'Node-1': {
      id: 'Node-1',
      type: 'four-port',
      position: {
        x: 451,
        y: 156
      },
      properties: {
        label: 'Sustain the water supply'
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
          position: {
            x: 0,
            y: 29
          }
        },
        right: {
          id: 'right',
          type: 'right',
          position: {
            x: 234,
            y: 29
          }
        },
        top: {
          id: 'top',
          type: 'input',
          position: {
            x: 117,
            y: 0
          }
        },
        bottom: {
          id: 'bottom',
          type: 'output',
          position: {
            x: 117,
            y: 58
          }
        }
      },
      size: {
        width: 234,
        height: 58
      }
    },
    'Node-2': {
      id: 'Node-2',
      type: 'four-port',
      position: {
        x: 911,
        y: 456
      },
      properties: {
        label: 'Store the rainwater'
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
          position: {
            x: 0,
            y: 29
          }
        },
        right: {
          id: 'right',
          type: 'right',
          position: {
            x: 195,
            y: 29
          }
        },
        top: {
          id: 'top',
          type: 'input',
          position: {
            x: 98,
            y: 0
          }
        },
        bottom: {
          id: 'bottom',
          type: 'output',
          position: {
            x: 98,
            y: 58
          }
        }
      },
      size: {
        width: 195,
        height: 58
      }
    },
    'Node-3': {
      id: 'Node-3',
      type: 'four-port',
      position: {
        x: 28,
        y: 462
      },
      properties: {
        label: 'Collect the rainwater'
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
          position: {
            x: 0,
            y: 29
          }
        },
        right: {
          id: 'right',
          type: 'right',
          position: {
            x: 206,
            y: 29
          }
        },
        top: {
          id: 'top',
          type: 'input',
          position: {
            x: 103,
            y: 0
          }
        },
        bottom: {
          id: 'bottom',
          type: 'output',
          position: {
            x: 103,
            y: 58
          }
        }
      },
      size: {
        width: 206,
        height: 58
      }
    },
    'Node-4': {
      id: 'Node-4',
      type: 'four-port',
      position: {
        x: 523,
        y: 722
      },
      properties: {
        label: 'Distribute'
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
          position: {
            x: 0,
            y: 29
          }
        },
        right: {
          id: 'right',
          type: 'right',
          position: {
            x: 128,
            y: 29
          }
        },
        top: {
          id: 'top',
          type: 'input',
          position: {
            x: 64,
            y: 0
          }
        },
        bottom: {
          id: 'bottom',
          type: 'output',
          position: {
            x: 64,
            y: 58
          }
        }
      },
      size: {
        width: 128,
        height: 58
      }
    },
    'Node-5': {
      id: 'Node-5',
      type: 'four-port',
      position: {
        x: 1248,
        y: 306
      },
      properties: {
        label: 'Safe place',
        color: '#c1e1c5'
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
          position: {
            x: 0,
            y: 29
          }
        },
        right: {
          id: 'right',
          type: 'right',
          position: {
            x: 136,
            y: 29
          }
        },
        top: {
          id: 'top',
          type: 'input',
          position: {
            x: 68,
            y: 0
          }
        },
        bottom: {
          id: 'bottom',
          type: 'output',
          position: {
            x: 68,
            y: 58
          }
        }
      },
      size: {
        width: 136,
        height: 58
      }
    },
    'Node-6': {
      id: 'Node-6',
      type: 'four-port',
      position: {
        x: 1370,
        y: 524
      },
      properties: {
        label: 'Accessible'
      },
      ports: {
        left: {
          id: 'left',
          type: 'left',
          position: {
            x: 0,
            y: 29
          }
        },
        right: {
          id: 'right',
          type: 'right',
          position: {
            x: 136,
            y: 29
          }
        },
        top: {
          id: 'top',
          type: 'input',
          position: {
            x: 68,
            y: 0
          }
        },
        bottom: {
          id: 'bottom',
          type: 'output',
          position: {
            x: 68,
            y: 58
          }
        }
      },
      size: {
        width: 136,
        height: 58
      }
    }
  },
  links: {
    'e3e031e7-9b8e-4591-845f-de7591d87bb4': {
      id: 'e3e031e7-9b8e-4591-845f-de7591d87bb4',
      properties: {
        label: 'Must'
      },
      from: {
        nodeId: 'node3',
        portId: 'top'
      },
      to: {
        nodeId: 'Node-1',
        portId: 'bottom'
      }
    },
    '01c52ef0-5202-42ad-ba6b-704612b780a0': {
      id: '01c52ef0-5202-42ad-ba6b-704612b780a0',
      properties: {
        label: 'Shall'
      },
      from: {
        nodeId: 'node3',
        portId: 'right'
      },
      to: {
        nodeId: 'Node-2',
        portId: 'left'
      }
    },
    '87a61387-88f7-4a74-8167-719e38785a7a': {
      id: '87a61387-88f7-4a74-8167-719e38785a7a',
      properties: {
        label: 'Using'
      },
      from: {
        nodeId: 'Node-1',
        portId: 'right'
      },
      to: {
        nodeId: 'Node-2',
        portId: 'top'
      }
    },
    '99ac14e1-2256-4d6a-bc39-124125c21d4d': {
      id: '99ac14e1-2256-4d6a-bc39-124125c21d4d',
      properties: {
        label: 'Shall'
      },
      from: {
        nodeId: 'node3',
        portId: 'left'
      },
      to: {
        nodeId: 'Node-3',
        portId: 'right'
      }
    },
    '47d6b077-c228-4806-b16e-946d6913485c': {
      id: '47d6b077-c228-4806-b16e-946d6913485c',
      properties: {
        label: 'Using'
      },
      from: {
        nodeId: 'Node-1',
        portId: 'left'
      },
      to: {
        nodeId: 'Node-3',
        portId: 'top'
      }
    },
    '0a87ca99-374c-4d29-b728-7d0cdc187057': {
      id: '0a87ca99-374c-4d29-b728-7d0cdc187057',
      properties: {
        label: ''
      },
      from: {
        nodeId: 'node3',
        portId: 'bottom'
      },
      to: {
        nodeId: 'Node-4',
        portId: 'top'
      }
    },
    'c9b92721-c795-45e0-ade3-e493813f772a': {
      id: 'c9b92721-c795-45e0-ade3-e493813f772a',
      properties: {
        label: 'In'
      },
      from: {
        nodeId: 'Node-2',
        portId: 'right'
      },
      to: {
        nodeId: 'Node-5',
        portId: 'left'
      }
    },
    '20a093c9-42b7-465d-a892-deb662d083eb': {
      id: '20a093c9-42b7-465d-a892-deb662d083eb',
      properties: {
        label: 'Must be'
      },
      from: {
        nodeId: 'Node-2',
        portId: 'right'
      },
      to: {
        nodeId: 'Node-6',
        portId: 'left'
      }
    },
    '7693d874-2f7a-4828-ab23-015e42b7e82a': {
      id: '7693d874-2f7a-4828-ab23-015e42b7e82a',
      properties: {
        label: 'To'
      },
      from: {
        nodeId: 'Node-6',
        portId: 'bottom'
      },
      to: {
        nodeId: 'Node-4',
        portId: 'right'
      }
    }
  },
  selected: {},
  hovered: {}
}
