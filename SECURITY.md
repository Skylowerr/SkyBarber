# Security Policy

The security of the SkyBarber Web API is our highest priority. We welcome reports of any security vulnerabilities regarding our server endpoints, database connections, or authentication mechanisms.

## Supported Versions

The following versions of the API are currently receiving security patches:

| Version | Supported          |
| ------- | ------------------ |
| v1.0.x  | ✅ Supported        |
| < v1.0  | ❌ Not Supported    |

## Reporting a Vulnerability

If you discover a security vulnerability in this API (e.g., bypassing JWT authentication, accessing unauthorized Firebase data, CORS misconfigurations), **PLEASE DO NOT create a public GitHub Issue.** Doing so may allow others to exploit the server before a patch is deployed to Vercel.

Instead, please report security vulnerabilities directly via email to:
**[gokceemirhan23@gmail.com]**

In your email, please include:
* The type of vulnerability (e.g., Endpoint Authorization Flaw, NoSQL Injection, Rate Limiting Bypass)
* Step-by-step instructions (or a Postman/CURL request example) to reproduce the issue
* Potential impact of the vulnerability on user data

We are committed to responding to all security reports within 48 hours and will patch the server side immediately. Thank you for helping keep our infrastructure secure.
