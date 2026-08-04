# MY MIRROR — COMPLETE PROJECT PLAN

## 1. Project identity

Application name: My Mirror

Tagline:

Your private space to reflect, plan, and take action.

My Mirror is a private personal life-management system.

It helps the user:

- Define who they want to become
- Keep their life vision visible
- Turn goals into projects
- Turn projects into daily tasks
- Focus on one important action
- Track time and progress
- Review results
- Learn from mistakes
- Store notes and personal knowledge
- Use AI to organize, plan and reflect

My Mirror is not only a task manager.

It is a personal system for managing direction, execution, progress and reflection.

---

## 2. Important platform decision

My Mirror must be built as a website first.

The workflow is:

Mobile-first React website
→ Test and finish the website
→ Add Capacitor Android
→ Push everything to GitHub
→ GitHub Actions builds the Android APK
→ Download the APK from GitHub

The application must not start as React Native or Expo.

Use:

- React
- Vite
- TypeScript
- Supabase
- Capacitor Android
- GitHub Codespaces
- GitHub Actions

The website and Android application must use the same React codebase.

The website is the main development version.

After the website is stable, Capacitor will package the website inside an Android application.

Android is the only mobile platform.

Do not add:

- iOS
- Xcode
- Apple configuration
- React Native
- Expo
- Local Android Studio requirement
- Local Java requirement
- Local Android SDK requirement

Java, Gradle and Android build tools must run only inside GitHub Actions.

---

## 3. Development environment

The project should be developed in the cloud.

Use:

Source code:
GitHub private repository

Development:
GitHub Codespaces

Code editor:
VS Code in the browser

Backend:
Supabase cloud

Website deployment:
Vercel, Netlify or Cloudflare Pages

Android builds:
GitHub Actions cloud runners

APK distribution:
GitHub Releases or GitHub Actions artifacts

The computer should not need to store the full development environment.

Do not require local installation of:

- Java
- Android Studio
- Android SDK
- Gradle
- Docker
- Supabase local development
- Android emulator

---

## 4. Core application workflow

The entire application follows this workflow:

Vision
↓
Goals
↓
Projects
↓
Milestones
↓
Tasks
↓
Focus sessions
↓
Results
↓
Daily review
↓
Weekly review
↓
Improve the plan

The purpose of each level is:

Vision:
Who do I want to become?

Goals:
What important results do I want?

Projects:
What must I build or complete to reach those goals?

Milestones:
What major stages exist inside the project?

Tasks:
What action must I take?

Focus:
How do I protect time and execute the task?

Results:
What did I actually complete?

Review:
What worked, what failed and what should change?

The application must move the user from thinking to action.

---

## 5. Product rules

My Mirror must remain simple and useful.

Rules:

1. Vision is a compass, not something to track every hour.
2. Goals describe results.
3. Projects organize work.
4. Tasks are the main daily items.
5. Habits are repeated actions, not separate complicated projects.
6. Focus sessions record real execution time.
7. Reviews turn activity into learning.
8. AI suggests actions but does not control the user.
9. AI-generated changes require confirmation.
10. The Home screen must never become crowded.
11. The user should always know what to do next.
12. Every major task should connect to a project.
13. Every important project should connect to a goal.
14. The user should have a maximum of three major active goals.
15. The user should have only a few active projects at one time.

---

## 6. First version scope

Build only the following features for My Mirror V1:

1. Authentication
2. Onboarding
3. Home dashboard
4. Future Card
5. Full Vision page
6. Goals
7. Projects
8. Milestones
9. Tasks
10. Focus timer
11. Focus session history
12. Daily reviews
13. Weekly reviews
14. Notes
15. AI planning assistant
16. Settings
17. Website deployment
18. Android APK cloud build

Do not build these during the first version:

- Money management
- Sport tracking
- English learning
- Photo memories
- Music streaming
- Complex habit system
- Social features
- Team collaboration
- Bank synchronization
- Advanced calendar synchronization

These can be added after the core system works.

---

## 7. Main navigation

Use five bottom-navigation destinations:

1. Home
2. Plan
3. Focus
4. Review
5. Vault

Place the profile and settings button in the upper-right corner.

Navigation structure:

