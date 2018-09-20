// Static configuration of the mapper resource
// First level objects (input, matrix, output, presets) are also accessible directly through the REST API
{
  "input": {
    // Indicates if the mapper resource supports the input stage. If not, the audio channels from different connections are placed into the matrix one after the other in the connection order and dynamic connectiones are not permitted
    "present": true,
    // Indicates if the mapper can accept new connections on the fly
    "dynamic_connections": true,
    // Static connections:
    "connections": [{
      // Labels will be used later to reference the inputs and they should be unique within a mapper
      "label": "IP IN 1",
      // User-friendly description for use e.g. in a control system
      "description": "The first ST 2110-30 input",
      "receiver_id": "1f9d7701-17d3-4cc9-bc94-b8115e780415"
    }, {
      "label": "IP IN 2",
      "description": "The second ST 2110-30 input",
      "receiver_id": "dcda769e-2bb4-458a-9272-b3ad8cd66a59"
    }, {
      // Mapping of non-NMOS controlled devices is allowed
      "label": "SDI IN",
      "description": "The SDI input"
    }],
    "rules": true
  },
  "matrix": {
    // Does the device support the mapping/mixing matrix
    "present": true,
    // Matrix size
    "input_count": 16,
    "output_count": 16,
    // Is volume adjustment on a channel supported
    "gain": true,
    // Is combining multiple channels into one supported
    "mixing": true
  },
  "output": {
    // Does the device have a (configurable) output stage
    "present": true,
    // Indicates if the mapper can start new output connections on the fly (default false)
    "dynamic_connections": true,
    // Static connections:
    "connections": [{
      "label": "IP OUT 1",
      // User-friendly description for use e.g. in a control system
      "description": "The first ST 2110-30 output",
      "receiver_id": "fa209585-6086-40b1-9742-e7ad1e2ff982"
    }, {
      "label": "IP OUT 2",
      "description": "The second ST 2110-30 output",
      "receiver_id": "8a9a3854-3383-4e07-9f6b-307b8ad9d7a9"
    }, {
      // Mapping of non-NMOS controlled devices is allowed
      "label": "SDI OUT",
      "description": "The SDI output"
    }]
  },
  "presets": [{
    "name": "Mute all",
    "description": "Puts silence on all the outputs"
  }, {
    "name": "Default",
    "description": "Passthrough from input connections to the output connections"
  }]
}
