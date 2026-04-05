# 📈 Finance Data Management & Access Control API

## 🎯 Project Overview
This project is a high-performance, lightweight backend designed to handle financial transaction processing with strict **Role-Based Access Control (RBAC)**. Built using **Node.js and Express**, it demonstrates a clean, modular architecture suitable for modern financial dashboards.

---

## 🚀 Key Architectural Pillars

### 1. 🛡️ Role-Based Security (RBAC)
The system enforces three distinct access tiers to ensure data integrity:
- **Admin**: Full administrative control (CRUD Records + User Management).
- **Analyst**: Data insights & summary access (View Records + View Dashboard).
- **Viewer**: Read-only access (View Records).

### 2. ⚡ Lite & Independent
- **Zero Heavy Dependencies**: Built with only `express` and standard Node.js modules.
- **Smart Persistence**: Implemented a custom JSON-based database layer in `src/models/db.js` for instant setup without needing an external SQL/NoSQL installation.

### 3. 🏗️ Clean Modular Structure
The codebase follows the principle of **Separation of Concerns**:
- **Routes**: Clean API entry points.
- **Controllers**: Managing the request-response lifecycle.
- **Services**: Complex financial aggregation and logic (e.g., summary calculations).
- **Middlewares**: Centralized Auth and RBAC enforcement.

---

## 🛠️ Setup & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
*The server will be available at `http://localhost:3000`.*

### 3. Verification (Automated Test)
I have included a functional test script to demonstrate the system's logic instantly:
```bash
node tests/test_api.js
```

---

## 🔑 Authentication Guide (Mock System)
To simulate a "Token" or Session, include the `x-user-id` header in your Postman requests:

| User ID | Role | Description |
| :--- | :--- | :--- |
| `admin-01` | **Admin** | Full system control |
| `analyst-01` | **Analyst** | View insights and transaction lists |
| `viewer-01` | **Viewer** | View lists only |

---

## 📊 Permission Matrix
| Feature | Admin | Analyst | Viewer |
| :--- | :---: | :---: | :---: |
| View Financial Records | ✅ | ✅ | ✅ |
| View Dashboard Summary | ✅ | ✅ | ✅ |
| Create/Edit Records | ✅ | ❌ | ❌ |
| Delete Records | ✅ | ❌ | ❌ |
| Manage User Accounts | ✅ | ❌ | ❌ |

---

## 🧠 Design Decisions & Trade-offs
- **Custom Header Auth**: Chosen over JWT to prioritize **Lite-weight performance** for this assignment while still enforcing 100% security logic in the middleware.
- **Service Layer Pattern**: Analytics logic (Net Balance, Category Totals) was moved to a separate service tier (`summaryService`) to keep controllers lean and testable.
- **Humanized Error Handling**: Error messages are designed to be helpful and conversational (e.g., providing tips on missing headers) to improve front-end integration.

---

## 🛣️ API Endpoints Roadmap

### Records (`/api/records`)
- `GET /api/records` (Filter by `?type=income`, `?category=Salary`)
- `POST /api/records` (Admin Only)
- `PUT /api/records/:id` (Admin Only)

### Insights (`/api/summary`)
- `GET /api/summary` (Aggregated totals for Net Balance and Trends)

### Users (`/api/users`)
- `GET /api/users` (Admin Only: System-wide user list)
- `POST /api/users` (Admin Only: Onboarding)

---

### 📬 Submission Note
*This assignment focuses on backend structural integrity, role enforcement, and reliable data flow. It is designed to be easily integrated with a React/Vue frontend.*
