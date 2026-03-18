# DP Blast Phased Implementation Spec

## Document Status

- Status: Draft
- Date: 2026-03-16
- Product: DP Blast
- Primary goal: Let a user upload a profile photo, apply a selected campaign frame, preview the output, and download the final image.

## Product Summary

DP Blast is a web app that takes a user-uploaded image, composites it with a selected transparent frame for a chosen event or campaign, and returns a processed output suitable for profile-picture use. The MVP should optimize for speed, simplicity, and reliable output quality over feature breadth.

Primary navigation model for MVP:

1. Landing page lists all events that have available DP frames.
2. Selecting an event routes the user to an event-specific uploader page using a slug route.
3. Uploader context is scoped to the selected event, including frame choices and validation.

## Spec-Driven Development Rules

Each phase must complete the following before the next phase begins:

1. A written spec exists for the phase scope.
2. Acceptance criteria are defined before implementation.
3. Code is built only for the approved phase scope.
4. Validation is performed against acceptance criteria, not assumptions.
5. Any scope expansion is written into a later phase instead of being added ad hoc.

## Success Metrics

1. A first-time user can generate a framed image in under 30 seconds.
2. Image processing succeeds for supported formats in at least 95% of valid submissions.
3. Final output is visually aligned with the selected frame on common portrait aspect ratios.
4. Mobile flow is fully usable for upload, preview, and download.

## Constraints and Assumptions

1. Initial stack is Astro with React for interactive UI.
2. Backend processing will run on Astro server routes using a Node adapter.
3. Image compositing will use a server-side library such as Sharp.
4. MVP will start with a fixed catalog of admin-provided events and frame assets.
5. Anonymous usage is allowed in MVP.

## Routing Model (MVP)

1. Event discovery route: `/`.
2. Event-specific uploader route: `/events/[eventSlug]`.
3. Event slug must be unique, stable, URL-safe, and derived from event metadata.
4. API requests for processing must include event context and a frame identifier.

## Phase 0: Foundation Spec

### Goal

Define the product boundaries, user flow, technical constraints, and non-goals before implementation begins.

### Scope

1. Confirm MVP behavior.
2. Define supported file formats, max upload size, and output dimensions.
3. Decide deployment mode for Astro backend.
4. Define the first frame catalog and asset format requirements.

### Deliverables

1. Product requirements document.
2. User flow diagram.
3. Technical decision record for backend mode and image pipeline.
4. Frame asset specification.

### Acceptance Criteria

1. The upload-to-download flow is documented end to end.
2. The processing pipeline is defined clearly enough that backend work can begin without ambiguity.
3. Every supported input and output format is explicitly listed.
4. Non-goals are documented to prevent scope drift.

### Non-Goals

1. User authentication.
2. Social sharing features.
3. Payment or premium tiers.

## Phase 1: Project Setup and Backend Enablement

### Goal

Convert the current Astro app into a server-capable app that can accept uploads and process images.

### Scope

1. Add Astro Node adapter.
2. Switch output mode to server or hybrid.
3. Install image processing dependency.
4. Establish environment variable handling.
5. Create backend folder conventions for API routes and shared server utilities.

### Deliverables

1. Updated Astro configuration for backend execution.
2. Shared server utility module for validation and processing helpers.
3. Base API route structure.
4. Developer runbook for local setup.

### Acceptance Criteria

1. The app runs locally with server routes enabled.
2. A health-check API route returns a valid response.
3. Build and preview work in the selected deployment mode.
4. Image-processing dependency installs and loads successfully.

### Exit Gate

Backend infrastructure is proven working before any UI-dependent processing features are started.

## Phase 2: Frame Catalog and Asset Specification

### Goal

Create a consistent system for storing and referencing event campaigns and frame assets.

### Scope

1. Define event metadata schema.
2. Define frame metadata schema, including event linkage.
3. Define event-to-frame mapping rules.
4. Define event slug rules and uniqueness constraints.
5. Prepare initial frame assets in transparent PNG format.
6. Create thumbnails for the selection UI.
7. Add a catalog source the frontend and backend can both trust.

### Deliverables

1. Event manifest file.
2. Frame manifest file.
3. Documented slug field per event in manifest.
4. Organized frame asset directory.
5. Thumbnail assets.
6. Validation rules for missing or malformed event or frame entries.

### Acceptance Criteria

1. Each event has a unique ID and display metadata.
2. Each frame has a unique ID, display name, preview asset, full overlay asset, and linked event ID.
3. Frame dimensions match the expected compositing canvas rules.
4. The frontend can render event and frame catalogs without hardcoded per-item logic.
5. The backend can resolve a valid event and frame combination with no ambiguous mapping.
6. Event slugs map deterministically to event entries with no collisions.

### Exit Gate

Frame data is stable enough that processing logic can depend on it.

## Phase 3: Upload and Validation Flow

### Goal

Let users submit a valid photo and chosen frame safely and reliably.

### Scope

1. Build event browsing UI on landing page, listing events with available frames.
2. Add routing from landing to event-specific uploader via `/events/[eventSlug]`.
3. Build upload UI on event uploader with drag-and-drop and file picker support.
4. Add frame selection UI filtered by selected event slug.
5. Add client-side validation for type, size, event slug, and frame ID.
6. Add server-side validation for MIME type, dimensions, event slug, and frame ID.
7. Define error states and retry paths.

