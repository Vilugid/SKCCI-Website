# SAVIOR-KING Commission Church International (SKCCI) Platform

> **"Your Church, Your Family."**  
> *A full-stack, cloud-connected digital ministry platform engineered for spiritual discipleship, cell group governance, AI-assisted pastoral engagement, and community building.*

---

## 🏆 Hackathon Project Overview

### 💡 The Problem
Growing local and global church communities face critical operational and discipleship hurdles:
- **Fragmented Visitor Engagement**: First-time visitors and seekers often feel lost navigating service times, church locations, ministries, and foundational doctrines without immediate, personalized guidance.
- **Disjointed Discipleship & Bible Reading**: Members struggle with consistency in daily devotional habits, and reflections are often lost across paper notebooks without lifetime preservation or streak tracking.
- **Administrative Burden for Small Groups**: Cell leaders lack a unified, cloud-backed platform to log weekly meetings, verify attendance with meeting photo proofs, and track long-term spiritual growth trends.
- **Intercession & Prayer Coordination**: Community prayer needs and fasting commitments are difficult to coordinate and visualize in real time across the congregation.

### 🌟 The Solution
The **SKCCI Platform** is an end-to-end, full-stack digital ministry ecosystem designed for **SAVIOR-KING Commission Church International**. It pairs the conversational power of **Google Gemini AI** with durable **Firebase Firestore** cloud persistence, **Role-Based Access Control (RBAC)**, responsive media streaming, and interactive data visualization to empower pastors, leaders, and congregation members alike.

---

## 🚀 Key Features

