---
type: project-manifest
project: { project-name }
version: 1.0.0
created: { YYYY-MM-DD }
last_updated: { YYYY-MM-DD }
status: active
---

# Project Manifest: {Project Name}

## Project Information

**Project Name:** {Project Name}  
**Description:** {Brief description of what the project does}  
**Organization:** {Organization name}  
**Project Type:** {Project type - e.g., Web Application, API Service, Library}  
**Technology Stack:** {Primary technologies - e.g., React, Node.js, PostgreSQL}  
**Target Environment:** {Target environment - e.g., Production, Development, Staging}

## Project Requirements

### Business Objectives

1. {Business objective 1}
2. {Business objective 2}
3. {Business objective 3}

### Technical Requirements

- **Frontend:** {Frontend technology stack with versions}
- **Backend:** {Backend technology stack with versions}
- **Database:** {Database technology with version}
- **Infrastructure:** {Infrastructure requirements}
- **Third-Party Services:** {External services or APIs required}

### Non-Functional Requirements

- **Performance:** {Performance requirements - e.g., "< 2s page load"}
- **Security:** {Security requirements - e.g., "HTTPS only", "Authentication required"}
- **Scalability:** {Scalability requirements - e.g., "Support 10,000 concurrent users"}
- **Availability:** {Availability requirements - e.g., "99.9% uptime"}
- **Compliance:** {Compliance requirements - e.g., "GDPR compliant"}

## Project Structure

### Features

- [Feature: {Feature Name}](features/{feature-name}.md)
- [Feature: {Feature Name}](features/{feature-name}.md)

**Note:** Features are defined in separate feature files. Link to feature files here.

## Decision Log

**Note:** Architectural decisions and ADRs are maintained in `knowledge/architecture-decisions.md`. Only high-level project decisions that affect the entire project structure should be referenced here.

For detailed decision history, see: [Architecture Decisions](knowledge/architecture-decisions.md)

## Project Constraints

**Note:** Technical and regulatory constraints are defined in `.baton/boundaries/project-boundaries.md`. These constraints are enforced as boundaries that agents must respect.

For constraint details, see: [Project Boundaries](boundaries/project-boundaries.md)

## Success Criteria

- {Success criterion 1 - e.g., "User acceptance testing passed"}
- {Success criterion 2 - e.g., "Performance targets met (< 2s page load)"}
- {Success criterion 3 - e.g., "Security audit passed"}
- {Success criterion 4 - e.g., "All features implemented and tested"}
