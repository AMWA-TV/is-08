{
  "input": {
    // Selecting the channels for the Matrix
    "channels": [
      // Start with English Stereo
      {
        "rules": [{
              // Try to find the left channel from a stereo English feed
              "language": "eng",
              "layout": "urn:x-nmos:audio:layout:stereo",
              "symbol": "L"
            }, {
              // If not found, go for any left channel from stereo
              "layout": "urn:x-nmos:audio:layout:stereo",
              "symbol": "L"
            }
            // If not found, the default would be silence
          ]
          // This goes into the matrix input #0
      }, {
        "rules": [{
              // Try to find the right channel from a stereo English feed
              "language": "eng",
              "layout": "urn:x-nmos:audio:layout:stereo",
              "symbol": "R"
            }, {
              // If not found, go for any left channel from stereo
              "layout": "urn:x-nmos:audio:layout:stereo",
              "symbol": "R"
            }
            // If not found, the default would be silence
          ]
          // This goes into the matrix input #1
      },
      // Then look for English commentary
      {
        "rules": [{
              "language": "eng",
              "layout": "urn:x-nmos:audio:layout:mono",
              "symbol": "C"
            }
            // If not found, the default would be silence
          ]
          // This goes into the matrix input #2
      },
      // Then look for French commentary
      {
        "rules": [{
              "language": "fra",
              "layout": "urn:x-nmos:audio:layout:mono",
              "symbol": "C"
            }
            // If not found, the default would be silence
          ]
          // This goes into the matrix input #3
      },
      // And finally the CG effects
      {
        "rules": [{
              // This time a connector based rule
              "connector": "CG Audio Player",
              "layout": "urn:x-nmos:audio:layout:stereo",
              "symbol": "L"
            }
            // If not found, the default would be silence
          ]
          // This goes into the matrix input #4
      }, {
        "rules": [{
              // This time a connector based rule
              "connector": "CG Audio Player",
              "layout": "urn:x-nmos:audio:layout:stereo",
              "symbol": "R"
            }
            // If not found, the default would be silence
          ]
          // This goes into the matrix input #5
      }
    ]
  },
  "matrix": {
    // Separate mapping and mixing rules for each output channel
    "outputs": [{
      // If nomixing is allowed, the inputs array can contain only one element (zero would mean silence)
      "inputs": [
        // English left final = original + English commentary + voice over
        {
          // Original left channel
          "index": 0,
          // Duck the original audio
          "gain": "-40dB"
        }, {
          // English commentary
          "index": 2,
          "gain": "-6dB"
        }, {
          // No adjustments for the CG audio effects
          "index": 4
        }
      ]
    }, {
      "inputs": [
        // English right final = original + English commentary + voice over
        {
          // Original right channel
          "index": 1,
          // Duck the original audio
          "gain": "-40dB"
        }, {
          // English commentary - same on both channels
          "index": 2,
          "gain": "-6dB"
        }, {
          // No adjustments for the CG audio effects
          "index": 5
        }
      ]
    }, {
      // The same for french now
      "inputs": [
        // French left final = original + French commentary + voice over
        {
          // Original left channel
          "index": 0,
          // Duck the original audio
          "gain": "-40dB"
        }, {
          // French commentary
          "index": 3,
          "gain": "-6dB"
        }, {
          // No adjustments for the CG audio effects
          "index": 4
        }
      ]
    }, {
      "inputs": [
        // French right final = original + commentary + voice over
        {
          // Original right channel
          "index": 1,
          // Duck the original audio
          "gain": "-40dB"
        }, {
          // French commentary - same on both channels
          "index": 3,
          "gain": "-6dB"
        }, {
          // No adjustments for the CG audio effects
          "index": 5
        }
      ]
    }]
  },
  // Produce the output streams
  "output": {
    "connections": [{
      "label": "IP OUT 1",
      "streams": [{
        "label": "English final stereo",
        "language": "eng",
        "layout": "urn:x-nmos:audio:layout:stereo",
        "channels": [{
          "symbol": "L",
          // zero-based index of the channel in the matrix output channel list
          "index": 0
        }, {
          "symbol": "R",
          "index": 1
        }]
      }]
    }, {
      "label": "IP OUT 2",
      "streams": [{
        "label": "French final stereo",
        "language": "fra",
        "layout": "urn:x-nmos:audio:layout:stereo",
        "channels": [{
          "symbol": "L",
          "index": 2
        }, {
          "symbol": "R",
          "index": 3
        }]
      }]
    }, {
      "label": "SDI OUT",
      "groups": [{
        "label": "English final stereo",
        "language": "eng",
        "layout": "urn:x-nmos:audio:layout:stereo",
        "channels": [{
          "symbol": "L",
          "index": 0
        }, {
          "symbol": "R",
          "index": 1
        }]
      }, {
        "label": "French final stereo",
        "language": "fra",
        "layout": "urn:x-nmos:audio:layout:stereo",
        "channels": [{
          "symbol": "L",
          "index": 2
        }, {
          "symbol": "R",
          "index": 3
        }]
      }]
    }]
  }
}
