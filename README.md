# ✂️ SkyBarber - Full-Stack Barber Appointment Automation

SkyBarber is a modern Full-Stack web application designed for barber shop management and appointment automation. Built using Node.js, TypeScript, Express, and Firebase Firestore, it follows enterprise-level architecture patterns with automated CI/CD pipelines, robust testing suites, and a fully serverless cloud deployment.

---

## 🚀 Live Demo & Cloud Deployment
The application is deployed using a decoupled architecture on Vercel:
- **Frontend (UI):** [https://skybarber-web.vercel.app](https://skybarber-web.vercel.app)
- **Backend (API):** [https://sky-barber-alpha.vercel.app](https://sky-barber-alpha.vercel.app) (Serverless Function)
- **Database Backup Scripts:** Included in the root directory as `firestore-schema.json` (NoSQL) and `schema.sql` (Relational SQL).

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Languages:** HTML5, CSS3 (Modern Responsive UI), JavaScript (ES6+)
- **Dynamic Routing & State:** Session-based authentication & route guards.
- **Integration:** Configured with strict CORS policies and dynamic environment variables for secure API communication.

### Backend
- **Runtime & Language:** Node.js with TypeScript
- **Framework:** Express.js (RESTful API Design)
- **Database:** Firebase Cloud Firestore (NoSQL Document Database)
- **Cloud Architecture:** Vercel Serverless Functions (`@vercel/node`) with in-memory environment credential injection.

### DevOps & Testing
- **CI/CD Pipeline:** GitHub Actions (CI) & Vercel Native Git Integration (CD)
- **Cloud Hosting:** Vercel Environment (Decoupled UI & API environments)
- **Unit Testing:** Jest Suite with `ts-jest`
- **E2E Testing:** Playwright Automated UI Engine

---

## 🧪 Testing and Execution Commands

Before running UI tests locally, ensure that both the backend server and frontend local server are running concurrently.

| Test Type | Directory | Command | Description |
| :--- | :--- | :--- | :--- |
| **Backend Unit Tests (Jest)** | `/Backend` | `npm run test` | Validates business logic rules (Pricing and operating hours). |
| **Frontend UI Tests (Playwright)** | Root (`/`) | `npx playwright test` | Runs headlessly to test authentication forms and booking flows. |
| **Playwright Interactive UI** | Root (`/`) | `npx playwright test --ui` | Launches an interactive browser runner for visual verification. |

---

## ⚙️ Automated CI/CD Pipeline Workflow

Our automated workflow engine triggers seamlessly on every codebase synchronization (`push` or `pull_request` to the `main` branch):
1. **Continuous Integration (CI):** GitHub Actions wakes up, installs dependencies, and runs the isolated **Testing Suites (Jest & Playwright)** to ensure code health without affecting the production environment.
2. **Continuous Deployment (CD):** Once the code is pushed, **Vercel's Git Integration** automatically detects changes in the respective directories (`/Frontend` or `/Backend`) and independently deploys the updated Serverless containers securely to the cloud.