Home
├── Future Card
├── Today's focus
├── Three important tasks
├── Daily progress
└── Quick Add

Plan
├── Vision
├── Goals
├── Projects
├── Milestones
└── All tasks

Focus
├── Current task
├── Timer
├── Focus session result
├── Focus history
└── Time statistics

Review
├── Daily review
├── Weekly review
├── Goal progress
├── Project progress
└── AI insights

Vault
├── Notes
├── Ideas
├── Learning notes
├── Decisions
└── Reflections

---

## 8. Mobile-first website rules

The website must be designed for a phone first.

Target phone widths:

- Minimum: 360px
- Main design width: 390px
- Maximum mobile width: 430px

Requirements:

- Large touch targets
- Bottom navigation
- Android safe-area support
- Mobile keyboard support
- Responsive forms
- No desktop-only hover interactions
- No tiny buttons
- No horizontal scrolling
- No wide desktop tables on phone
- Comfortable one-hand use

Desktop behavior:

- Center the mobile application layout
- Use a reasonable maximum width
- Allow some screens such as Projects and Notes to expand
- Do not redesign it as a completely different desktop application

The website must already look and behave like an Android application before Capacitor is added.

---

## 9. Attractive dark design

My Mirror must have a premium, calm and eye-friendly dark design.

Design personality:

- Private
- Reflective
- Calm
- Modern
- Focused
- Mature
- Premium
- Minimal

Avoid:

- Pure black on every surface
- Excessive neon colors
- Aggressive glowing effects
- Crowded dashboards
- Childish badges
- Tiny text
- Too many charts
- Too many gradients
- Constant animations
- Bright white backgrounds
- Visual noise

## Color system

App background:
#090B10

Secondary background:
#0E1118

Card background:
#141822

Elevated card:
#1A1F2B

Input background:
#111620

Border:
#262C39

Primary text:
#F2F4F7

Secondary text:
#A4ABBA

Muted text:
#6F7787

Primary accent:
#8B7CFF

Accent soft:
#B0A6FF

Success:
#55D6A5

Warning:
#F0C36A

Danger:
#FF7676

Information:
#6CB8FF

Use the purple accent carefully for:

- Primary actions
- Active navigation
- Selected controls
- Important progress
- Focus timer
- Future Card details

## Typography

Use one font family.

Recommended font:
Inter

Use only:

- Regular
- Medium
- Semibold
- Bold

Suggested sizes:

Page title:
28px, semibold

Section title:
18px, semibold

Card title:
16px, medium or semibold

Body:
15px, regular

Small labels:
12px to 13px, medium

Do not use very small text.

## Spacing

Use a consistent spacing system:

- 4px
- 8px
- 12px
- 16px
- 24px
- 32px

## Cards

Cards should use:

- Border radius between 18px and 24px
- Padding between 16px and 20px
- Thin borders
- Soft shadows
- Clear hierarchy
- Comfortable spacing

## Buttons

Primary button:

- Height: approximately 52px
- Rounded corners: 16px
- Purple background
- Clear text
- Optional icon

Secondary button:

- Dark background
- Thin border
- Muted or primary text

Minimum touch area:

44px by 44px

## Motion

Use only calm and useful animation:

- Screen transitions
- Card expansion
- Button press feedback
- Timer animation
- Progress updates
- Small completion feedback

Respect reduced-motion settings.

---

## 10. Splash screen

Purpose:

Introduce My Mirror.

Layout:

Dark background

My Mirror logo

Your private space to reflect,
plan, and take action.

[ Enter My Mirror ]

Use a subtle reflection effect or soft gradient.

Do not use a long splash animation.

---

## 11. Authentication screens

Required screens:

- Sign up
- Sign in
- Forgot password
- Reset password

Login screen example:

My Mirror

Welcome back.
Continue building your future.

Email
Password

[ Sign in ]

Forgot password?
Create an account

Requirements:

- Email authentication
- Password visibility button
- Loading states
- Error messages
- Form validation
- Keep the session active
- Protected application routes
- Logout
- Secure password reset

Use Supabase Authentication.

---

## 12. Onboarding workflow

Onboarding should appear after the first registration.

Do not ask too many questions.

