import { IChart } from '../../src'

export const parentsChart: IChart = {
  "hovered": {},
  "links": {
    "51f21128-d83d-4108-a549-72760665baea": {
      "id": "51f21128-d83d-4108-a549-72760665baea",
      "properties": {
        "label": "has a mother"
      },
      "from": {
        "nodeId": "Node-0",
        "portId": "bottom"
      },
      "to": {
        "nodeId": "Node-2",
        "portId": "left"
      }
    },
    "2a81775a-42fa-44d0-9654-6890e5112b60": {
      "id": "2a81775a-42fa-44d0-9654-6890e5112b60",
      "properties": {
        "label": "w"
      },
      "from": {
        "nodeId": "Node-1",
        "portId": "bottom"
      },
      "to": {
        "nodeId": "Node-2",
        "portId": "top"
      }
    },
    "f9542dea-9ab4-43ed-b454-4357e2d18a4e": {
      "id": "f9542dea-9ab4-43ed-b454-4357e2d18a4e",
      "properties": {
        "label": "has as parents"
      },
      "from": {
        "nodeId": "Node-0",
        "portId": "right"
      },
      "to": {
        "nodeId": "Node-1",
        "portId": "left"
      }
    }
  },
  "nodes": {
    "Node-0": {
      "id": "Node-0",
      "type": "four-port",
      "position": {
        "x": 924,
        "y": 676
      },
      "properties": {
        "label": "a person"
      },
      "ports": {
        "left": {
          "id": "left",
          "type": "left",
          "position": {
            "x": 0,
            "y": 29
          }
        },
        "right": {
          "id": "right",
          "type": "right",
          "position": {
            "x": 122,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 61,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 61,
            "y": 57
          }
        }
      },
      "size": {
        "width": 122,
        "height": 57
      }
    },
    "Node-1": {
      "id": "Node-1",
      "type": "four-port",
      "position": {
        "x": 1305,
        "y": 674
      },
      "properties": {
        "label": "a pair (w, m) where w is a woman and m is a man"
      },
      "ports": {
        "left": {
          "id": "left",
          "type": "left",
          "position": {
            "x": 0,
            "y": 29
          }
        },
        "right": {
          "id": "right",
          "type": "right",
          "position": {
            "x": 411,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 206,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 206,
            "y": 58
          }
        }
      },
      "size": {
        "width": 411,
        "height": 58
      }
    },
    "Node-2": {
      "id": "Node-2",
      "type": "four-port",
      "position": {
        "x": 1316,
        "y": 904
      },
      "properties": {
        "label": "a woman"
      },
      "ports": {
        "left": {
          "id": "left",
          "type": "left",
          "position": {
            "x": 0,
            "y": 29
          }
        },
        "right": {
          "id": "right",
          "type": "right",
          "position": {
            "x": 125,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 62,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 62,
            "y": 58
          }
        }
      },
      "size": {
        "width": 125,
        "height": 58
      }
    }
  },
  "offset": {
    "x": -499,
    "y": -500
  },
  "selected": {
    "type": "node",
    "id": "Node-0"
  },
  "properties": null
}
