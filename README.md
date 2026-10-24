# 🪙 PocketGuru v2 — Next-Gen AI Financial Intelligence & Advisory Platform

![PocketGuru Banner](https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80)

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.5.3-119EFF.svg?logo=capacitor)](https://capacitorjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg?logo=supabase)](https://supabase.com/)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter%20Engine-black.svg)](https://openrouter.ai/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary%20Strict-red.svg)](./LICENSE)

**PocketGuru v2** is an enterprise-grade fintech platform combining personal wealth management, intelligent AI-driven financial coaching, and a professional financial consultant advisory ecosystem. Designed for both high-performance Web deployment and native mobile experiences (Android APK via Capacitor).

---

## 🌟 Key Platform Modules

### 1. 💼 Personal Wealth Management (User Flow)
* **Real-Time Financial Dashboard**: Track net worth, cash flow, monthly income vs. expenditures, and multi-category transactions.
* **Smart Budget Allocation**: Category-level tracking (Housing, Groceries, Transportation, Utilities, Emergency Savings, Leisure) with visual variance alerts for budget overruns.
* **Goal-Oriented Savings**: Sinking funds and target deadlines with progress tracking and recurring contribution calculations.
* **Visual Analytics & Insights**: Interactive spending breakdown, daily/weekly burn rates, and financial health scoring.

### 2. 🤖 AI PocketGuru Financial Engine
* **24/7 Context-Aware Coaching**: Analyzes spending habits, flags unnecessary recurring charges, and suggests actionable savings plans.
* **Robust Multi-Model Cascade**: Built on OpenRouter with automatic fallbacks (`NVIDIA Nemotron 3 Ultra 550B`, `Nemotron 3.5 Lightning`, `Llama 3.3 70B`, `Google Gemma`).
* **Zero-Knowledge Data Hygiene**: Clean prompt abstraction ensuring privacy of financial records during model evaluation.

### 3. 🎓 Certified Consultant Advisory Portal
* **Dedicated Consultant Workspace**: Tailored dashboard for financial planners with client scheduling, earnings metrics, and satisfaction scores.
* **Client Profile & Budget Plan Inspection**:
  * Complete financial snapshot (Income, Expenses, Savings Ratio, Primary Financial Goal).
  * Agreed monthly budget allocations with target vs. actual variance analysis.
  * Session history timeline with discussion summaries and actionable next steps.
  * Private consultant observation logs and recommendations.
* **Integrated Bi-Directional Messaging**: Real-time interactive communication channel between consultants and their clients.

### 4. 🛡️ Multi-Role Security & Admin Control
* **Role-Based Access Control (RBAC)**: Strict segregation between Users, Consultants, and System Administrators.
* **Exclusive Administrative Portal**: Protected administrative controls with dedicated credential verification.
* **Tamper-Resistant Architecture**: Protection against client-side privilege escalation.

---

## 🏗️ Technical Architecture

```text
┌────────────────────────────────────────────────────────┐
│               PocketGuru Client Application            │
│  (React 18 + TypeScript + Motion + Modern Design System) │
└───────────────────────────┬────────────────────────────┘
                            │
       ┌────────────────────┴────────────────────┐
       ▼                                         ▼
┌───────────────────────┐             ┌───────────────────────┐
│     Web Application   │             │   Native Android APK  │
│    (Responsive Desktop│             │  (Capacitor 8 Bridge  │
│       & Mobile Web)   │             │    Native Device API) │
└──────────┬────────────┘             └───────────┬───────────┘
           │                                      │
           └──────────────────┬───────────────────┘
                              ▼
┌────────────────────────────────────────────────────────┐
│             Secure Express & Node.js Engine            │
│         - REST APIs & Auth Sanitization Middleware     │
│         - PostgreSQL Pooler (Connection Management)    │
│         - OpenRouter AI Multi-Model Resilience Engine   │
└───────────────────────────┬────────────────────────────┘
                            │
       ┌────────────────────┴────────────────────┐
       ▼                                         ▼
┌───────────────────────────────┐  ┌───────────────────────────┐
│  Supabase PostgreSQL Cluster │  │     OpenRouter AI APIs    │
│  - Profiles & RBAC Tables     │  │  - Primary: Nemotron 550B │
│  - Transactions & Budgets     │  │  - Secondary Fallbacks    │
│  - Row-Level Security         │  │  - Real-time Advisor Chat │
└───────────────────────────────┘  └───────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite 6 |
| **Animations & UI** | Motion (Framer Motion), Lucide Icons, Vanilla Design Tokens |
| **Mobile Runtime** | Capacitor 8 (Android SDK / Java 21) |
| **Backend API** | Node.js, Express, PG Pool (IPv4/IPv6 Pooler) |
| **Database** | Supabase Managed PostgreSQL |
| **AI Intelligence** | OpenRouter Unified API (Multi-Model Resilient Fallback) |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher
* **Android Studio & SDK** (Optional, for Android APK builds)

### 1. Clone the Repository
```bash
git clone https://github.com/abusayedrabbi327/Pocket_Guru_v2.git
cd Pocket_Guru_v2
```

### 2. Environment Configuration
Copy the provided environment templates and configure your credentials:

```bash
# Frontend & Client Configuration
cp .env.example .env

# Backend Server Configuration
cp server/.env.example server/.env
```

Fill in your respective PostgreSQL connection strings, Supabase keys, and OpenRouter API credentials in the newly created `.env` files.

### 3. Install Dependencies
```bash
# Install frontend & mobile dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..
```

### 4. Run Development Servers
```bash
# In terminal 1: Launch Backend API Server
npm run server

# In terminal 2: Launch Frontend Development Server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📱 Mobile Android Build

To compile a native debug/release Android APK:

```bash
# Synchronize web assets and trigger Gradle assembly
npm run build:apk
```
The compiled package will be output to `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 🔒 Security & Privacy Practices

* **Credential Segregation**: All live API keys, database connection strings, and admin credentials are isolated in local environment configurations and strictly excluded from version control via `.gitignore`.
* **SQL Injection Mitigation**: All backend database queries employ parameterized prepared statements.
* **Role Verification**: Admin routes and privileged endpoints are enforced with server-side and client-side guards.
* **Zero PII Exposure**: Personal identifiable information and live production database snapshots are excluded from public artifacts.

---

## 📄 License & Intellectual Property

This project is released under a **Strict Commercial & Proprietary License**. All rights, title, and ownership remain exclusively with the author. 

Unauthorized reproduction, redistribution, sublicensing, or commercial deployment is strictly prohibited. See the complete terms in [`LICENSE`](./LICENSE).

For commercial licensing, enterprise partnerships, or inquiries:
📧 **Contact**: `abusayed102188@gmail.com`