# 🏥 CARE-XYZ — Healthcare & Doctor Appointment System

**CARE-XYZ** is a modern, full-stack healthcare web application designed to eliminate long hospital queues and streamline doctor-patient appointment management. Built with **Next.js (App Router)**, **TypeScript**, **Firebase Authentication**, **MongoDB**, and **Stripe Payment Gateway**.

---

## 💡 Real-World Problems Solved

- **Eliminating Long Waiting Times:** Replaces offline queues with real-time online appointment scheduling and slot selection.
- **Seamless Role Management:** Resolves information disconnects by providing tailored dashboards for **Patients**, **Doctors**, and **Admins**.
- **Automated Payment & Booking:** Simplifies consultation fee processing through instant Stripe integration, automatically confirming schedules upon payment.

---

## ✨ Key Features & Technical Highlights

### 🔐 1. Role-Based Authentication & Registration
- **Multi-Role Support:** Patients, Doctors, and Admins with custom access permissions.
- **Dynamic Form Metadata:** Selecting "Doctor" dynamically triggers inputs for professional attributes (`Expertise`, `Workplace`, `BMDC/Doctor ID`, `Experience`).
- **Firebase Auth & Mongoose Sync:** Identity managed via Firebase Auth, seamlessly linked to MongoDB documents.

### 🩺 2. Profile & Rostering System
- Dynamic profile dashboards showing booking history for patients and daily duty rosters for doctors.
- Robust schema handling with fallback caching logic for custom model properties.

### 💳 3. End-to-End Booking Pipeline
- Integrated with Stripe Payment Intents to capture booking metadata.
- Automated API flow (`/api/bookings/finalize`) converting payment receipts into persistent schedule records in MongoDB.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Auth
- **Database & ORM:** MongoDB & Mongoose
- **Payment Gateway:** Stripe API

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/care-xyz.git](https://github.com/your-username/care-xyz.git)
cd care-xyz
```
### 2. Install dependencies
npm install

### Setup Environment Variables (.env.local)
Create a .env.local file in the root directory and add the following keys:

Code snippet
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Keys
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key


###4. Run the development server
If you encounter any Mongoose model cache locks during development, clean the build cache first:

Bash
# Clear Next.js build cache (macOS/Linux)
rm -rf .next

# Run development server
npm run dev
Open http://localhost:3000 in your browser to view the application.


































