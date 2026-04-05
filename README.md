# Finance Data Management and Access Control API

## Project Overview
This project is a lightweight, high-performance backend designed to handle financial transaction processing with strict Role-Based Access Control (RBAC). Built using Node.js and Express, it demonstrates a clean, modular architecture suitable for professional financial dashboards.

---

## Key Architectural Pillars

### 1. Role-Based Security (RBAC)
The system enforces three distinct access tiers to ensure data integrity:
- **Admin**: Full administrative control including record management and user onboarding.
- **Analyst**: Access to lists and advanced dashboard summaries.
- **Viewer**: Read-only access to transaction history.

### 2. Lightweight and Independent
- **Zero Heavy Dependencies**: Built with only Express and standard Node.js modules to ensure fast deployment.
- **Smart Persistence**: Implemented a custom JSON-based database layer for instant setup without requiring an external database installation.

### 3. Clean Modular Structure
The codebase follows the principle of Separation of Concerns:
- **Routes**: Clean API entry points.
- **Controllers**: Managing the request-response lifecycle.
- **Services**: Complex financial aggregation and analytical logic.
- **Middlewares**: Centralized authorization and RBAC enforcement.

---

## Setup and Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
*The server will be available at http://localhost:3000.*

### 3. Verification (Automated Test)
I have included a functional test script to demonstrate the system logic immediately:
```bash
node tests/test_api.js
```

---

## Authentication Guide (Mock System)
To simulate a session, include the `x-user-id` header in your API requests:

| User ID | Role | Description |
| :--- | :--- | :--- |
| `admin-01` | Admin | Full system control |
| `analyst-01` | Analyst | View insights and transaction lists |
| `viewer-01` | Viewer | View lists only |

---

## Permission Matrix
| Feature | Admin | Analyst | Viewer |
| :--- | :---: | :---: | :---: |
| View Financial Records | Yes | Yes | Yes |
| View Dashboard Summary | Yes | Yes | Yes |
| Create/Edit Records | Yes | No | No |
| Delete Records | Yes | No | No |
| Manage User Accounts | Yes | No | No |

---

## Design Decisions and Trade-offs
- **Custom Header Auth**: Chosen over JWT to prioritize lightweight performance for this assessment while still enforcing full security logic in the middleware.
- **Service Layer Pattern**: Analytics logic was moved to a separate service tier to keep controllers lean and maintainable.
- **Humanized Error Handling**: Error messages are designed to be conversational and descriptive to improve the front-end developer's experience.

---

## API Endpoints Roadmap

### Records (/api/records)
- `GET /api/records` (Supports filtering by type or category)
- `POST /api/records` (Admin Only)
- `PUT /api/records/:id` (Admin Only)

### Insights (/api/summary)
- `GET /api/summary` (Aggregated totals for Net Balance and Activity)

### Users (/api/users)
- `GET /api/users` (Admin Only: System-wide user list)
- `POST /api/users` (Admin Only: New User Creation)

---

### Submission Note
*This assignment focuses on backend structural integrity, role enforcement, and reliable data flow. It is designed to be easily integrated with any modern front-end framework.*
