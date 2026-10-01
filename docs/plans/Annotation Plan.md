# IS-08 v1.1: Annotation of Inputs and Outputs (Plan)

This is a discussion draft for the `v1.1-dev` branch, not specification text.
It proposes how controllers could update the human-readable information of IS-08 Inputs and Outputs, and records why a version of IS-08 is preferred to an IS-13-style companion API.

## Motivation

[IS-13][IS-13] lets a controller update the `label`, `description` and `tags` of IS-04 resources.
Users want the same for IS-08 Inputs and Outputs, whose `properties` (`name` and `description`) are set by the Device and are read-only in v1.0.

There is also no standard place for additional information about an Input or Output.
For example, one implementation adds a vendor-specific member to each Input and Output in `/io`, alongside `properties`, to provide additional information about the Input or Output:

```json
"input-receiver-1": {
    "properties": { "name": "...", "description": "..." },
    "parent": { ... },
    "channels": [ ... ],
    "caps": { ... },
    "x-vendor": {
        "kind": "receiver_stream",
        "streamIndex": 31,
        "enabled": true,
        "channelCount": 8
    }
}
```

The v1.0 `/io` schema does not allow additional members there (`additionalProperties: false`), although the `properties` schemas would.
Either way, a controller cannot discover, interpret or update such members generically.
IS-04-style `tags`, with the read-write and read-only rules defined by IS-13, would provide that place.
Some of the information above is a read-only identifier, which would fit a read-only tag, for example `"urn:x-vendor:tag:kind": ["receiver_stream"]`.
Some is not annotation at all: `enabled` is Device state, and `channelCount` repeats the length of `channels`.
Using IS-04-style `tags` does have the downside that the value type is limited to array-of-string.

## How IS-08 Differs from IS-04

- IS-08 is a Device control, advertised in the IS-04 Device `controls`, not a Node service.
  One API instance may cover one Device or several, and may be mounted under an `<api selector>` (for example `/x-nmos/channelmapping/v1.0/slot2B/`).
- Inputs and Outputs are identified by local identifiers, unique and immutable within the API instance, not by UUIDs.
- Inputs and Outputs have a human-readable `name` and `description` (both required) in their `properties` resource, but no `tags`.
- Channels are identified only by their position in the `channels` array, each with a `label`.
  The number of channels can change by an out-of-band operation by the user or automatically by the Device.

## Options Considered

### 1. A Separate API, the "Write Half" of IS-08

IS-13 is a separate API because annotating IS-04 resources in the Node API would have meant a new version of IS-04.
That affects the Registration API, the Query API, registries, and every Node and controller.
A separate API, with changes signalled by the existing IS-04 version increment and registration updates, avoided that.

None of that applies to IS-08, and a separate API would have to recreate the identity of the thing being annotated: the API instance (including any `<api selector>`) plus the local identifier.
That means copying the IS-08 URL structure.

### 2. Extending IS-13 with IS-08 Resources

IS-13 identifies resources by IS-04 UUID.
An IS-08 Input or Output only has a local identifier within an API instance, and an API instance may cover several Devices, so there is no clean mapping onto IS-13's `/node/devices/{deviceId}` paths.

### 3. A New Version of IS-08 (This Proposal)

- There is no registry between a controller and the Channel Mapping API, so only Devices and controllers need to support the new version.
- IS-08 already accepts writes (`/map/activations`), so a `PATCH` does not change the nature of the API.
- A Device can advertise both `urn:x-nmos:control:cm-ctrl/v1.0` and `urn:x-nmos:control:cm-ctrl/v1.1` in its `controls`, as described in [Upgrade Path](../Upgrade%20Path.md).
  v1.0 controllers are unaffected.
- The `PATCH` endpoints are the existing resources, so they carry the API instance and local identifier with no extra machinery.

## Proposal

The proposal is divided into three parts, in increasing order of difficulty.

### Part 1: Writable Name and Description

Add `PATCH` to `/inputs/{inputId}/properties` and `/outputs/{outputId}/properties`.

Align the behaviour with IS-13 so that controllers and implementations can share code:

- `name` and `description` can be set independently.
- `null` resets a property: the implementation restores an initial or configured default value, or sets the empty string.
- A successful response is the complete updated resource, as returned by a subsequent `GET` on the same endpoint.
- The implementation rejects a request it cannot process with `500` (Internal Server Error), with an informative error response body.
- Minimum requirements, mapping IS-13's `label` to `name`: an implementation MUST support writing a `name` of up to 64 Bytes, and SHOULD support writing a `description` of up to 64 Bytes, encoded in UTF-8.
- Updates persist for the lifetime of the Input or Output identifier, including over reboots, power cycles, and software upgrades.
  IS-08 identifiers are already required to be immutable.

**Discoverability** follows IS-13 too.
Supporting v1.1 means supporting `PATCH` to at least the minimum requirements.
A request beyond what the implementation supports fails with `500`.
There is no per-Input or per-Output capability flag.

**Version increments.** IS-08 v1.0 says the Device version SHOULD increment if the map has been modified.
v1.1 would add that the Device version SHOULD (or make both MUST) increment if the `properties` of an Input or Output are modified.
An Output's `name` is not part of its Source, so the Source version is not affected.
IS-08 does not associate an Input or Output with a particular Device, so, as for the map, the Device version increments for every Device that advertises the API instance as a control.