## Step 1 — Personal identity

Question:

Who do you want to become?

Example:

I want to become disciplined, independent, healthy and capable of building useful products.

## Step 2 — Life mission

Question:

What do you want your life to represent?

## Step 3 — Main yearly objective

Question:

What is the most important result you want this year?

## Step 4 — Current focus

Question:

What should receive most of your attention right now?

## Step 5 — First goal

Help the user create one important goal.

## Step 6 — First project

Help the user create one project connected to the goal.

The onboarding answers create the first Future Card.

---

## 13. Home screen

The Home screen must answer:

What matters now?

The Home screen must remain clean.

## Header

Show:

- Greeting
- Current date
- Profile icon

Example:

Good morning, MRROBOT

Tuesday, August 4

## Future Card

The Future Card must be the first major card.

It contains:

1. Personal identity
2. Main yearly objective
3. Current focus

Example:

YOUR FUTURE

I am disciplined, focused and independent.

YEARLY OBJECTIVE

Release a valuable digital product.

CURRENT FOCUS

Build My Mirror V1.

Actions:

[ Reflect ]
[ Open vision ]

The card can use:

- A soft dark-purple gradient
- Subtle reflection lines
- A restrained glow
- Clear typography
- Premium appearance

Do not overload the Future Card.

## Today's main focus

Show one main task.

Example:

TODAY'S FOCUS

Finish the My Mirror Home dashboard

Project:
My Mirror V1

Estimated time:
90 minutes

[ Start focus ]

## Important tasks

Show a maximum of three tasks.

Example:

TODAY

○ Design the Future Card
○ Connect Supabase authentication
○ Write daily review questions

[ View all tasks ]

## Daily progress

Show:

- Tasks completed
- Focus minutes
- Review status

Example:

DAY PROGRESS

Tasks:
1 of 3

Focus:
45 of 120 minutes

Review:
Not completed

## Quick Add

Show a floating plus button.

Options:

- Add task
- Add goal
- Add project
- Add note
- Start focus
- Open Smart Capture

---

## 14. Vision page

Vision is a reference and reflection page.

It is not a daily task tracker.

The Vision page contains:

## Personal identity

Who am I becoming?

Examples:

- Disciplined
- Independent
- Physically strong
- Calm
- Focused
- Skilled programmer
- Responsible
- Financially intelligent

## Life mission

A longer description of what the user wants their life to represent.

## Long-term goals

Goals for approximately three to ten years.

## Yearly objectives

Concrete results for the current year.

## Future-self message

A short message from the user to their future self.

Example:

Keep building. Do not exchange your long-term future for short-term comfort.

## Vision actions

- Edit Vision
- Create a goal
- Update current focus
- Reflect
- Ask AI to improve clarity

The Home page shows only a short summary.

The complete Vision remains on this page.

---

## 15. Goals

A goal describes an important result.

Bad goal:

Work on programming.

Better goal:

Build and release My Mirror V1 before December.

Each goal contains:

- Title
- Description
- Reason
- Target date
- Success measurement
- Status
- Progress
- Related projects
- Notes
- Created date
- Completed date

Goal statuses:

- Planned
- Active
- Paused
- Completed
- Abandoned

Goal card example:

RELEASE MY MIRROR V1

Progress:
35%

Target:
December 2026

Active projects:
2

Completed tasks:
14

Rules:

- Recommend no more than three major active goals.
- Do not calculate progress only from manually entered percentages.
- Progress may use completed milestones and project progress.

---

## 16. Projects

A project is temporary work that produces a result.

Examples:

- Release My Mirror V1
- Reach English B2
- Build a personal portfolio
- Create a consistent fitness routine

Each project contains:

- Title
- Description
- Related goal
- Status
- Start date
- Target date
- Progress
- Milestones
- Tasks
- Notes
- Focus time
- Activity history

Project statuses:

- Idea
- Planned
- Active
- Paused
- Completed
- Archived

Project card example:

MY MIRROR V1

Goal:
Build a valuable digital product

Progress:
42%

Next milestone:
Complete the planning system

Next task:
Build the Home screen

Project detail tabs:

- Overview
- Milestones
- Tasks
- Notes
- Focus time
- Activity

