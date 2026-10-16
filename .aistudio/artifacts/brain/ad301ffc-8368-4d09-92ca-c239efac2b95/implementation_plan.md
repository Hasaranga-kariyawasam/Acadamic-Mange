# Ruhuna BICT Academic Marks & CGPA Intelligence Suite

A modern, glass-styled academic management and predictive analytics platform built for university students (configured with University of Ruhuna BICT Honours 4-year / 8-semester curriculum). Enables comprehensive continuous assessment tracking (quizzes, assignments, mini-projects, mid & end exams), cohort comparison with student ranking, dynamic GPA/CGPA calculations, scenario-based grade prediction, and credit-weighted weekly study goal distribution.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during clarification:
> - **Initial Data State**: Starts with clean sample data + instant 1-click import/pre-load of official Ruhuna BICT Level 1 Semester 2 batch results (from uploaded official gazette) and CSV/JSON upload.
> - **Student Profile Setup**: Modal or header selector to set/enter personal student index (e.g. `TG/2024/2082` or custom), which dynamically personalizes ranks, cohort standing, and predictive trajectories.
> - **Default Landing View**: **Personal GPA & Target Predictor Dashboard**, providing instant visibility into current SGPA/CGPA, future semester targets, and credit-weighted study hours.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. **8-Semester Academic Lifecycle Hub**: Structured tracker across all 4 academic years (Level 1 Sem 1 through Level 4 Sem 2), storing continuous assessment marks (Quizzes 1-3, Assignments, Mini-projects, Midterm, and End-Semester Exam) with automatic CA/ESA eligibility checking.
  2. **Cohort & Peer Analytics Engine**: Batch result manager supporting full batch results (like the provided 83+ students batch sheet), enabling subject-wise bell curve distribution, student-versus-student direct comparison, and batch percentile/ranking.
  3. **GPA & CGPA Precision Calculator**: Uses official Ruhuna Technology grading scale ($A+=4.0, A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, E=0.0$) with credit-weighted calculations and official classification criteria (First Class $\ge 3.70$, Second Upper $\ge 3.30$, Second Lower $\ge 3.00$, General Pass $\ge 2.00$).
  4. **Future Semester Grade Predictor & Goal Target Engine**: Interactive "What-If" simulation letting students assign projected grades to upcoming courses, calculate resulting CGPA, and set target degree classifications with automated weekly study hour breakdowns based on course credit weight and grade difficulty.

- **Target Persona**: Undergraduates in technical and honours degree programs (specifically tailored for University of Ruhuna Faculty of Technology BICT students and adaptable to any degree).
- **Key Value**: Replaces scattered marks across notebooks and forgotten spreadsheets with a unified, beautiful, and predictive academic cockpit.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Onboarding / Profile Selection**: User enters or chooses their Student Index (e.g., `TG/2024/2082` - KAWESHA W.D.P.) or creates a custom profile.
2. **Dashboard Overview (Home)**: High-level KPI cards for Current CGPA, Latest SGPA, Class Standing / Cohort Rank, Total Completed Credits, and Target Degree Class Progress ring.
3. **Continuous Assessment Log (Current Semester - e.g., Level 2 Sem 2)**:
   - Select course (e.g., ICT2212 or custom added subject).
   - Enter component scores: Quiz 1, Quiz 2, Quiz 3, Lab Assignments, Mini-Project, Mid-Term, End-Exam.
   - Live CA score calculation ($\text{CA} \ge 40\%$ threshold warning to prevent ESA disqualification / WH status).
4. **Cohort Comparison & Peer Benchmarking**:
   - Class Leaderboard with search by Index or Name.
   - Head-to-Head Compare: Select 2 students (e.g., "Me vs Friend A") to compare grade radars and subject-by-subject deltas.
   - Subject Analysis: View grade distribution histogram, mean SGPA, highest grade, and pass rate.
5. **Future Grade Predictor & Target Planner**:
   - Interactive sliders/selects for future semesters (e.g., Level 2 Sem 2, Level 3 Sem 1, etc.).
   - Target Goal Calculator: "I want CGPA 3.50 by graduation" $\to$ displays exact minimum grade requirements in remaining credit units.
   - Weekly Study Plan: Distributes recommended weekly study hours (e.g., 25 hrs/week) proportionally across subjects based on credit weights and target grade intensity.

