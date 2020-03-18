import { IChart } from '../../src'

const scalarX = 400
const scalarY = 100

export const demoChartState: IChart = {
  "hovered": {
    "type": "node",
    "id": "Node-6"
  },
  "links": {
    "ef3bfd39-8b0f-4867-8c4e-79b4f3e245ef": {
      "id": "ef3bfd39-8b0f-4867-8c4e-79b4f3e245ef",
      "properties": {
        "label": "has"
      },
      "from": {
        "nodeId": "Node-4",
        "portId": "left"
      },
      "to": {
        "nodeId": "Node-7",
        "portId": "right"
      }
    },
    "fb61b2e5-e01b-40c8-a74e-34eba0c9443d": {
      "id": "fb61b2e5-e01b-40c8-a74e-34eba0c9443d",
      "properties": {
        "label": "is"
      },
      "from": {
        "nodeId": "Node-5",
        "portId": "bottom"
      },
      "to": {
        "nodeId": "Node-4",
        "portId": "top"
      }
    },
    "9f889b79-b5ff-4da7-943c-4b275ad5a2ac": {
      "id": "9f889b79-b5ff-4da7-943c-4b275ad5a2ac",
      "properties": {
        "label": ""
      },
      "from": {
        "nodeId": "Node-0",
        "portId": "bottom"
      },
      "to": {
        "nodeId": "Node-4",
        "portId": "top"
      }
    },
    "bf87eb3e-8fcb-41a6-a0ed-ce95da65d200": {
      "id": "bf87eb3e-8fcb-41a6-a0ed-ce95da65d200",
      "properties": {
        "label": "has"
      },
      "from": {
        "nodeId": "Node-0",
        "portId": "right"
      },
      "to": {
        "nodeId": "Node-2",
        "portId": "left"
      }
    },
    "7e2d6132-cf24-473f-9134-2127cab79315": {
      "id": "7e2d6132-cf24-473f-9134-2127cab79315",
      "properties": {
        "label": "is"
      },
      "from": {
        "nodeId": "Node-0",
        "portId": "left"
      },
      "to": {
        "nodeId": "Node-5",
        "portId": "right"
      }
    },
    "48107bfa-cda4-4688-9a94-32724abe0fc5": {
      "id": "48107bfa-cda4-4688-9a94-32724abe0fc5",
      "properties": {
        "label": "is"
      },
      "from": {
        "nodeId": "Node-2",
        "portId": "bottom"
      },
      "to": {
        "nodeId": "Node-3",
        "portId": "top"
      }
    },
    "90880384-a831-4bd7-89c3-6ee74aa51ed0": {
      "id": "90880384-a831-4bd7-89c3-6ee74aa51ed0",
      "properties": {
        "label": "has"
      },
      "from": {
        "nodeId": "Node-4",
        "portId": "right"
      },
      "to": {
        "nodeId": "Node-3",
        "portId": "left"
      }
    },
    "0fbc5c30-dbfb-42a3-8c32-d8290bfe0081": {
      "id": "0fbc5c30-dbfb-42a3-8c32-d8290bfe0081",
      "properties": {
        "label": "has"
      },
      "from": {
        "nodeId": "Node-4",
        "portId": "bottom"
      },
      "to": {
        "nodeId": "Node-8",
        "portId": "top"
      }
    }
  },
  "nodes": {
    "Node-0": {
      "id": "Node-0",
      "type": "four-port",
      "position": {
        "x": 1183,
        "y": 695
      },
      "properties": {
        "label": "arginine"
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
            "x": 117,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 58,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 58,
            "y": 58
          }
        }
      },
      "size": {
        "width": 117,
        "height": 58
      }
    },
    "Node-2": {
      "id": "Node-2",
      "type": "four-port",
      "position": {
        "x": 1481,
        "y": 695
      },
      "properties": {
        "label": "an electrically-charged side chain"
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
            "x": 297,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 148,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 148,
            "y": 58
          }
        }
      },
      "size": {
        "width": 297,
        "height": 58
      }
    },
    "Node-3": {
      "id": "Node-3",
      "type": "four-port",
      "position": {
        "x": 1560,
        "y": 948
      },
      "properties": {
        "label": "a side chain"
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
            "x": 145,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 73,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 73,
            "y": 58
          }
        }
      },
      "size": {
        "width": 145,
        "height": 58
      }
    },
    "Node-4": {
      "id": "Node-4",
      "type": "four-port",
      "position": {
        "x": 1172,
        "y": 932
      },
      "properties": {
        "label": "an amino acid"
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
            "x": 160,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 80,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 80,
            "y": 58
          }
        }
      },
      "size": {
        "width": 160,
        "height": 58
      }
    },
    "Node-5": {
      "id": "Node-5",
      "type": "four-port",
      "position": {
        "x": 677,
        "y": 697
      },
      "properties": {
        "label": "an amino acid found in dairy"
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
            "x": 260,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 130,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 130,
            "y": 58
          }
        }
      },
      "size": {
        "width": 260,
        "height": 58
      }
    },
    "Node-7": {
      "id": "Node-7",
      "type": "four-port",
      "position": {
        "x": 802,
        "y": 1103
      },
      "properties": {
        "label": "an amine group"
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
            "x": 171,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 86,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 86,
            "y": 58
          }
        }
      },
      "size": {
        "width": 171,
        "height": 58
      }
    },
    "Node-8": {
      "id": "Node-8",
      "type": "four-port",
      "position": {
        "x": 1461,
        "y": 1151
      },
      "properties": {
        "label": "a carboxylic acid"
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
            "x": 178,
            "y": 29
          }
        },
        "top": {
          "id": "top",
          "type": "input",
          "position": {
            "x": 89,
            "y": 0
          }
        },
        "bottom": {
          "id": "bottom",
          "type": "output",
          "position": {
            "x": 89,
            "y": 58
          }
        }
      },
      "size": {
        "width": 178,
        "height": 58
      }
    }
  },
  "offset": {
    "x": -562,
    "y": -641
  },
  "selected": {},
  "properties": null
}