---

## 17. Milestones

Milestones are major stages inside a project.

Example project:

Release My Mirror V1

Milestones:

1. Foundation completed
2. Authentication completed
3. Vision and Home completed
4. Planning system completed
5. Focus and Reviews completed
6. AI assistant completed
7. Android release completed

Each milestone contains:

- Title
- Project
- Target date
- Status
- Position
- Completion date

Statuses:

- Planned
- Active
- Completed
- Skipped

---

## 18. Tasks

Tasks are the main daily execution items.

Each task contains:

- Title
- Description
- Project
- Milestone
- Goal inherited from project
- Priority
- Status
- Due date
- Scheduled date
- Estimated time
- Actual time
- Subtasks
- Notes
- Completion time

Task statuses:

- Inbox
- Planned
- Today
- In progress
- Completed
- Cancelled

Priorities:

- Low
- Normal
- High
- Critical

Task views:

- Today
- Upcoming
- Inbox
- Completed
- By project
- By goal

When a task is completed:

1. Save completion time.
2. Save actual time if available.
3. Update Today progress.
4. Update related milestone progress.
5. Update project progress.
6. Include the result in the daily review.
7. Show a small mature completion animation.

Do not use excessive celebration.

---

## 19. Focus system

The Focus page is for execution.

## Before starting

Ask:

What are you working on?

Select:

- Task
- Duration
- Focus mode

Duration options:

- 25 minutes
- 50 minutes
- 90 minutes
- Custom

Example:

TASK

Build the Home screen

PROJECT

My Mirror V1

DURATION

25 min
50 min
90 min
Custom

[ Start focus ]

## Active focus screen

Hide unnecessary elements.

Show:

- Task title
- Project
- Timer
- Pause
- Finish
- Quick distraction note

Example:

BUILD HOME SCREEN

My Mirror V1

42:18

Stay with the task.

[ Pause ]
[ Finish ]

## Finish workflow

Ask:

What was the result?

Options:

- Completed
- Made progress
- Blocked
- Stopped

Then ask:

- What did you accomplish?
- What blocked you?
- What is the next action?

Save:

- Start time
- End time
- Duration
- Task
- Project
- Result
- Reflection

---

## 20. Daily review

The daily review should take only a few minutes.

Automatically show:

- Tasks completed
- Tasks unfinished
- Focus minutes
- Projects worked on
- Notes created

Ask:

1. What did I complete?
2. What was my best use of time?
3. What distracted me?
4. What did I learn?
5. What is tomorrow's main priority?

At the end:

- Save tomorrow's main focus.
- Suggest unfinished tasks.
- Allow the user to reschedule or remove tasks.

---

## 21. Weekly review

The weekly review should include:

- Main achievement
- Goals progress
- Projects progress
- Milestones completed
- Tasks completed
- Tasks repeatedly postponed
- Focus time by project
- Main problems
- Lessons learned
- Best use of time
- Next week's main focus

At the end create:

- Next week's priority
- Projects to continue
- Projects to pause
- Tasks to schedule
- One behavior to improve

The AI may generate a summary, but the user must be able to edit it.

---

## 22. Vault and Notes

The first version of Vault contains Notes.

Note types:

- Quick note
- Idea
- Learning note
- Project note
- Decision
- Reflection
- Reference

Each note can connect to:

- Goal
- Project
- Milestone
- Task
- Daily review
- Weekly review

Each note contains:

- Title
- Content
- Type
- Related item
- Tags
- Pinned status
- Created date
- Updated date

Later versions can add:

- Journal
- Memories
- Photos
- Voice notes
- Skills
- Achievements
- Learning resources

---

## 23. Artificial intelligence features

There are two different AI systems.

## Development AI

The coding agent builds My Mirror.

Examples:

- OpenCode
- Another repository coding agent

The coding agent must read this complete plan before changing files.

## Product AI

This is the assistant inside My Mirror.

The product AI should:

- Help organize input
- Break goals into projects
- Break projects into tasks
- Suggest daily priorities
- Summarize reviews
- Detect blocked projects
- Detect repeatedly postponed tasks
- Suggest realistic next actions
- Summarize notes

The AI should not:

