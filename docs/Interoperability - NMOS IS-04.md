# Interoperability: NMOS IS-04
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

_(c) AMWA 2018, CC Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)_

The Audio Channel Mapping Specification shares a data model with the NMOS IS-04 specification, and as a result it is designed to be used alongside it. The following implementation notes identify correct behavior for doing this.

When this API is used alongside IS-04 in a deployment, the IS-04 APIs should be operating at version 1.1 or greater in order to ensure full interoperability.

## Discovery

The Channel Mapping API should be advertised as a 'control' endpoint when publishing a compliant NMOS Device. By using the common type 'urn:x-nmos:control:cm-ctrl/v1.0', control interfaces can identify all Devices which implement the Channel Mapping API, and the URLs required to access them. For more details see [NMOS Device Control Types](https://github.com/AMWA-TV/nmos-parameter-registers/tree/master/device-control-types).

**Example 1:** The 'controls' attribute of the NMOS Device of a simple Node with a single device and Channel Mapping API instance

```json
...
"controls": [
  {
    "type": "urn:x-nmos:control:cm-ctrl/v1.0",
    "href": "http://192.168.10.3/x-nmos/channelmapping/v1.0/"
  }
]
...
```

**Example 2:** The 'controls' attribute of an NMOS Device of a Node which advertises a different Channel Mapping API instance for each device

```json
...
"controls": [
  {
    "type": "urn:x-nmos:control:cm-ctrl/v1.0",
    "href": "http://192.168.10.3/x-nmos/channelmapping/v1.0/slot2B/"
  }
]
...
```

The path segment 'slot2B' is the `<api selector>` identifier, defined in [API Paths](APIs.md#api-paths).
This permits the use of a UUID, such as an associated IS-04 Device `id`, in the usual format or succinct local identifiers such as `slot2B`.
Human-readable information can be provided, for example, via the IS-04 Device `label` and `description`.

Note as above that the API version is included in the 'type', and in the 'href'. As new versions of the Channel Mapping API are published, further control endpoints may be advertised for Devices which support multiple versions simultaneously.

More details about multi-version support can be found in [Upgrade Path](Upgrade%20Path.md).

A given instance of the Channel Mapping API MAY offer control of multiple Devices in a Node from a single URI. Alternatively there MAY be multiple instances of the API on one Node, for example, each corresponding to one Device. In either case, the 'control' endpoint for each Device's Channel Mapping API instance MUST be advertised, even if the URI is the same.

This flexibility is to accommodate different relationships between Devices and Nodes. For example, some Devices may be loosely coupled to the Node, for example cards in a card frame. These Devices are more likely to have an instance of the API for each card. Others may be tightly coupled, for example a media processing pipeline on a server, where it is likely to be preferable to have one instance of the API that is advertised for each pipeline.

## Receiver and Source IDs

The Source and Receiver UUIDs used in the API to identify relationships to Inputs and Outputs MUST match those used in a corresponding IS-04 implementation.

Where this Device creates a new Source at an Output (see [Behaviour](Behaviour.md)), the Device MUST advertise these in the IS-04 Node API, and in the IS-04 registry if available.

## Version Increments

In order to prevent unnecessary polling of the Channel Mapping API active map resource, any changes to active map parameters belonging to Source connected Outputs MUST be signaled via the IS-04 versioning mechanism by means of a version timestamp increment on the related "source" object.  

In all cases:

- Device version number SHOULD increment if the map has been modified.
- Source version number SHOULD increment if the output that has been modified is a parent of a registered Source.
