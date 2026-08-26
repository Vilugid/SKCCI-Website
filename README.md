# SAVIOR-KING Commission Church International (SKCCI) Web Application

> *"Your Church, Your Family."*

A full-stack web application designed for **SAVIOR-KING Commission Church International (SKCCI)**. The platform provides a spiritual growth hub, discipleship training platform, interactive Bible reading plans, and cell leader ministry tools.

---

## 🌟 Key Features

### 📖 Bible Reading & Reflection
- **My First 100 Days with JESUS**:
  - Interactive daily New Testament milestone tracker (1 chapter per day).
  - Built-in passage reader with previous/next navigation.
  - **Scripture Reflection Notes**: Record *"What struck you most?"* with character counting and cloud synchronization.
  - **Permanent Lifetime Records**: Reflection notes and reading progress are stored permanently linked to the user's account.
  - **Lifetime CSV Export**: Export all 100 milestone reflections to CSV at any time or upon 100% completion.
- **365-Day Daily Bible Plan**:
  - Full canonical plan with OT, NT, Psalms, and Proverbs daily portions.
  - Daily Scripture Reflection Notes with cloud sync.
  - December Year-End CSV Export & notice banner with automatic annual renewal.
  - Light and Dark reading mode themes.

### 🛡️ Cell Leader Tools
- **Sunday Service Outlines**:
  - Weekly preaching outlines, scripture references, and discussion questions.
  - Admin/Leader editor for updating sermons and service themes.
- **Worship Videos & Setlists**:
  - Embedded YouTube worship video playlists per service.
  - Weekly song setlist overview and one-click lyric copying.
- **Master Song Bank (A–Z)**:
  - Comprehensive searchable archive of church praise and worship lyrics.
  - Instant one-click lyric copy formatted for mobile cell devotionals.
- **Vertical Jump Navigation**:
  - Clean column-based quick navigation across mobile and desktop.

### 📚 Discipleship & Ministries
- **Discipleship Manuals & Envisioning Lessons**:
  - Complete curriculum for consolidation, post-encounter, and cell leader training.
  - Clean pagination, chapter browsing, and reading layout.
- **Prayer Hub**:
  - Intercessory prayer request wall with community "I Prayed" encouragement counts.
- **Cell Groups Directory**:
  - Location-based network of cell groups, meeting schedules, and contact details.
- **Church Events & Announcements**:
  - Live calendar of church services, youth gatherings, prayer vigils, and retreats.
- **Giving & Tithes**:
  - Digital donation details, banking channels, GCash QR codes, and giving guidance.
