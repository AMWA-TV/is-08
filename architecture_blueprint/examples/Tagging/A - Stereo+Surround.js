// Use case: 8-track audio coming from a gateway converting SDI embedded audio with Stereo and 5.1
{
	"identity": {
		// as per IS-07
		"source_id": "69AE3D27-4500-41D4-A133-73CA1D835BE4"
	},
	"timing": {
		// the time this message was created (setting was applied)
		"creation_timestamp": "12345:0",
		// the time the change took or will take place
		"action_timestamp": "12345:500000000"
	},
	"event_type": "object/audio_layout",
	"payload": {
		// If one exists, i.e. if the audio processor is attached to a NMOS audio sender, otherwise null
		"sender_id": "8BECC42E-1551-49A2-93B1-26E8BF30D1F0",
		// List of the streams in the audio flow
		"groups": [{
			// Descriptive name of the entire stream
			"label": "English stereo",
			// ISO 639-2 code
			"language": "eng",
			// The kind of audio carried by this group
			"content": "programme", // Audio desc., commentary, etc.
			// Variant, in this case we don't have one
			"variant": null,
			// Soundfield, in this case stereo
			"soundfield": "urn:x-nmos:audio:layout:stereo",
			// List of channels
			"channels": [{
				// Position within the soundfield, should match IS-04 source values
				"symbol": "L",
				// zero-based index of the track in the audio flow multiplex (RTP)
				"index": 0
			}, {
				"symbol": "R",
				"index": 1
			}]
		}, {
			"name": "English surround",
			"language": "eng",
			"content": "programme", 
			"variant": null,
			"soundfield": "urn:x-nmos:audio:layout:5.1",
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
	}
}
