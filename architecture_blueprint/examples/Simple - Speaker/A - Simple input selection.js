// Use case:
// Speaker with the ability to select a single channel from a single ST 2110-30 stream
// Selection is done in the input stage

// Static Config
{
  "input": {
    "present": true,
    "connections": [{
      "label": "IP IN",
      "receiver_id": "e594662a-0f9d-4285-b391-8392cbc04896"
    }],
    "rules": true
  },
  "matrix": {
    "present": false
  },
  "output": {
    "present": false
  }
}
// ... or in a minimal form
{
  "input": {
    "connections": [{
      "label": "IP IN",
      "receiver_id": "e594662a-0f9d-4285-b391-8392cbc04896"
    }]
  }
}

// Settings
{
  "input": {
    "channels": [{
      "rules": [{
        "index": 5
      }]
    }]
  }
}

// state
{
  "input":{
    "connections": [{
      "label": "IP IN 1",
      // What follows is effectively the metadata sent for the IP stream - "Tagging - Stereo+Surround"
      "sender_id": "8BECC42E-1551-49A2-93B1-26E8BF30D1F0",
      "groups": [{
        "label": "English stereo",
        "language": "eng",
        "variation": null,
        "layout": "urn:x-nmos:audio:layout:stereo",
        "channels": [{
          "symbol": "L",
          "index": 0
        }, {
          "symbol": "R",
          "index": 1
        }]
      }, {
        "name": "English surround",
        "language": "eng",
        "variation": null,
        "layout": "urn:x-nmos:audio:layout:5.1",
        "channels": [{
          "symbol": "L",
          "index": 2
        }, {
          "symbol": "R",
          "index": 3
        }, {
          "symbol": "C",
          "index": 4
        }, {
          "symbol": "Ls",
          "index": 5
        }, {
          "symbol": "Rs",
          "index": 6
        }, {
          "symbol": "LFE",
          "index": 7
        }]
      }]
    }]
  }
}
