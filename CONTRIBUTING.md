# Contributing to SkyBarber Web API

Thank you for your interest in contributing to the SkyBarber Web project! This repository contains the Node.js backend, RESTful API, and serverless deployment configurations (Vercel) for the SkyBarber ecosystem.

## 🚀 How to Contribute

1. **Fork the Repository:** Fork the project to your own GitHub account.
2. **Create a New Branch:** Follow Git Flow standards.
   - For new endpoints or features: `git checkout -b feature/your-feature-name`
   - For bug fixes: `git checkout -b fix/your-bug-name`
3. **Make Your Changes:** Write your code and stick to the existing MVC/Router architecture.
4. **Test Your Code:** Ensure your new endpoints work properly using Postman or Thunder Client before committing.
5. **Commit Your Changes:** Keep your commit messages descriptive (e.g., `[Feature] added appointment cancellation endpoint`).
6. **Open a Pull Request (PR):** Submit your changes. Detail the API route changes or database schema modifications in the PR description.

## 🛠 Development Environment Setup

This project runs on Node.js and uses Firebase for database management.

1. Clone your fork and run `npm install` to install dependencies.
2. Duplicate `.env.example` as `.env` and fill in your Firebase and JWT secret keys.
3. Run `npm run dev` to start the local development server.

## 📝 Coding Standards
- Always handle API errors gracefully and return standardized JSON responses.
- Do not expose `.env` variables or sensitive Firebase admin credentials in your commits.
- Ensure your routes are protected with the JWT middleware where authentication is required.
