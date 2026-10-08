# Live Updates & In-App Notifications

Prepared September 27, 2026. Complete draft for manual entry into Upwork; no listing has been published by the assistant. Prices are proposed package prices.

## Overview

Title (Upwork supplies "You will get"):
```text
live updates and in-app notifications for your existing web app
```

Category: Development & IT > Web Programming > Web Application Programming

This exact category path was confirmed in the user's API Integration dropdown. The package adds one feature to an existing web application.

Attributes when shown:
- **Programming Languages:** TypeScript, JavaScript, Python
- **Coding Expertise:** Security, for authenticated subscriptions and access checks. No security audit is included.

Search tags:
- Real-Time Applications
- WebSocket
- Server-Sent Events
- API Integration
- React

## Pricing

3 Tiers: OFF.
Custom title: One Live App Feature

Custom description:
```text
One app view, up to 3 event types, in-app alerts, reconnection and tests.
```

- Price: $1,000
- Delivery days: 7
- Revisions: 2
- Number of Pages: 1 existing app view, not a new website
- Source Code: Checked
- Design Customization: Checked; one existing view and alert component styled to the current app
- Responsive Design: Checked; the new component is checked at one desktop and one mobile-web viewport
- Content Upload: Unchecked

Add-ons: None.

Conditional field labels may differ in your editor. Select only options included in this scope.

## Scope and acceptance

- One existing web app with one working frontend/backend and one agreed feature: for example live job status, order progress, or record-change notifications. One existing app view, one event source, and up to three event types.
- Up to three event types means three named event schemas within the same workflow, not three independent integrations. One existing authorization model and subscriber rule set are reused; designing a new permissions system is separate.
- One agreed transport: Server-Sent Events or WebSocket/Socket.IO, chosen after checking the app, authentication, and hosting. Implementation can use the app's existing compatible JavaScript/TypeScript frontend and Node.js or Python backend.
- Add event emission at the agreed existing backend state-change hook, an authenticated subscription, and handling in one existing view. An in-app banner/toast indicates the agreed events while the app is open.
- Use server-side access checks and recipient scoping. Include validation of event payloads, connection cleanup, logout handling, and bounded reconnect behavior. Test two identities to verify that unauthorized records are not broadcast.
- Display connection/reconnecting status and recover the latest authoritative state after reconnection using the existing read API. Guard against repeated event handling in the active session. This does not guarantee delivery or replay of every transient notification.
- Style one alert/status component to match the existing app and check that component at one desktop and one mobile-web viewport in Chromium. No full app redesign, Safari/Firefox matrix, or native mobile app is included.
- Add at least six automated checks for relevant delivery, payload, authorization, duplicate, logout, and reconnect/resync behavior. Provide one end-to-end demonstration in an accessible staging environment, labeling simulated failure conditions.
- Deliver source/configuration changes, event contracts, test results, staging demonstration notes, and setup/maintenance instructions. Two revisions cover the agreed feature and event types.
- Requires a working source app, stable test data, compatible existing auth, an existing API for reading the current state, and hosting that supports the selected connection type. New event providers, authentication redesign, and new hosting infrastructure are separate.
- Email, SMS, Web Push, APNs/FCM phone notifications, persistent notification inboxes/read receipts, offline event replay, durable event storage, multi-server fan-out, chat/presence, and load/availability guarantees require separate scope.
- Client provides source and staging access, two test identities, example events, current design, and permission rules. Hosting/provider fees, production deployment, and ongoing operations are separate.
- Acceptance: agreed events update the chosen view for permitted subscribers, denied identities fail access checks, the component handles reconnection and refreshes current state, and source/tests/handoff notes are delivered.

## Gallery

Upload [live-updates-notifications-cover.png](live-updates-notifications-cover.png) and set it as the project cover. This is original conceptual artwork.

Video: Leave blank for now.
Sample documents: Leave blank for now.

## Client requirements

Add each separately. Check 'Client needs to answer before I can start working' for every requirement below.

**Requirement 1**

```text
Share the working app repository, frontend/backend stack, setup instructions, and staging URL. Identify one existing view and workflow to update. Describe hosting, proxies, and any existing streaming or WebSocket service.
```

