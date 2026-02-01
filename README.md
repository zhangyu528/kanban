# Kanban Skill

Standard Kanban workflow skill for AI agents, automating a file-system based development loop: **Backlog -> Doing -> Test -> Done**.

## Overview

The Kanban skill provides a structured environment for managing software development tasks within a project's filesystem. It uses a series of directories to represent the state of each task and a set of commands to transition tasks through their lifecycle.

## Folder Structure

The skill operates within a `kanban/` directory at the project root:

- `kanban/01-backlog/01-draft/`: Active requirement incubation area for new ideas and drafts.
- `kanban/01-backlog/02-task/`: Staging area for "Frozen" or ready-to-develop requirements.
- `kanban/02-doing/[TaskName]/`: Active development directory where implementation happens.
- `kanban/03-test/[TaskName]/`: Verification stage for testing and quality assurance.
- `kanban/04-done/[TaskName]/`: Finalized knowledge assets and completed tasks.
- `kanban/99-templates/`: Standard document templates (PRD, SSD, TDD, etc.).

## Core Commands

### `/kanban:init`
Initializes the Kanban structure in the current project. If the project already has source code, it performs a manual scan and stores the initial state in `kanban/04-done/00-initial-baseline/`.

### `/kanban:spec <TaskName>`
Locates a draft requirement in `kanban/01-backlog/01-draft/`, analyzes it, and rewrites it into a professional specification using standard templates.

### `/kanban:start <TaskName> [--yolo]`
Moves a task from `02-task/` to `02-doing/` and generates the necessary technical documents:
- `SSD.md` (System Design Document, optional)
- `TDD.md` (Technical Design Document)
- `implementation_plan.md`

### [Auto-Transition] Doing -> Test
Triggered automatically when the implementation plan is completed. It summarizes changes, prepares a `VERIFICATION_REPORT.md`, and moves the task to `03-test/`.

### `/kanban:fix <TaskName>`
Moves a task back from `03-test/` to `02-doing/` to address issues reported in the `VERIFICATION_REPORT.md`.

### `/kanban:done <TaskName>`
Validates the verification report, moves the task to `04-done/`, and cleans up any temporary files.

## Documentation Templates

The skill uses standard templates located in `resources/templates/` (or `kanban/99-templates/` after initialization):
- `PRD_TEMPLATE.md`: Product Requirement Document
- `SSD_TEMPLATE.md`: System Specification Document
- `TDD_TEMPLATE.md`: Technical Design Document
- `VERIFICATION_REPORT_TEMPLATE.md`: Test and Verification Report