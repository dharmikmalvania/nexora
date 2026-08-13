# NEXORA — PROJECT CONTEXT / HANDOFF

Last updated: 2026-08-13
Project: Nexora
Tagline: Your AI-powered academic and placement workspace.

## PURPOSE
Production-quality SaaS application for students to manage academics, productivity, placement preparation, analytics, notifications, gamification, and later AI assistance.

## STACK
Backend: Node.js + Express + TypeScript
Database: PostgreSQL
ORM: Drizzle ORM
Validation: Zod
Auth: JWT + bcrypt
Package manager: npm
Dev runner: tsx
Testing: Postman
Frontend: NOT STARTED
AI: architecture ready; real API key intentionally postponed.

## COMPLETED BACKEND
- Auth: register, login, JWT middleware, /me, bcrypt, validation, duplicate checks
- Workspaces: CRUD, ownership/security, validation
- Notes: CRUD, pin/unpin, ownership, validation
- Tasks: CRUD, status/priority/due date, ownership, validation, task-created notification, task-completed notification
- Dashboard 2.0: retrieval/aggregated information
- Placement: job application CRUD, statuses APPLIED/SCREENING/INTERVIEW/OFFER/REJECTED/WITHDRAWN, company/role/location/job URL/applied date, ownership, status notifications
- Notifications: CRUD, mark read, mark all read, delete, types GENERAL/TASK/PLACEMENT/REMINDER/SYSTEM, ownership/security
- Notification Engine: task created, task completed, placement status update; notification failures do not break core operations
- Analytics v1: workspace/note/task/placement stats and task completion rate; GET /api/analytics tested 200 OK
- Gamification v1: profile, current/longest streak, daily check-in, points, achievement foundation, same-day protection; tested successfully
- AI architecture: provider/service/controller/validation/routes; OpenRouter integration prepared; real key/model later

## CURRENT PHASE: BACKEND HARDENING
Order:
1. Rate limiting — CURRENT
2. Request body limits
3. Security/CORS cleanup
4. Environment validation
5. Database indexes
6. Pagination
7. API response/error cleanup
8. Ownership/security audit
9. Final backend testing

## RATE LIMITING
Installed:
npm install express-rate-limit

Created:
src/middleware/rate-limit.middleware.ts

Limits:
- Global: 100 requests / 15 minutes
- Auth: 10 requests / 15 minutes
- AI: 20 requests / 15 minutes

app.ts must:
- apply globalRateLimiter after express.json/urlencoded
- apply authRateLimiter to /api/auth
- apply aiRateLimiter to /api/ai
- keep notFoundHandler AFTER all routes

Current test to confirm:
- GET /api/analytics with JWT -> 200
- POST /api/auth/login repeatedly -> eventually 429
- expected auth 429:
  { "success": false, "message": "Too many authentication attempts. Please try again later." }
- verify normal APIs still work

## POSTPONED
- Subjects: later; MCA subject structures vary
- Resume: future
- Real AI API key/model: later
- Advanced AI features: later
- Gamification v2: later
- Frontend: not started

## FUTURE ORDER
Backend hardening -> final backend security/testing -> frontend -> AI key/integration -> Resume/Subjects if finalized -> Gamification v2 -> full integration testing -> deployment.

## HOW TO CONTINUE
Use small verified sprints:
Schema -> migration -> repository -> validation -> service -> controller -> routes -> app.ts -> Postman tests.

User prefers:
- Fast, clear, step-by-step instructions
- Exact file paths
- Full file code when requested
- Easy Postman tests with exact JSON
- Do not guess existing code when integration depends on exact structure; ask for the current file
- Confirm tests before moving to the next sprint

## NEW CONVERSATION RULE
At the start of a new conversation, use this file as the handoff/context and continue from CURRENT STATUS. Do not restart completed modules.