- **Welcome Kit & Gospel Presentation**:
  - Interactive Gospel visual presentation and new believer next steps.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**:
  - [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
  - [Vite 6](https://vitejs.dev/) (Fast bundling and HMR)
  - [Tailwind CSS 4](https://tailwindcss.com/) (Responsive utility styling)
  - [Motion (Framer Motion)](https://motion.dev/) (Smooth page transitions & celebration dialogs)
  - [Lucide React](https://lucide.dev/) (Clean iconography)
  - [React Hot Toast](https://react-hot-toast.com/) (Notifications)
- **Backend & Server**:
  - [Node.js](https://nodejs.org/) & [Express 4](https://expressjs.com/)
  - [tsx](https://github.com/privatenumber/tsx) for development
  - [esbuild](https://esbuild.github.io/) for high-speed single-bundle server compilation (`dist/server.cjs`)
  - Canonical host routing and SPA static serving
- **Database & Authentication**:
  - [Firebase Firestore](https://firebase.google.com/docs/firestore) for persistent cloud records (Bible progress, reflection notes, cell leaders, prayer wall)
  - [Firebase Authentication](https://firebase.google.com/docs/auth) with Google Sign-In popup integration

---

## 📁 Project Structure

```
├── .env.example                # Environment variable documentation
├── firebase-applet-config.json # Firebase client configuration
├── firebase-blueprint.json     # Firestore entity and schema blueprints
├── firestore.rules             # Firestore security rules
├── metadata.json               # Application metadata and capabilities
├── package.json                # Project dependencies and npm scripts
├── server.ts                   # Express custom backend entry point
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler configuration
│
├── public/                     # Static assets (favicons, images, logos)
│
└── src/
    ├── main.tsx                # Client application root entry point
    ├── App.tsx                 # Main layout, router, navigation, and views
    ├── index.css               # Global Tailwind CSS imports
    ├── types.ts                # TypeScript interfaces and data models
    ├── firebase.ts             # Firebase client SDK initialization
    ├── bibleData.ts            # Canonical 365-day Bible reading schedule
    ├── data.ts                 # 100-day Bible reading schedule and defaults
    ├── lessonsData.ts          # Discipleship training and consolidation lessons
    ├── envisioningLessons.ts   # Advanced vision and leadership lessons
    │
    ├── components/             # Reusable UI feature components
    │   ├── Header.tsx          # Navigation bar with responsive drawer and Auth
    │   ├── Hero.tsx            # Welcome banner with call-to-action cards
    │   ├── BiblePlan.tsx       # 100 Days Bible tracker with reflection notes
    │   ├── BiblePlan365.tsx    # 365 Days Bible reading guide & annual tracker
    │   ├── LeaderTools.tsx     # Cell leader outlines, worship songs, & Song Bank
    │   ├── ManualsReader.tsx   # Interactive reader for discipleship books
    │   ├── PrayerHub.tsx       # Interactive prayer request board
    │   ├── CellGroup.tsx       # Church cell group finder and listing
    │   ├── Events.tsx          # Church calendar and upcoming events
    │   ├── Giving.tsx          # Tithes, offerings, and online payment details
    │   ├── Gospel.tsx          # The Four Spiritual Truths interactive guide
    │   ├── WelcomeKit.tsx      # Guide for first-time church visitors
    │   ├── LockModal.tsx       # Password verification modal for sensitive tools
    │   └── Footer.tsx          # Church information and contact footer
    │
    ├── contexts/               # React Context Providers
    │   └── AuthContext.tsx     # Firebase Authentication state and methods
    │
    ├── hooks/                  # Custom React hooks
    │   └── useSyncedState.ts   # Unified cloud + localStorage state hook
    │
    └── utils/                  # Utility functions and date helpers
```

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- **Node.js**: v18.0.0 or later
- **npm** or **bun** / **yarn**

### 2. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 3. Environment Configuration
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Ensure your Firebase configuration in `firebase-applet-config.json` contains your Firebase project keys (API Key, Project ID, Auth Domain, Storage Bucket).

### 4. Running the Dev Server
Start the full-stack dev server:
```bash
npm run dev
```
The server will boot on `http://localhost:3000`.

---

## 📦 Building & Production Deployment

### 1. Production Build
Compile both the frontend Vite bundle and backend Express server into the `dist/` directory:
```bash
npm run build
```
This produces:
- `dist/index.html` + static assets (Frontend SPA)
- `dist/server.cjs` (Compiled CommonJS backend bundle)

### 2. Running in Production
Launch the compiled production application:
```bash
npm start
```

### 3. Cloud Run / Containerized Deployment
The app is configured for container deployment (e.g., Google Cloud Run, Docker):
- The server binds to host `0.0.0.0` and port `3000`.
- All routes fallback to the Vite SPA single-page application entry point.

---

## 🔒 Security & Firestore Rules

Database security rules are defined in `firestore.rules` and enforce role-based access control (RBAC):
- **Scripture Reflections & Bible Progress**: Restricted strictly to the authenticated owner (`request.auth.uid == userId`).
- **Prayer Wall & Cell Groups**: Publicly readable with authenticated write validation.
- **Sunday Service Outlines & Announcements**: Publicly readable with leader authorization for editing.

To deploy or verify rules:
```bash
# Handled automatically via deployment tools or Firebase CLI:
firebase deploy --only firestore:rules
```

---

## 📄 License
Created for SAVIOR-KING Commission Church International. All rights reserved.