### 1. 🤖 AI Church Concierge — "Hannah"
- **Google Gen AI Integration**: Built with the `@google/genai` TypeScript SDK and executed through a secure server-side Express API proxy (`/api/chat`) to safeguard API credentials.
- **Multi-Model Resilient Cascading**: Employs an automated cascading fallback chain (`gemini-3.7-flash` ➔ `gemini-3.1-flash-lite` ➔ `gemini-flash-latest`) wrapped in safety timeouts with immediate fallback to an internal offline church knowledge base.
- **Bilingual & Culturally Grounded**: Fluent in both Filipino/Tagalog (honoring respectful honorifics *"po"* and *"opo"*) and English.
- **Comprehensive Domain Intelligence**:
  - Step-by-step visitor onboarding (*"Plan My Visit"*, Sunday 9:30 AM service, children's church, parking).
  - Walkthroughs for Event calendars and one-click Google Sign-In RSVPs.
  - Guided navigation to structured Sermon Outlines (*Leader Tools*), Discipleship Manuals, Cell Groups, Giving information, and Live Online Streaming links.

### 2. 📖 Dual Bible Reading Plans & Reflection Engine
- **"My First 100 Days with JESUS"**:
  - Milestone-based New Testament reading path designed for new believers.
  - Interactive devotional reflection journal (*"What struck you most?"*) with live character counting, auto-save to user-scoped Firestore documents, and one-click lifetime **CSV Export**.
- **"365-Day Canonical Bible Reading Guide"**:
  - Comprehensive year-round plan covering Old Testament, New Testament, Psalms, and Proverbs daily.
  - Integrated **Daily Explainer Video Card**: Fluid 16:9 mobile-first Google Drive video player (`/preview` embed) with native playback controls, zero layout shift, and instant fullscreen viewing.
  - Interactive December reflection recap and automatic annual cycle rollover.
- **Reading Streak & Consistency Tracker**:
  - Live streak tracking that logs consecutive days of completed readings.
  - Celebratory visual feedback and milestone badges powered by `canvas-confetti` and `motion`.

### 3. 👥 Discipleship & Cell Group Management
- **Searchable Cell Group Directory**: Filterable by meeting day, location, and target ministry (*Men of Honor, Women of Grace, K-Youth, Couples & Family*).
- **Meeting Logs & Photo Verification**: Leaders can submit weekly meeting reports with attendee rosters and compressed JPEG photo proofs (optimized client-side via `browser-image-compression` to minimize bandwidth and storage footprints).
- **Growth Trend Analytics**: Interactive 6-month visual trends for attendance and active group health rendered with `Recharts`.

### 4. 🙏 Prayer Warrior Hub & Fasting Tracker
- **Thematic Daily Prayer Focus**: Dedicated intercession agendas for each day of the week (Pastoral Leadership, Church Unity, Families & Youth, Supernatural Healing, Financial Provision, Evangelism Outreach).
- **AI-Powered Sample Prayer Generator (`/api/generate-prayer`)**: Generates structured, scripture-aligned prayer guides on demand for any daily prayer focus item.
- **Live Intercessor Counters**: Real-time participant counters reflecting community prayer activity per topic.
- **Fasting Commitments**: Personal tracker for spiritual fasting types (*Skip Breakfast, Skip Lunch, Skip Dinner, 24-Hour Fast, Daniel's Fast*).
- **Moderated Prayer Request Board**: Congregation members can submit prayer requests, with dedicated triage and review workflows for authorized Prayer Admins.

### 5. 📜 Discipleship Curriculum & Consolidation Manuals
- **Sequential Learning Modules**:
  - *Consolidation Manuals*: Practical lessons for nurturing new converts in faith, prayer, fellowship, and scripture.
  - *Evangelism Modules*: Step-by-step soul-winning and gospel presentation training.
  - *Envisioning Modules*: Advanced leadership and cell multiplication training.
- **Cloud-Synced Progress**: Persistent lesson completion checkboxes synced directly to the user's profile.

### 6. 🛠️ Leader Tools & Master Song Bank
- **Structured Sunday Sermon Outlines**: Preaching guides complete with Main Theme / Big Idea, Scripture texts, Roman numeral teaching breakdowns (**I, II, III**), and cell discussion questions.
- **Embedded Worship Playlists**: YouTube worship sets curated for weekly services.
- **A–Z Song Lyrics Bank**: Searchable praise and worship lyrics database with one-click clipboard copying formatted for mobile cell meetings.

### 7. 🔐 Enterprise Role-Based Access Control (RBAC)
Granular, cryptographically validated permission layers enforced directly in `firestore.rules`:
- **Super Admin**: Complete platform management, video explainer assignment, and global database control.
- **Cell Leader Admin**: Full access to cell group registries, meeting validations, and leader tools.
- **Event Admin**: Permissions to publish church events, manage schedules, and record Sunday attendance.
- **Prayer Admin**: Triage, approval, and management of congregation prayer requests.
- **Authenticated User**: Isolated access to private reading journals, notes, RSVPs, and streaks (`/users/{userId}/...`).

---

## 🏗️ Technical Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client Layer (React 19)                         │
│  - React 19 + TypeScript + Vite 6 + Tailwind CSS 4                     │
│  - Motion Animations + Recharts Visualizations + Lucide Icons         │
│  - Browser Image Compression for Photo Proofs                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌────────────────────────────────────┐    ┌───────────────────────────────────┐
│     Express API Backend Server     │    │        Firebase Cloud Suite       │
│  - Node.js + TypeScript (tsx)      │    │  - Firebase Authentication (Auth) │
│  - Bundled with esbuild (CJS)      │    │  - Cloud Firestore (RBAC Rules)   │
│  - Server-Side Gemini AI Proxy     │    │  - User Data Isolation            │
│  - /api/chat & /api/generate-prayer│    └───────────────────────────────────┘
└──────────────────┬─────────────────┘
                   │
                   ▼
┌────────────────────────────────────┐
│      Google Gemini API Engine      │
│  - @google/genai TypeScript SDK    │
│  - gemini-3.7-flash (Primary)      │
│  - gemini-3.1-flash-lite (Fast)    │
│  - Local Church Knowledge Fallback │
└────────────────────────────────────┘
```

---

## 🧰 Tech Stack & Dependencies

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 (`react`, `react-dom`) | Modern component architecture and high-performance UI |
| **Language** | TypeScript | Strict type safety across client and server |
| **Build Tooling** | Vite 6 & esbuild | Ultra-fast HMR in dev and optimized CommonJS bundle for production |
| **Styling** | Tailwind CSS 4 (`@tailwindcss/vite`) | Responsive, mobile-first design with custom church theme tokens |
| **AI / LLM** | `@google/genai` (Google Gen AI SDK) | Multi-model text generation for AI Concierge and Prayer Generator |
| **Database & Auth** | Firebase Firestore & Firebase Auth | Real-time cloud storage, authentication, and security rules |
| **Data Visualization** | `recharts` | Visual analytics for cell group attendance and growth trends |
| **Animations** | `motion` & `canvas-confetti` | Fluid transitions and celebratory milestone effects |
| **Icons** | `lucide-react` | Unified, lightweight SVG iconography |
| **Image Optimization**| `browser-image-compression` | Client-side compression for cell group meeting photo proofs |
| **State & Fetching** | `@tanstack/react-query` & Custom Hooks | Server state management and synchronized local/cloud state |
| **Notifications** | `react-hot-toast` | Non-blocking user feedback alerts |

---

## 🔒 Security & Privacy Directives

1. **Zero Hardcoded Secrets**: All sensitive tokens and API keys are strictly ingested via server environment variables (`process.env.GEMINI_API_KEY`).
2. **Server-Side API Route Protection**: Gemini API requests are exclusively proxied through backend endpoints (`/api/*`), ensuring zero credential exposure in browser client bundles.
3. **Strict Firestore Data Isolation**: User journals, reflections, reading streaks, and personal requests are restricted to `/users/{userId}/...` paths governed by strict security rules.
4. **Input Sanitization & Graceful Fallbacks**: Every dynamic payload is sanitized before rendering, and the conversational assistant includes built-in offline church knowledge bases to guarantee zero downtime during network limits.

---

## 💻 Setup & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (v9+ recommended)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd savior-king-commission-church
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
```

Open `.env` and specify your Google Gemini API key:
```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

### 4. Run the Development Server
```bash
npm run dev
```
The application will boot at **`http://localhost:3000`** with Express serving the API and Vite handling the client with live asset processing.

---

## 🚢 Production Build & Deployment

### Build the Application
```bash
npm run build
```
This single build command:
1. Runs `vite build` to compile optimized client static assets into `dist/`.
2. Uses `esbuild` to bundle `server.ts` into a self-contained, standalone `dist/server.cjs` file.

### Start the Production Server
```bash
npm start
```
Starts the production server on port 3000 (`node dist/server.cjs`).

---

## 🧭 Hackathon Judges' Walkthrough Guide

To experience the core features of the SKCCI Platform:

1. **Meet "Hannah" (AI Church Concierge)**:
   - Click on the Hannah chat button in the bottom-right corner.
   - Ask in Tagalog or English: *"Paano mag-RSVP sa upcoming event?"*, *"What time is Sunday service?"*, or *"Can you give me the sermon outline?"*.
   - Notice the structured responses, conversational tone, and quick-action navigation suggestions.

2. **Explore the 365-Day Bible Reading Plan & Daily Video**:
   - Go to **Grow ➔ 365-Day Bible Plan**.
   - Check out today's reading portions (Old Testament, New Testament, Psalms, and Proverbs).
   - View the responsive **Daily Explainer Video** card featuring fluid 16:9 Google Drive playback and direct fullscreen support.
   - Mark portions as completed and observe the reading streak counter and progress calculations.

3. **Check the 100-Day Devotional & CSV Export**:
   - Go to **100-Day Devotional** from the main navigation.
   - Type a personal reflection note in one of the daily reading cards; observe the live character count and auto-saving indicator.
   - Click **"Export CSV"** to download a permanent backup of all your personal reflections.

4. **Experience the Prayer Warrior Hub & AI Generator**:
   - Navigate to **Prayer Hub**.
   - View the day's intercession focus and click **"I Prayed for This"** to increment the live community prayer counter.
   - Click **"Generate Sample Prayer"** to test the server-side Gemini API generating a custom, structured prayer guide for that specific topic.

5. **Review Cell Group Logs & Growth Charts**:
   - Go to **Grow ➔ Cell Group**.
   - Browse the small groups directory, test the category filters, and inspect the 6-month growth trend analytics rendered via Recharts.

6. **Inspect Leader Tools & Discipleship Manuals**:
   - Navigate to **Grow ➔ Leader Tools** to inspect sermon outlines, scripture references, Roman numeral breakdowns, and worship sets.
   - Navigate to **Grow ➔ Manuals** to view the interactive consolidation curriculum.

---

## 📄 License & Attribution
© 2026 **SAVIOR-KING Commission Church International (SKCCI)**. All rights reserved.  
Built with ❤️ for Kingdom impact, discipleship, and community connection.
