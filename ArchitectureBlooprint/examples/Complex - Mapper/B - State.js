// Current state of mapper resource input and output components
// First level objects are also accessible directly through the REST API
{
  // If the input stage is not supported, this will be null
  "input": {
    // Static connections first, then dynamic ones, if any
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
    }, {
      "label": "IP IN 2"
        // This one is not connected
    }, {
      "label": "SDI IN",
      // Commentaries are distributed over legacy infrastructure as embedded audio (could be AES/EBU or anything else)
      "groups": [{
        "label": "English commentary",
        "language": "eng",
        "layout": "urn:x-nmos:audio:layout:mono",
        "channels": [{
          "symbol": "C",
          "index": 0
        }]
      }, {
        "name": "French commentary",
        "language": "fra",
        "layout": "urn:x-nmos:audio:layout:mono",
        "channels": [{
          "symbol": "C",
          "index": 1
        }]
      }]
    }, {
      "label": "CG Audio Player",
      // Additional voice over coming from a file (e.g. a ping to go with a CG appearing)
      "groups": [{
        "label": "Ping.wav",
        "layout": "urn:x-nmos:audio:layout:stereo",
        "channels": [{
          "symbol": "L",
          "index": 0
        }, {
          "symbol": "R",
          "index": 1
        }]
      }]
    }]
  },
  "output": {
    "connections": [{
        // The first output is the English final signal with commentary and CG voice-overs
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
          }, ]
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
        }],
        {
          // The second output is the French final signal with commentary and CG voice-overs
          "sender_id": "8BECC42E-1551-49A2-93B1-26E8BF30D1F0",
          "groups": [{
            "label": "French stereo",
            "language": "fra",
            "variation": null,
            "layout": "urn:x-nmos:audio:layout:stereo",
            "channels": [{
              "symbol": "L",
              "index": 0
            }, {
              "symbol": "R",
              "index": 1
            }, ]
          }, {
            "name": "French surround",
            "language": "fra",
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
    },
    // Active preset, in this case none
    "preset": null
  }