### Deliverables

1. Event listing component for landing page.
2. Event uploader page routed by slug.
3. Upload form component.
4. Frame picker component scoped to route event.
5. API contract for submission including event slug and frame identifier.
6. Validation utilities shared where appropriate.
7. Error copy for user-visible failures.

### Acceptance Criteria

1. Supported files submit successfully.
2. Invalid files are rejected with clear messages.
3. No processing occurs for unsupported file types, invalid event IDs, invalid frame IDs, or invalid event-frame combinations.
4. The form is usable on desktop and mobile.
5. Landing event cards route to the correct event uploader slug page.

### Exit Gate

The system accepts only clean, expected inputs before compositing begins.

## Phase 4: Image Processing Engine

### Goal

Produce a visually correct final image by compositing the uploaded photo with the selected frame.

### Scope

1. Normalize image orientation.
2. Resize or crop the user image to a target canvas.
3. Composite the selected frame on top of the image.
4. Export the final image in at least one downloadable format.
5. Handle processing failures and timeouts.

### Deliverables

1. Image compositing service.
2. Standard output presets.
3. Failure logging strategy.
4. Test fixtures for sample uploads and expected outputs.

### Acceptance Criteria

1. Output image is generated successfully for all supported test cases.
2. Frame transparency is preserved.
3. Portrait uploads produce visually acceptable alignment within defined tolerances.
4. Metadata is stripped from the output.
5. Processing time stays within target budget for normal uploads.

### Exit Gate

The core product promise is met with repeatable output quality.

## Phase 5: Preview, Download, and Result Experience

### Goal

Give users confidence in the result and a complete post-processing experience that supports download, sharing, and event caption reuse.

### Scope

1. Show processing state.
2. Render final image preview.
3. Provide download action.
4. Provide reset and retry actions.
5. Handle mobile-friendly download behavior.
6. Route users to a dedicated customization page after upload handoff.
7. Provide manual customization controls for zoom, position adjustment, and tilt.
8. Provide event caption section with editable name placeholder.
9. Provide one-click caption copy action with success and failure feedback.

### Deliverables

1. Result screen UI.
2. Download response behavior and filename strategy.
3. UX states for loading, success, and failure.
4. Basic analytics hooks for funnel measurement.
5. Dedicated customization route UI (for example, `/events/[eventSlug]/customize`).
6. Zoom, pan, and tilt controls for user photo alignment.
7. Caption template contract per event (for example, `{{name}}` placeholder support).
8. Caption editor and copy-to-clipboard interaction.

### Acceptance Criteria

1. The user can clearly see when processing is in progress.
2. The user can preview the final output before or during download.
3. The downloaded file opens correctly on common devices.
4. A failed generation attempt can be retried without refreshing the whole site.
5. The user is redirected or routed into a dedicated customization experience after initial upload selection.
6. The user can adjust zoom, horizontal or vertical position, and tilt before downloading.
7. The user can edit their name in the caption template before copying.
8. The user can copy the generated caption with one action and receives clear copy feedback.
9. Caption generation works on desktop and mobile with graceful fallback if clipboard access fails.

### Exit Gate

The full user loop is complete from upload to downloadable result.

## Phase 6: Hardening and Abuse Prevention

### Goal

Reduce operational risk before public release.

### Scope

1. Add rate limiting.
2. Add request size and processing time limits.
3. Improve server-side error handling and logs.
4. Add cleanup strategy for temporary files if disk is used.
5. Test malicious and malformed input cases.

### Deliverables

1. Rate-limiting middleware or equivalent.
2. Input and timeout safeguards.
3. Operational logging guidance.
4. Abuse test checklist.

### Acceptance Criteria

1. The app degrades safely under repeated invalid requests.
2. Oversized or malformed uploads do not crash the server.
3. Temporary artifacts are cleaned up predictably.
4. User-facing errors remain generic while logs retain technical detail.

### Exit Gate

The app is stable enough for public beta traffic.

## Phase 7: QA, Release, and Feedback Loop

### Goal

Ship the MVP with verification, observability, and a controlled rollout.

### Scope

1. Add unit and integration coverage for validation and processing.
2. Perform manual cross-device QA.
3. Prepare release checklist.
4. Add lightweight usage analytics.
5. Define post-launch bug triage and improvement process.

### Deliverables

1. Test plan.
2. Release checklist.
3. Known issues log.
4. Initial analytics event list.

### Acceptance Criteria

1. Critical upload, processing, and download flows are tested.
2. Core mobile and desktop paths pass manual QA.
3. Release blockers are tracked explicitly.
4. A feedback loop exists for prioritizing fixes after launch.

### Exit Gate

The MVP is launch-ready with basic confidence and monitoring.

## Recommended Build Order

1. Phase 0
2. Phase 1
3. Phase 2
4. Phase 3
5. Phase 4
6. Phase 5
7. Phase 6
8. Phase 7

## Phase Ownership Template

Use this template before starting each phase.

```md
## Phase X: [Name]

### Problem

### Goal

### In Scope

### Out of Scope

### API or Data Contracts

### UI States

### Acceptance Criteria

### Risks

### Test Plan
```

## Immediate Next Specs to Write

1. Product requirements document for the MVP flow.
2. Technical spec for Astro backend mode and image processing pipeline.
3. Frame manifest schema spec.
4. Upload and processing API spec.
