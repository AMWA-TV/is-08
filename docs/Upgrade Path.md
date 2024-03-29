# Upgrade Path

_(c) AMWA 2018, CC Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)_

As is common with web APIs, over time changes will be made to support new use cases and deprecate old ways of working. The NMOS APIs are no different, and have been designed to permit in-service upgrades across a facility which may be running large amounts of equipment with support for different versions of these specifications.

API versioning is specified in the [APIs](APIs.md) documentation, with procedures for handling upgrades described below.

## Requirements for Channel Mapping APIs

Implementers of the Channel Mapping API must support at least one API version, and may support more than one at a time.

## Requirements for Channel Mapping clients

Implementers of Channel Mapping API clients are strongly recommended to support multiple versions of the Channel Mapping API simultaneously in order to ease the upgrade process in live facilities.

## Performing Upgrades

The following procedure is suggested for a live system which needs to migrate between API versions.

* Upgrade API clients to their new versions, which must support all Channel Mapping API versions you are currently using in your deployment.
* Upgrade Chanel Mapping API implementations to support the new API version.