**Requirement 2**

```text
Define up to 3 event types from one source, with example payloads and desired in-app messages. Identify where the backend changes state and the existing API used to fetch the latest state after reconnection.
```

**Requirement 3**

```text
Explain who may receive each event and provide two test identities with different access. Arrange secure repository/staging access. Do not paste passwords here. Confirm the existing login and permission model is working.
```

**Requirement 4**

```text
Provide the existing component styles and preferred desktop/mobile-web layouts. Describe current connection limits and expected traffic. Confirm this package covers open-app updates; email, SMS, phone push, and offline history are separate.
```

## Project steps

**Step 1 title**
```text
Define events, access, and connection behavior
```

Description:
```text
I review the app and hosting, agree on up to 3 event types and recipient rules, and choose the connection method. I define what the view shows during connection loss and how it reloads the latest state.
```

**Step 2 title**
```text
Connect the event source to the app view
```

Description:
```text
I add the backend event hook, authenticated subscription, and event handling in one existing view. I style an in-app alert/status component and reuse your existing access controls and data API.
```

**Step 3 title**
```text
Test access, updates, and reconnection
```

Description:
```text
I add at least 6 checks and demonstrate the feature in staging. I test permitted and denied access, relevant duplicate/logout behavior, and reconnect/state refresh, plus the new component at desktop and mobile-web sizes.
```

**Step 4 title**
```text
Deliver the feature and handoff notes
```

Description:
```text
I provide source changes, event contracts, test results, and setup/maintenance notes. Two revisions cover the agreed view and event types. New channels, durable history, production deployment, and ongoing support are separate.
```

## Project summary

```text
Keep users informed without making them refresh the page.

I add one live-update feature to your existing web app: one view, one event source, and up to 3 event types, such as job progress or order status.

Included:
- Server-Sent Events or WebSocket integration suited to your app
- Authenticated subscriptions using existing access rules
- Live view updates and an in-app alert/status component
- Connection status, reconnection, and refresh of current server state
- Checks of the new component at desktop and mobile-web sizes
- At least 6 automated checks and a staging demonstration
- Source code, event documentation, handoff notes, and 2 revisions

My SolPulse work includes live data flows and real-time strategy logs.

You provide a working app, compatible hosting, existing login/state APIs, test accounts, and design references. Provider fees are yours.

This covers updates while the app is open. Email, SMS, phone/browser push, persistent notification history, offline replay, scaling work, and production deployment need separate scope.

Send your app stack and desired events before ordering so I can confirm the fit.
```

## FAQs

**What is included in one live-update feature?**

```text
One existing app view, one event source, and up to 3 event types within one workflow. Examples include job progress or order status. The package includes in-app alerts while the app is open. Extra views and workflows need separate scope.
```

**Does this include email, SMS, or phone push notifications?**

```text
No. This package delivers updates inside an open web app. Email, SMS, browser Web Push, and native phone push require separate integrations. A persistent notification inbox, read receipts, and offline history are also separate.
```

**What happens when the connection drops?**

```text
The app shows connection status, reconnects, and reloads the latest state from your existing API. Transient alerts may be missed while disconnected. Durable event storage, full replay, and guaranteed delivery need separate scope.
```

**Can you add this to any app or hosting platform?**

```text
I review the existing frontend, backend, auth, and hosting before ordering. The host must support the selected SSE or WebSocket connection. New infrastructure, external event sources, multiple-server fan-out, and load testing are separate.
```

**What do I receive, and what do revisions cover?**

```text
Source/configuration changes, event contracts, test results, and handoff notes. Two revisions cover the agreed view, alerts, and events. Additional channels, new permissions systems, production deployment, and ongoing maintenance are separate.
```

## Finalize

Maximum simultaneous projects: 1. This limit applies per listing.

## Asset record

Cover: live-updates-notifications-cover.png. Exact prompt: [live-updates-notifications-cover.prompt.txt](live-updates-notifications-cover.prompt.txt). Built-in image generation used.

## Sources checked

- [Server-sent event behavior](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [Socket.IO delivery guarantees and replay requirements](https://socket.io/docs/v4/delivery-guarantees/)

