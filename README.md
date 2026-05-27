# ✂️ SkyBarber - Full-Stack Barber Appointment Automation

SkyBarber is a modern Full-Stack web application designed for barber shop management and appointment automation. Built using Node.js, TypeScript, Express, and Firebase Firestore, it follows enterprise-level architecture patterns with automated CI/CD pipelines and testing suites.

---

## 🚀 Live Demo & Cloud Deployment
- **Frontend App:** [https://skybarber.vercel.app](https://skybarber.vercel.app) *(Replace with your actual Vercel link!)*
- **Database Backup Scripts:** Included in root directory as `firestore-schema.json` (NoSQL) and `schema.sql` (Relational SQL).

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Languages:** HTML5, CSS3 (Modern Responsive UI), JavaScript (ES6+)
- **Dynamic Routing & State:** Session-based authentication & route guards.

### Backend
- **Runtime & Language:** Node.js with TypeScript (`ts-node-dev`)
- **Framework:** Express.js (RESTful API Design)
- **Database:** Firebase Cloud Firestore (NoSQL Document Database)

### DevOps & Testing
- **CI/CD Pipeline:** GitHub Actions Automation
- **Cloud Hosting:** Vercel Environment
- **Unit Testing:** Jest Suite with `ts-jest`
- **E2E Testing:** Playwright Automated UI Engine

---

## 🧪 Testing and Execution Commands

Before running UI tests, ensure that both the backend server and frontend local server are running concurrently.

| Test Type | Directory | Command | Description |
| :--- | :--- | :--- | :--- |
| **Backend Unit Tests (Jest)** | `/Backend` | `npm run test` | Validates business logic rules (Pricing and operating hours). |
| **Frontend UI Tests (Playwright)** | Root (`/`) | `npx playwright test` | Runs headlessly to test authentication forms. |
| **Playwright Interactive UI** | Root (`/`) | `npx playwright test --ui` | Launches interactive browser runner for visual verification. |

---

## ⚙️ Automated CI/CD Pipeline Workflow

Our automated workflow engine triggers seamlessly on every codebase synchronization (`push` or `pull_request` to `main` branch):
1. **Continuous Integration (CI):** Installs dependencies and runs the **Jest Unit Testing Suite**.
2. **Continuous Deployment (CD):** Upon successful verification of tests, artifacts are securely packaged and deployed live onto the **Vercel Cloud**.