- Make important decisions without confirmation
- Delete data automatically
- Create dozens of tasks automatically
- Expose private information
- Pretend to be a therapist
- Make medical conclusions
- Control the user's life

---

## 24. AI Smart Capture

The user can write naturally:

Tomorrow I need to finish authentication for My Mirror and work on it for two hours.

AI returns:

{
  "type": "task",
  "title": "Finish authentication",
  "project": "My Mirror V1",
  "scheduled_date": "tomorrow",
  "estimated_minutes": 120
}

The application must show a confirmation preview.

Buttons:

- Confirm
- Edit
- Cancel

AI must never save important data silently.

---

## 25. AI goal breakdown

Input:

Release My Mirror V1.

AI may suggest:

Project:
Build My Mirror V1

Milestones:

1. Create project foundation
2. Build authentication
3. Build Vision and Home
4. Build goals and projects
5. Build tasks and focus
6. Build reviews
7. Add AI assistant
8. Release Android APK

The user selects which suggestions to create.

---

## 26. AI daily planning

The AI reviews:

- Active goals
- Active projects
- Deadlines
- Today's tasks
- Unfinished tasks
- Estimated task time
- User's available time
- Recent focus history

AI recommends:

- One main focus
- Maximum three important tasks
- Suggested order
- Estimated total time
- Tasks to postpone or remove

The user confirms the plan.

---

## 27. AI weekly review

The AI summarizes:

- What progressed
- What was completed
- What remained blocked
- Where time was spent
- Tasks repeatedly postponed
- Projects without progress
- Suggested focus for the next week

The summary must be editable.

---

## 28. AI project assistant

Inside a project, the user can ask:

- What is my next step?
- Break this milestone into tasks.
- Summarize my project notes.
- What is blocking this project?
- Create a realistic seven-day plan.
- Which tasks are unnecessary?
- What should I prioritize?

The assistant should use only data connected to that project unless broader access is necessary.

---

## 29. AI security architecture

Never put an AI secret key inside:

- React code
- Browser environment variables
- Capacitor APK
- GitHub repository
- Public files

Correct architecture:

My Mirror React frontend
↓
Authenticated Supabase Edge Function
↓
AI provider
↓
Structured AI response
↓
User confirmation
↓
Save to Supabase

Store AI keys in:

Supabase Edge Function secrets

Rules:

- Require authenticated users.
- Add request-rate limits.
- Validate all AI responses.
- Use structured JSON.
- Send only required data.
- Do not send the entire database.
- Do not log private note content unnecessarily.
- Allow AI features to be disabled.
- Require confirmation before database changes.

---

## 30. Technology stack

## Frontend website

- React
- Vite
- TypeScript
- React Router

## Design

- Tailwind CSS
- CSS variables
- Lucide React icons

## Forms and validation

- React Hook Form
- Zod

## Server state

- TanStack Query

## Small interface state

- Zustand only when necessary

Do not put all server data in Zustand.

## Backend

- Supabase PostgreSQL
- Supabase Authentication
- Supabase Storage later
- Supabase Edge Functions
- Supabase Row Level Security

## Website hosting

Choose one:

- Vercel
- Netlify
- Cloudflare Pages

## Android conversion

- Capacitor Core
- Capacitor CLI
- Capacitor Android

## Cloud development

- GitHub Codespaces

## Cloud Android build

- GitHub Actions

## APK distribution

- GitHub Actions artifacts
- GitHub Releases

---

## 31. Database structure

## profiles

Fields:

- id
- display_name
- avatar_url
- timezone
- onboarding_completed
- created_at
- updated_at

## visions

Fields:

- id
- user_id
- life_mission
- personal_identity
- future_message
- current_focus
- main_yearly_objective
- created_at
- updated_at

## goals

Fields:

- id
- user_id
- title
- description
- reason
- target_date
- success_metric
- status
- progress
- completed_at
- created_at
- updated_at

## projects

Fields:

- id
- user_id
- goal_id
- title
- description
- status
- start_date
- target_date
- progress
- completed_at
- created_at
- updated_at

## milestones

Fields:

- id
- user_id
- project_id
- title
- status
- target_date
- position
- completed_at
- created_at
- updated_at