**Bulk update.** Add `PATCH` to `/io`, with a body that mirrors the `GET /io` response, for example:

```json
{
    "inputs": {
        "input0": { "properties": { "name": "Mic 1" } },
        "input1": { "properties": { "name": "Mic 2" } }
    },
    "outputs": {
        "output0": { "properties": { "description": null } }
    }
}
```

The request is all-or-nothing: if any entry is rejected, nothing is changed, the request fails with `500`, and the error response body identifies the Input or Output that failed.
This follows the existing IS-08 rule for `/map/activations`, where an error in the request rejects the entire request, even when its `action` covers several Outputs.
It is also the rule for a single IS-13 `PATCH`.
By contrast, an IS-05 bulk request returns a result for each entry, so some entries can succeed while others fail.
A successful response is the complete updated `/io` resource, as would be returned by a subsequent `GET /io`.
If the Device fails partway through applying a request that has been validated, the API responds with `500`, and the existing client-side [Failure Modes](../APIs%20-%20Client%20Side%20Implementation.md#failure-modes) guidance applies: the client indicates that the Device may be in a bad state, and refreshes its view, here by re-reading `/io`.

The reason for a bulk update is notification traffic.
With IS-13, annotating N Senders updates N different resources.
With IS-08, every Input and Output change is signalled on the same Device, so N per-resource `PATCH` requests are N increments of one Device version, and each is a registration update and a Query API notification to every subscriber.
Where one API instance covers M Devices, each of them is incremented, giving N x M updates.
A successful `PATCH /io` increments the Device version once.

A version increment only signals that something changed; a controller re-reads `/io` either way.
v1.1 could therefore also permit an implementation to combine closely spaced `properties` changes into one Device version increment, and RECOMMEND that the increment happens within one IS-04 heartbeat interval of the change.
That helps controllers that use the per-resource `PATCH`, at little cost to the specification.

### Part 2: Tags

Add optional `tags` to the Input and Output `properties` schemas, with the same type as IS-04 `tags` (an object of arrays of strings), and the same `PATCH` semantics as IS-13:

- Individually named tags can be set or reset with `null`; `"tags": null` resets all tags.
- Tags in the `urn:x-nmos:tag:user:` namespace MUST be read-write, subject to internal limitations.
- Read-only tags, for example those assigned by the manufacturer, MAY be rejected with `500`, and `"tags": null` does not update them.
- Minimum requirements as in IS-13: at least 1 tag (SHOULD 5) with a name of up to 64 Bytes in the `urn:x-nmos:tag:user:` namespace and 1 value of up to 64 Bytes.

`PATCH /io` covers `tags` in the same way as `name` and `description`.

This is a small addition on top of Part 1, and gives manufacturers a standard place, as read-only tags, for information that today goes in vendor-specific members, such as the example in the [Motivation](#motivation).

### Part 3: Channel Labels

Channel labels are human-readable as well, and users might want to update them too.
They need more study, and input from audio manufacturers and users, before a proposal.

**Identity.** A channel is identified only by its index.
IS-08 v1.0 allows the number of channels in an Input or Output to change by an out-of-band operation, leaves the choice of which channels are deleted to the implementation, and says that adding or removing a channel on an Output represents the creation of a new Source.
So a label written at index 5 may later belong to a different channel.
One possible rule is that the label of a removed channel is discarded and a new channel starts with its default label.

**Request shape.** `channels` is an array.
A `PATCH` with an array the same length as the current channels, each entry `{ "label": "..." }` or `{ "label": null }`, is simple, but heavy for a 256-channel Input or Output when only one label changes, if that is a realistic use case.
An object keyed by channel index would avoid that, as the `action` in a `/map/activations` request already does for Output channels, but still depends on the index as identity.
How often a single channel is relabelled is a question for users.

**Relationship to IS-04.** An IS-04 audio Source has its own `channels` array with a `label` for each channel.
When an Output is the parent of a Source, the Output's channel labels and the Source's channel labels describe the same audio, but IS-08 v1.0 does not relate them.
If only the IS-08 labels can be written, the two can disagree.
One possible rule is that the Device SHOULD copy changes to an Output's channel labels to the Source's `channels`, which already requires a Source version increment.
IS-13 v1.0 does not annotate Source channels, so this does not overlap with IS-13.

## Next Steps

1. Review this plan on `v1.1-dev`, in particular the scope of Parts 1 and 2.
2. Draft the RAML and JSON Schema changes for Parts 1 and 2: `PATCH` on the `properties` resources and on `/io`, request schemas, and `tags` in the `properties` schemas.
3. Draft the documentation: a Behaviour section for annotation, the Device version increment in Interoperability - NMOS IS-04, and examples.
4. Prototype in an open-source implementation (nmos-cpp already has IS-13 `PATCH` handling to reuse) and add tests to the NMOS Testing Tool.
5. For Part 3, gather input from audio manufacturers and users, including on the relationship to IS-04 Source channel labels, before writing a separate proposal.

[IS-13]: https://specs.amwa.tv/is-13 "AMWA IS-13 NMOS Annotation"