### Visual Identity & Theme
- **Aesthetic Direction**: Modern white glassmorphism (frosted glass, crisp hairline borders, light translucency, minimal visual noise, zero AI slop, no dark gimmicky gradients).
- **Color Palette**:
  - Neutral Canvas: Crisp white (`#FFFFFF`) with ultra-subtle off-white background (`#F8FAFC`).
  - Glass Surfaces: White with high opacity blur (`rgba(255, 255, 255, 0.85)` with `backdrop-blur-md` and `border border-slate-200/80` with soft ambient shadows).
  - Primary Accent: Deep Slate Indigo (`#1E293B` / `#3B82F6`) for high-intent actions.
  - Academic Grade Accents: Soft emerald for A/A+ grades, sky blue for B grades, amber for C grades, and subtle rose for D/E/WH.
- **Typography & Hierarchy**:
  - Display Font: `Plus Jakarta Sans` for clean titles, headers, and navigation.
  - Body Prose: `Plus Jakarta Sans` / `DM Sans` for readable tables and forms.
  - Tabular Figures: Strictly enforced `tabular-nums font-mono` for all SGPA, CGPA, marks, credits, and rank numbers.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Persistence Strategy**:
  - *Chosen Approach*: Comprehensive `localStorage` with reactive state synchronization and export/import JSON/CSV backup capability.
  - *Why*: Instant zero-latency loading, complete privacy for personal academic grades without requiring third-party credentials, and persistence across sessions.
- **Decision 2: Cohort Data Loading (Clean Sample + 1-Click Ruhuna Batch Gazette)**:
  - *Chosen Approach*: Ship with clean sample data and provide an instant "Load Official Ruhuna Level 1 Sem 2 Batch Results" button, plus a CSV/JSON bulk importer for any semester or cohort.
  - *Why*: Respects user's direct choice for clean initial data while offering the exact data from the uploaded sheets at a single click.
- **Decision 3: Complete 8-Semester Curriculum Pre-population**:
  - *Chosen Approach*: Pre-configure standard Ruhuna BICT 8-semester course structure (including 1st year completed courses, 2nd year courses, 3rd year specializations, and 4th year internship/research project), while allowing users to add, rename, or adjust course credits dynamically.
  - *Why*: Eliminates tedious manual typing of 40+ subjects while preserving total flexibility.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│ [Brand: Ruhuna BICT Marks Hub] — [Dashboard | CA Tracker | Cohort |   │
│  Predictor & Goals | 8-Sem Planner] — [Active Index: TG/2024/2082 ▾]   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     ▼                             ▼
       ┌───────────────────────────┐ ┌───────────────────────────┐
       │   Personal GPA & Target   │ │    Continuous Assessment  │
       │   Cockpit (Home View)     │ │    Log & Component Tracker│
       │  • CGPA / SGPA Progression│ │  • Quizzes 1-3, Labs,     │
       │  • Honor Class Simulator  │ │    Mini-Projects, Mid-Exam│
       │  • Weekly Workload Planner│ │  • CA Eligibility Calc    │
       └───────────────────────────┘ └───────────────────────────┘
                     │                             │
                     ▼                             ▼
       ┌───────────────────────────┐ ┌───────────────────────────┐
       │   Batch & Peer Analytics  │ │   8-Semester Master Grid  │
       │  • Cohort Rank Leaderboard│ │   & Grade Predictor       │
       │  • Head-to-Head Compare   │ │  • What-If Grade Scenario │
       │  • Subject Grade Distros  │ │  • Target CGPA Solver     │
       └───────────────────────────┘ └───────────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │      Local State Store & LocalStorage Persistence       │
       │  • studentProfiles, courses, assessments, batchResults  │
       │  • gradingRules (Ruhuna BICT Scale), goalTargets        │
       └─────────────────────────────────────────────────────────┘
```

### Core Entities & Data Models
- **Course**: `id`, `code` (e.g. `ICT1212`), `name`, `semesterId` (1 to 8), `credits` (1, 2, 3, etc.), `caWeight` (30% or 40%), `esaWeight` (60% or 70%).
- **AssessmentRecord**: `courseId`, `quizzes` (`[{id, score, maxScore}]`), `assignments`, `miniProject`, `midExam`, `endExam`, `caPercentage`, `calculatedGrade`, `notes`.
- **StudentResult**: `studentIndex`, `studentName`, `semesterId`, `grades: { [courseCode]: Grade }`, `sgpa`, `cgpa`, `rank`.
- **GoalTarget**: `targetCgpa`, `targetClass` (First Class, 2nd Upper, etc.), `targetWeeklyHours`, `subjectPriorities`.

---

## 5. Verification Plan

- Run `compile_applet` and `lint_applet` to ensure zero TypeScript errors and clean compilation.
- Verify accurate SGPA & CGPA calculation against official Ruhuna mark sheet data (e.g., student TG/2024/2061: SGPA 3.38, CGPA 3.53).
- Test Continuous Assessment input validation, Head-to-Head student comparison view, and What-If grade prediction solver.
