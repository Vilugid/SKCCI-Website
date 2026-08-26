# SAVIOR-KING Commission Church International (SKCCI) Web Platform

> *"Your Church, Your Family."*

A full-stack, cloud-connected digital ministry platform designed for **SAVIOR-KING Commission Church International (SKCCI)**. The application integrates an AI-powered church concierge powered by **Google Gemini**, interactive discipleship training curriculums, milestone-based daily Bible reading trackers with permanent cloud synchronization, real-time prayer request boards with analytics, cell group management with meeting proof verification, and service leadership tools.

---

## 🏆 Hackathon Submission & System Overview

This project was engineered to solve the real-world operational and spiritual discipleship challenges of a growing local and global church community:

1. **AI Concierge ("Hannah")**: Seamlessly guides visitors and members through service schedules, RSVP workflows, sermon outlines, consolidation manuals, fasting commitments, prayer requests, and online streaming in both Tagalog/Filipino and English with graceful offline fallback.
2. **Permanent Scripture Reflection Engine**: Provides personal, lifetime-synced journals for both the *"My First 100 Days with JESUS"* and the *"365-Day Canonical Plan"* with one-click lifetime CSV export.
3. **Discipleship & Cell Management**: Enables cell leaders to register groups, track weekly attendance, upload verified meeting photo proofs with client-side image compression, and inspect 6-month growth trends via Recharts.
4. **Prayer Warrior Hub**: Facilitates daily focused intercession, tracking weekly active warriors, monthly trend visualizers, and individual fasting commitments.
5. **Leader Tools & Song Bank**: Houses Sunday service sermon series outlines, Scripture references, Roman numeral teaching breakdowns, embedded worship sets, and an A–Z searchable song lyric database.

---

## 🌟 Feature Breakdown

### 🤖 AI Church Assistant ("Hannah")
- **Google Gen AI Integration**: Utilizes `@google/genai` TypeScript SDK with resilient server-side proxying to protect API keys.
- **Dual-Model Fallback Chain**: Features proactive multi-model fallback (`gemini-3.1-flash-lite` -> `gemini-3.5-flash-lite`) with context-aware system instructions.
- **Bilingual Support**: Fluent in conversational Filipino/Tagalog (with proper cultural honorifics "po" and "opo") and English.
- **Domain-Specific Guidance**: Real-time assistance for service schedules, physical sanctuary directions, online streaming links, sermon breakdowns, and event RSVPs.

### 📖 Bible Reading & Reflection Trackers
- **"My First 100 Days with JESUS"**:
  - Daily chapter reading milestones across the New Testament.
  - Interactive Scripture reflection notes (*"What struck you most?"*) with live character counting and cloud auto-save.
  - Lifetime CSV export of user reflections.
- **"365-Day Bible Reading Guide"**:
  - Full-year canonical reading schedule covering Old Testament, New Testament, Psalms, and Proverbs daily.
  - Year-End December reflection summary and automated annual cycle reset.
  - Dual light/dark reading mode support.

### 🛡️ Cell Group Management & Analytics
- **Group Directory & Leader Hub**: Searchable directory of cell groups by location, day, and ministry category.
- **Meeting Logs & Proof Verification**: Leaders can log weekly meetings, track disciple attendance, and upload JPG photo proof compressed in-browser to save bandwidth.
- **Visual Analytics**: Interactive 6-month attendance and active group trend charts rendered with Recharts.

### 🙏 Prayer Warrior Hub & Fasting Tracker
- **Daily Prayer Focus**: Thematic prayer agendas for Monday through Saturday.
- **Interactive Warrior Counter**: Live counters indicating community participation per prayer focus.
- **Fasting Commitment**: Selectable fast types (*Skip Breakfast, Skip Lunch, Skip Dinner, 24-Hour Fast, Daniel's Fast*).
- **Admin Management**: Dedicated prayer admin portal for reviewing and marking requests as prayed.

### 📜 Discipleship Manuals & Envisioning Curriculum
- **Consolidation Manuals**: Follow-up and discipleship lessons for nurturing new believers.
- **Evangelism & Envisioning Modules**: Advanced kingdom leadership training.
- **Interactive Progress Tracking**: Lesson checkboxes synced with user account profiles.

### 🎵 Leader Tools & Master Song Bank
- **Sunday Preaching Outlines**: Structured sermon series notes, scriptures, Roman numeral breakdowns, and discussion prompts.
- **Embedded Worship Sets**: YouTube worship playlists accompanying each service.
- **Song Bank (A–Z)**: Searchable lyrics database with one-click copy formatted for mobile small groups.

---

## 🛠️ Architecture & Tech Stack

```
[ Client: React 19 + Tailwind CSS + TanStack Query ]
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
[ Express API Server ]       [ Firebase Services ]
   ├─ /api/chat                 ├─ Authentication (Google Sign-In)
   │  (Gemini Gen AI)           ├─ Cloud Firestore (RBAC & Schemas)
   └─ Static Asset Serving      └─ Storage (Optimized Photos)
```

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS 4, Motion, Lucide React, Recharts, React Hot Toast
- **Backend**: Node.js, Express, tsx (dev), esbuild (production CommonJS bundle)
- **AI & ML**: Google Gen AI SDK (`@google/genai`), server-side execution with `process.env.GEMINI_API_KEY`
- **Database & Auth**: Firebase Firestore & Firebase Authentication

---

## 🔒 Security, Hygiene & Privacy Standards

1. **Zero Hardcoded Secrets**: All API keys, tokens, and credentials are strictly injected via environment variables (`process.env.GEMINI_API_KEY`) on the server side.
2. **Server-Side API Proxying**: The Gemini API key is never exposed to the client-side bundle. All interactions are securely routed through `/api/chat`.
3. **Data Isolation & Privacy**: User reflections, progress, and private records are isolated in user-scoped Firestore paths with strict validation in `firestore.rules`.
4. **Resilient Fallbacks**: If the AI service experiences network hiccups or rate limits, Hannah gracefully switches to built-in localized knowledge bases without throwing 500 errors.
5. **No Exposed Personal Data**: Prayer requests and forms use sanitized inputs and secure database models.

---

## 🚀 Setup & Local Development Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (or yarn / pnpm)

### 2. Installation
```bash
git clone <repository-url>
cd savior-king-commission-church
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
GEMINI_API_KEY="your_actual_gemini_api_key"
```

### 4. Run Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

---

## 📦 Production Build & Deployment

### Build the Application
```bash
npm run build
```
This runs `vite build` for the frontend and `esbuild` for the server, creating:
- `dist/` (Client static assets)
- `dist/server.cjs` (Standalone Node.js backend bundle)

### Run the Production Server
```bash
npm start
```

---

## 📄 License
SAVIOR-KING Commission Church International. All rights reserved.