## tasks

Fields:

- id
- user_id
- project_id
- milestone_id
- title
- description
- status
- priority
- due_date
- scheduled_date
- estimated_minutes
- actual_minutes
- completed_at
- created_at
- updated_at

## task_subtasks

Fields:

- id
- user_id
- task_id
- title
- completed
- position
- created_at
- updated_at

## focus_sessions

Fields:

- id
- user_id
- task_id
- project_id
- started_at
- ended_at
- duration_minutes
- result
- reflection
- next_action
- created_at

## daily_reviews

Fields:

- id
- user_id
- review_date
- best_result
- best_use_of_time
- distraction
- lesson
- tomorrow_priority
- ai_summary
- created_at
- updated_at

## weekly_reviews

Fields:

- id
- user_id
- week_start
- main_achievement
- problems
- lessons
- next_week_focus
- behavior_to_improve
- ai_summary
- created_at
- updated_at

## notes

Fields:

- id
- user_id
- goal_id
- project_id
- milestone_id
- task_id
- type
- title
- content
- tags
- pinned
- created_at
- updated_at

## ai_requests

Fields:

- id
- user_id
- request_type
- status
- created_at

Do not store private prompt content unless necessary.

---

## 32. Supabase security

Enable Row Level Security on every private table.

Every personal table must contain:

user_id

A user must only:

- Read their own rows
- Create rows using their own user ID
- Update their own rows
- Delete their own rows

Never disable Row Level Security to fix a frontend problem.

Never expose:

- Supabase service-role key
- Database password
- AI secret key
- GitHub token
- Android signing secrets

The public Supabase anonymous key may exist in the frontend only when Row Level Security is correct.

---

## 33. Repository structure

my-mirror/
├── src/
│   ├── app/
│   │   ├── router.tsx
│   │   ├── providers.tsx
│   │   └── routes.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   └── feedback/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── home/
│   │   ├── vision/
│   │   ├── goals/
│   │   ├── projects/
│   │   ├── milestones/
│   │   ├── tasks/
│   │   ├── focus/
│   │   ├── reviews/
│   │   ├── notes/
│   │   ├── settings/
│   │   └── ai/
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── query-client.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   │
│   ├── pages/
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   │
│   ├── types/
│   └── utils/
│
├── supabase/
│   ├── migrations/
│   └── functions/
│       ├── smart-capture/
│       ├── plan-day/
│       ├── break-down-goal/
│       ├── project-assistant/
│       └── weekly-review/
│
├── public/
├── android/
├── .github/
│   └── workflows/
│       ├── quality.yml
│       ├── deploy-web.yml
│       └── android-apk.yml
│
├── AGENTS.md
├── PROJECT_PLAN.md
├── README.md
├── capacitor.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts

The android folder is added only after the website is stable.

---

## 34. Website-first implementation phases

## Phase 1 — Website foundation

Build only:

- Vite React TypeScript project
- React Router
- Folder structure
- Mobile application shell
- Dark design tokens
- Reusable Button
- Reusable Card
- Reusable Input
- Reusable Modal
- Reusable Empty State
- Bottom navigation
- Placeholder pages
- Supabase client placeholder
- Environment variable example
- ESLint
- TypeScript checks
- Production website build

Do not add Android yet.

## Phase 2 — Authentication website

Build:

- Registration
- Login
- Logout
- Password reset
- Protected routes
- Session handling
- User profile
- Supabase security policies

## Phase 3 — Onboarding, Vision and Home website

Build:

- Onboarding
- Personal identity
- Life mission
- Main yearly objective
- Current focus
- Full Vision page
- Future Card
- Home dashboard
- Today's focus
- Important tasks
- Quick Add

## Phase 4 — Goals, projects and milestones website

Build:

- Goal creation
- Goal editing
- Goal deletion
- Project creation
- Project editing
- Project deletion
- Goal and project connection
- Milestones
- Progress calculations

## Phase 5 — Tasks website

Build:

- Task creation
- Task editing
- Task completion
- Inbox
- Today
- Upcoming
- Completed
- Project task lists
- Task filters
- Subtasks

## Phase 6 — Focus website

Build:

