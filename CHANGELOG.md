# Changelog

This document provides an overview of changes between released versions of this specification. It is particularly important to consider this when implementing Registration and Query APIs which may support multiple releases simultaneously to ease upgrades in large facilities (see [Upgrade Path](docs/5.0.%20Upgrade%20Path.md)).

## Release v1.0.1 (documentation clarifications and bug fixes only)

* Resolve inconsistencies and references to earlier (pre-v1.0) behaviour.
* More examples added and the diagrams updated for greater clarity.
* Add 202 Accepted response in the RAML (was already in the text) for POST /map/activations
* Remove unused 400 Bad Request response in the RAML for DELETE /map/activations/{activationId}
* Narrow schema of activation requests to prevent requests which don't specify an activation
* Widen pattern for API-assigned activation IDs to allow UUIDs
* Widen schema for Output capabilities to allow routable_inputs to be `null` (was already in the text)

## Release v1.0

* Initial release
