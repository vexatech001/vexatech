# VEXA TECH | Innovate • Create • Grow

VEXA TECH is a high-performance, growth-focused digital partner that combines intentional strategy, immersive design, and meticulous engineering to help businesses launch stronger and scale confidently.

## 🚀 Key Features

- **Cinematic Experience**: Immersive landing pages with shader-based heroes and Framer Motion animations.
- **Premium Design System**: Tailored glassmorphism-inspired UI with high-end typography and interactive elements.
- **Advanced Admin Dashboard**: Secure, real-time lead management system with analytics and tracking.
- **Instant Notifications**: Automated WhatsApp and Email lead alerts via Twilio and Nodemailer.
- **Animated Timeline**: Interactive "How We Work" journey featuring curved SVG path animations and scroll-linked progress.
- **Standalone Legal Routes**: Dedicated, SEO-optimized routes for Privacy, Terms, and Support.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore) & [Twilio](https://www.twilio.com/)
- **Smooth Interaction**: [Lenis](https://lenis.darkroom.engineering/) for professional scrolling depth.

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) installed.

### 2. Environment Setup
Create a `.env.local` file in the root directory and add the following:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_FROM=whatsapp:+your_number
TWILIO_WHATSAPP_TO_1=whatsapp:+target_number

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
# ... other firebase vars

# Email Configuration
GMAIL_USER=your_email
GMAIL_APP_PASSWORD=your_app_password
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the live project.

## 🚢 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/new). ensure all environment variables are correctly configured in the Vercel dashboard.

---

Designed and Engineered by **VEXA TECH Team**.