- Task selection
- Timer
- Pause
- Resume
- Finish
- Session result
- Session reflection
- Focus history
- Time totals

When running in the browser, the timer must be based on timestamps and not only a JavaScript interval.

This helps the timer remain accurate when the browser tab becomes inactive.

## Phase 7 — Reviews and Notes website

Build:

- Daily review
- Weekly review
- Progress summaries
- Notes
- Project notes
- Goal notes
- Search
- Pinned notes

## Phase 8 — AI website features

Build:

- Smart Capture
- Goal breakdown
- Daily planning
- Project assistant
- Weekly review summary
- Confirmation before saving
- AI error handling
- Rate limiting

## Phase 9 — Website testing and release

Before Android conversion:

- Test all pages on mobile widths.
- Test Chrome on Android.
- Test authentication.
- Test database security.
- Test forms.
- Test focus timer.
- Test offline error states.
- Test slow network states.
- Test production website build.
- Deploy the website.
- Fix all serious website problems.

Only after the website is stable should Android packaging begin.

---

## 35. Convert the website to Android

After the website is complete and stable, install Capacitor.

Commands:

npm install @capacitor/core @capacitor/cli @capacitor/android

Initialize:

npx cap init "My Mirror" com.mrrobot.mymirror

Build the website:

npm run build

Add Android:

npx cap add android

Synchronize:

npx cap sync android

The Capacitor configuration must use the Vite production folder:

webDir: "dist"

The final flow is:

React source code
↓
Vite production website build
↓
dist folder
↓
Capacitor copies dist into Android
↓
Android WebView displays the application
↓
GitHub Actions creates the APK

Commit the Android folder to GitHub after it is generated.

Do not build Android locally.

Do not run:

npx cap open android

Do not require Android Studio.

Do not require Java on the user's computer.

---

## 36. GitHub cloud build workflow

The repository must include:

.github/workflows/android-apk.yml

The GitHub Action must:

1. Check out the repository.
2. Install Node.js.
3. Install npm dependencies.
4. Run lint.
5. Run TypeScript checks.
6. Build the React website.
7. Install Java on the GitHub runner.
8. Synchronize Capacitor Android.
9. Give Gradle permission to execute.
10. Build the release APK.
11. Upload the APK as a GitHub Actions artifact.
12. Optionally attach it to a GitHub Release.

Workflow:

Push code to GitHub
↓
GitHub Actions starts
↓
React website is built
↓
Capacitor synchronizes Android
↓
GitHub cloud installs Java and Android build tools
↓
Gradle creates APK
↓
APK is uploaded to GitHub
↓
Download APK on Android phone

The user's computer does not build the APK.

---

## 37. GitHub release workflow

For stable releases:

1. Finish and test the website.
2. Push stable code to main.
3. Create a version tag.

Example:

git tag v1.0.0
git push origin v1.0.0

4. GitHub Actions builds the APK.
5. GitHub creates a Release.
6. Attach:

My-Mirror-v1.0.0.apk

Release examples:

- v0.1.0 — Foundation
- v0.2.0 — Vision and planning
- v0.3.0 — Focus and reviews
- v0.4.0 — AI assistant
- v1.0.0 — First stable Android release

---

## 38. Application size rules

To keep the Android APK small:

- Keep personal data in Supabase.
- Keep photos in Supabase Storage.
- Do not bundle user files in the APK.
- Do not bundle large videos.
- Do not bundle complete music libraries.
- Compress application images.
- Prefer WebP for photos and backgrounds.
- Use SVG for simple icons.
- Limit custom font weights.
- Remove unused npm packages.
- Avoid unnecessary Capacitor plugins.
- Lazy-load large screens.
- Use code splitting.
- Do not include source maps in the production APK unless needed.

The APK contains:

- HTML
- CSS
- JavaScript
- Capacitor Android wrapper
- Required native plugins
- Small application assets

The website version and APK use the same frontend code.

---

## 39. Future native Android features

Add native plugins only when necessary.

Possible later plugins:

- Local notifications
- Haptic feedback
- Status bar control
- App lifecycle
- Camera
- Photo picker
- Microphone
- File access
- Share
- Biometrics

Do not install all plugins at the beginning.

