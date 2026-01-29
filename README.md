# ProfessorAI - Intelligent Tutor Platform

![Status](https://img.shields.io/badge/Status-Investor_Demo-blue) ![Version](https://img.shields.io/badge/Version-2.0_WhiteLabel-1E293B)

**ProfessorAI** is an enterprise-grade adaptive learning platform that leverages RAG (Retrieval-Augmented Generation) to deliver personalized academic tutoring. This white-label version is designed for scalability, allowing institutions to deploy their own "AI Professor" on top of existing curriculum databases.

---

## 🚀 Key Features

* **Adaptive Intelligence:** The AI adjusts its teaching style based on the student's expertise level (Novice to Expert).
* **Context-Aware RAG:** Retrieval engine pulls from verified course materials (PDFs, Transcripts, Lectures) to ensure hallucination-free answers.
* **Multi-Modal Learning:**
    * **Study Mode:** Deep-dive conversations with citations.
    * **Quiz Mode:** Auto-generated assessments to test knowledge retention.
    * **Notes Creator:** Instant summarization and study guide generation.
* **Cohort Isolation:** Secure data separation between different student batches.

---

## 🛠 Tech Stack

* **Frontend:** React (Vite), TypeScript
* **Styling:** Tailwind CSS, shadcn/ui, Lucide React
* **State Management:** TanStack Query
* **Backend / Database:** Supabase (Auth, Vector Store), Render (Python API)
* **AI Engine:** Google Gemini (Embeddings & Inference) via LangChain

---

## 🎨 Theme & Branding (White-Label)

This repository implements the **"Ivy League SaaS"** design system:
* **Primary Color:** Deep Indigo (`#1E293B`)
* **Background:** Soft Sky (`#eff6ff`)
* **Accent:** Electric Blue (`#3B82F6`)
* **Typography:** Inter / Sans-serif (Clean, Modern)

All specific institutional branding ("Tetr", "AskTETR") has been stripped via the **UI Masking Layer** (see below).

---

## ⚙️ Configuration & UI Masking

To maintain backend compatibility while presenting a generic interface, this frontend uses a **Mapping Layer**. The UI displays generic names, but the API sends specific IDs.

| UI Display Name | Backend ID (Immutable) | Description |
| :--- | :--- | :--- |
| **Cohort Alpha** | `2029` | Foundational / First-year track |
| **Cohort Beta** | `2028` | Advanced / Second-year track |
| **Phase 1** | `term1` | Core Concepts |
| **Phase 2** | `term2` | Applied Skills |
| **Global Hub** | *(Various)* | Locations like "India" or "Dubai" are generalized |

> **Note to Developers:** When editing `src/data/courses.ts` or `BatchSelection.tsx`, strictly change only the `name` (display) fields. **DO NOT** change `id` fields, or the connection to the Supabase Vector Store will break.

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js (v18+)
* npm or bun

### 2. Installation
```bash
git clone [https://github.com/your-username/professor-ai-frontend.git](https://github.com/your-username/professor-ai-frontend.git)
cd professor-ai-frontend
npm install