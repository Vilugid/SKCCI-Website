# Meet the Builders — Project Submission & Documentation

## 🌟 Project Name
**SAVIOR-KING Commission Church International (SKCCI) Platform**

## 🏷️ Tagline
*Empowering local church discipleship, small-group community governance, and pastoral care through Google Gemini AI and Google Cloud.*

---

## 📌 Builder & Program Information
- **Builder / Team Lead:** Mark Vil (captainmarkvil@gmail.com)
- **Program:** GenAI Academy APAC / Meet the Builders
- **Location:** Taguig City, Metro Manila, Philippines
- **Production URL:** [SKCCI Live App](https://ais-pre-pqbn75zxzjxsjcsunbomm3-656386786425.asia-southeast1.run.app)
- **Direct Domain:** [skcci.org](https://skcci.org)

---

## 1. 🔍 The Local Problem Addressed

In many urban grassroots communities across Metro Manila (such as Bagong Tanyag, Taguig City), community churches like **SAVIOR-KING Commission Church International (SKCCI)** serve as the vital social, spiritual, and emotional anchor for hundreds of families, youth, and workers. 

However, community leaders and pastors face severe friction due to fragmented digital tooling:
1. **Intimidating Newcomer Onboarding**: First-time visitors and seekers often hesitate to ask basic questions about service times, location directions, and ministry programs due to shyness, language barriers, or lack of 24/7 responsiveness.
2. **Discipleship & Reading Habit Drop-off**: Church members start daily Bible reading plans, but without interactive engagement, bilingual explanations, and habit tracking, engagement drops off sharply after a few weeks. Personal reflections written on loose paper are easily lost.
3. **Cell Leader Administrative Overload**: Volunteer cell group leaders struggle with manual paper rosters, lack a verifiable way to document weekly meeting attendance with photo proofs, and have no visual insight into group health trends.
4. **Scattered Prayer Coordination**: When community members experience crises, illnesses, or urgent needs, prayer requests are lost across disparate chat threads, making coordinated intercession and encouragement difficult.

---

## 2. 💡 The Solution & How the Prototype Works

The **SKCCI Platform** is an end-to-end digital ministry ecosystem uniting pastoral warmth with cutting-edge Google Cloud and Generative AI technologies:

### A. "Hannah" — AI Church Concierge
- **Conversational Pastoral Usher**: An AI assistant accessible 24/7 that welcomes visitors, explains Sunday service details (9:30 AM in Bagong Tanyag), guides newcomers through the 4 Spiritual Truths, walks users through event RSVPs, and directs leaders to sermon outlines.
- **Culturally Attuned & Bilingual**: Trained with tailored prompt engineering to naturally converse in both Tagalog (respectfully using traditional Filipino honorifics *"po"* and *"opo"*) and English.
- **Safety First**: Implements guardrails directing deep pastoral crises or medical counseling to human ministers.

### B. Dual Discipleship & Reflection Engines
- **"My First 100 Days with JESUS"**: Designed for new converts, featuring daily New Testament readings, auto-saved reflection journals with live character counters, and **one-click lifetime CSV Export**.
- **"365-Day Canonical Bible Reading Guide"**: Year-round reading journey integrated with daily explainer videos streamed fluidly via mobile-responsive Google Drive embeds, accompanied by celebratory confetti animations and streak counters.

### C. Cell Group Management & Growth Analytics
- Searchable small-group directory filtered by demographic ministries (*Men of Honor, Women of Grace, K-Youth, Couples & Family*).
- Digital meeting logs with client-side image compression (`browser-image-compression`) for photographic attendance proof without exhausting bandwidth or storage.
- Interactive 6-month growth and attendance trend visualizations rendered with `Recharts`.

### D. Prayer Warrior Hub & Fasting Tracker
- Daily thematic intercession topics with live community counters (*"I Prayed for This"*).
- **AI-Powered Sample Prayer Generator**: Leverages Google Gemini to formulate biblically grounded, uplifting 2-to-3 sentence prayer guides on demand for any daily topic in either English or Tagalog.
- Spiritual fasting tracker and moderated prayer request boards with role-restricted approval queues.

### E. Leader Tools & Master Song Bank
- Weekly structured sermon outlines (Big Idea, Scripture, Roman numeral points **I, II, III**, and discussion starters).
- Centralized worship song database with 100+ indexed praise and worship songs and one-click clipboard copying for small group leaders.

---

## 3. ☁️ The Google Tech Stack in Depth

Our architecture was deliberately constructed using modern Google Cloud developer tooling and Generative AI SDKs:

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
│     Google Cloud Run Backend       │    │     Firebase Suite (Google Cloud) │
│  - Node.js + Express API Proxy     │    │  - Firebase Auth (Google Sign-In) │
│  - Bundled with esbuild (CJS)      │    │  - Cloud Firestore                │
│  - Ingests process.env.GEMINI_KEY  │    │  - Multi-tab IndexedDB Cache      │
│  - /api/chat & /api/generate-prayer│    │  - Role-Based Security Rules      │
└──────────────────┬─────────────────┘    └───────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────┐
│      Google Gemini API Engine      │
│  - @google/genai TypeScript SDK    │
│  - gemini-3.7-flash (Primary)      │
│  - gemini-3.1-flash-lite (Fast)    │
│  - Low Thinking Level Config       │
│  - Local Church Knowledge Fallback │
└────────────────────────────────────┘
```

1. **Google Cloud Run (asia-southeast1)**:
   - Hosts the production container with near-zero cold starts, auto-scaling, and secure reverse-proxy routing.
   - Provides server-side isolation so secret credentials (`GEMINI_API_KEY`) are never exposed to browser bundles.

2. **Google Cloud AI & Gemini Models (`@google/genai` TypeScript SDK)**:
   - **`gemini-3.7-flash`**: Primary conversational engine powering the **Hannah** AI Concierge, delivering natural bilingual reasoning and context-aware responses.
   - **`gemini-3.1-flash-lite`**: High-speed, cost-efficient fallback engine powering the **Prayer Guide Generator** with `thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }` for sub-second prayer synthesis.
   - **Multi-Model Resilient Cascading & Fallback**: Express endpoints execute a robust race-and-timeout fallback cascade (`gemini-3.7-flash` ➔ `gemini-3.1-flash-lite` ➔ `gemini-flash-latest`), coupled with an internal offline church knowledge base ensuring zero user-facing downtime.

3. **Firebase Suite (Google Cloud)**:
   - **Firebase Authentication**: Seamless Google Sign-In allowing members to authenticate in one click.
   - **Cloud Firestore**: Real-time NoSQL cloud database configured with persistent multi-tab IndexedDB caching for offline resilience.
   - **Firestore Security Rules**: Cryptographic Role-Based Access Control (RBAC) separating Super Admins, Cell Leaders, and regular attendees, while isolating personal journals to private `/users/{userId}/...` paths.

4. **Google Drive Integration**:
   - Streams daily 365-day video explainers directly through fluid 16:9 mobile-first Google Drive embeds with zero layout shift.

5. **Google Maps Platform**:
   - Embeds interactive sanctuary location navigation for visitors traveling to the church facility in Bagong Tanyag, Taguig City.

---

## 4. 📈 Local Impact & What We Learned

- **Accessibility for All Generations**: By pairing an AI usher fluent in Tagalog with one-click Google login and high-contrast UI, both tech-savvy youth and senior church members navigate church resources effortlessly.
- **Discipleship Accountability**: Over 100 days of readings are now preserved digitally, with cell leaders having immediate access to weekly sermon outlines and meeting verification tools.
- **Resilience Under Constraint**: Developing with Google's latest Gemini SDK taught us the importance of server-side proxying, low-thinking optimization for snappier mobile interactions, and graceful offline fallback strategies.