Every native plugin can increase complexity and application size.

---

## 40. Quality requirements

Every phase must pass:

- ESLint
- TypeScript strict checks
- Production website build
- Mobile responsive testing
- Loading state testing
- Error state testing
- Empty state testing
- Supabase security testing

Required scripts:

npm run dev
npm run lint
npm run typecheck
npm run build

Do not continue to the next phase while serious errors remain.

---

## 41. Agent development rules

The coding agent must follow these rules:

1. Read this entire plan before changing code.
2. Inspect the repository first.
3. Start in planning mode.
4. Work on one phase at a time.
5. Do not build Android before the website is stable.
6. Do not use React Native.
7. Do not use Expo.
8. Do not add iOS.
9. Use strict TypeScript.
10. Use mobile-first responsive design.
11. Keep components small and reusable.
12. Do not rewrite working code unnecessarily.
13. Do not install unnecessary dependencies.
14. Never expose secret keys.
15. Never disable Row Level Security.
16. AI calls must use Supabase Edge Functions.
17. AI database changes require user confirmation.
18. Run lint after major changes.
19. Run TypeScript checks after major changes.
20. Run the production website build.
21. Fix errors before stopping.
22. List all created and modified files.
23. Explain important architecture decisions.
24. Stop after completing the requested phase.
25. Wait for approval before starting the next phase.

---

## 42. First task for the coding agent

You are the lead developer and product engineer for an application called My Mirror.

Read the complete PROJECT_PLAN.md before making changes.

My Mirror must be built as a mobile-first React website first.

Do not build a React Native or Expo application.

The website must be completed and tested before Android is added.

After the website is stable, use Capacitor Android.

The Android APK must be built in the cloud using GitHub Actions.

The user must not need Java, Android Studio or the Android SDK locally.

Technology:

- React
- Vite
- TypeScript
- React Router
- Tailwind CSS
- Lucide React
- React Hook Form
- Zod
- TanStack Query
- Supabase
- Capacitor Android later
- GitHub Codespaces
- GitHub Actions

Design:

- Attractive
- Premium
- Calm
- Eye-friendly dark mode
- Mobile-first
- Minimal
- Mature

Main colors:

- Background: #090B10
- Secondary background: #0E1118
- Cards: #141822
- Elevated cards: #1A1F2B
- Border: #262C39
- Primary text: #F2F4F7
- Secondary text: #A4ABBA
- Muted text: #6F7787
- Accent: #8B7CFF
- Success: #55D6A5
- Warning: #F0C36A
- Danger: #FF7676

Main navigation:

1. Home
2. Plan
3. Focus
4. Review
5. Vault

Core workflow:

Vision
→ Goals
→ Projects
→ Milestones
→ Tasks
→ Focus sessions
→ Results
→ Reviews
→ Improve the plan

Begin with Phase 1 only.

Phase 1 requirements:

- Create the Vite React TypeScript foundation.
- Configure strict TypeScript.
- Add React Router.
- Add Tailwind CSS.
- Add Lucide React.
- Create the folder structure from PROJECT_PLAN.md.
- Create the dark design tokens.
- Create a mobile application shell.
- Create reusable Button, Card, Input and Modal components.
- Create bottom navigation.
- Create placeholder pages for Home, Plan, Focus, Review and Vault.
- Add a profile/settings button.
- Create a Supabase client placeholder.
- Create .env.example.
- Create loading, empty and error-state components.
- Add ESLint.
- Add typecheck and build scripts.
- Create README.md.
- Create AGENTS.md.
- Do not implement authentication yet.
- Do not implement database tables yet.
- Do not add Capacitor yet.
- Do not create the Android folder yet.

Before modifying files:

1. Inspect the repository.
2. Present a Phase 1 implementation plan.
3. Wait for approval.

After approval:

1. Implement Phase 1.
2. Run lint.
3. Run TypeScript checks.
4. Run the production website build.
5. Fix all errors.
6. List every changed file.
7. Explain the architecture.
8. Stop and wait for Phase 2 approval.

The first milestone is:

A polished, attractive and eye-friendly dark mobile website shell with five working navigation pages and a reusable design system.

Do not attempt to finish the entire application in one response.
