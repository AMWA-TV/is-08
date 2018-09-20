// Use case: Two mono microphones transmitting mono streams that are to be automatically combined downstream
{
	// Left microphone
	"identity": {
		"source_id": "AE396A95-00C2-44F1-A3D5-15B1AE7D83E9"
	},
	"timing": {
		// In this case it is a static setting applied on startup so no action_timestamp is needed
		"creation_timestamp": "12345:0"
	},
	"event_type": "object/audio_layout",
	"payload": {
		"sender_id": "ACFB0C72-F3EF-40A9-AD42-1698DCA0A616",
		"groups": [{
			"id": "9c2b7097-a0f2-4d39-a392-d3bed6969712",
			// Descriptive, so the control system might show a nice label
			"label": "Left microphone",
			// In this case we don't know which language will be spoken
			"language": null,
			// Variant, in this case we don't have one
			"variant": null,
			// Layout, in this case stereo as we know how the microphone will be used
			// This is not the description of the flow but of usage
			"soundfield": "urn:x-nmos:audio:layout:stereo",
			// List of tracks
			"channels": [{
				// Position within the soundfield, should match IS-04 source values
				"symbol": "L",
				// zero-based index of the track in the audio multiplex
				"index": 0
			}]
		}]
	}
}

{
	// Right microphone
	"identity": {
		"source_id": "0B9C3760-C331-45AC-A2F8-185E63D3A8C1"
	},
	"timing": {
		"creation_timestamp": "12345:0"
	},
	"event_type": "object/audio_layout",
	"payload": {
		"sender_id": "098F870F-D500-4EF4-BD5F-9A88513B0A8B",
		"groups": [{
			"id": "9c2b7097-a0f2-4d39-a392-d3bed6969712",
			"label": "Right microphone",
			"soundfield": "urn:x-nmos:audio:layout:stereo",
			"channels": [{
				"symbol": "R",
				"index": 0
			}]
		}]
	}
}
