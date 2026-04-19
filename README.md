# 🏋️ SK-Body-First-Gym - Premium Gym Website

**A modern, high-energy fitness website with dark + neon theme**

![SK Body First Gym](https://img.shields.io/badge/Status-Live-success)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

SK Body First Gym is a premium, modern gym website featuring a stunning dark theme with red and blue neon accents. The UI has been ported to **React 18 + Vite** while preserving the original HTML/CSS/JS design and interactions.

## ✨ Features

### 🎨 Design
- **Dark + Neon Theme**: Black background with red/blue neon accents
- **Glassmorphism Effects**: Modern frosted glass cards
- **Smooth Animations**: Fade-in, slide-in, and parallax effects
- **Glowing Buttons**: Hover effects with neon glow
- **Bold Typography**: Premium font combinations
- **Fully Responsive**: Mobile, tablet, and desktop optimized

### 📄 Pages/Sections

1. **Home (Hero Section)**
   - Full-screen background with gym imagery
   - Animated headline and CTA buttons
   - Live counter stats (members, trainers, years, success rate)
   - Motivational quote overlay

2. **About Us**
   - Gym story, mission, and values
   - Coach/trainer cards with photos and specializations
   - Motivational quote banners

3. **Services/Programs**
   - 8 service cards with icons:
     - Weight Training
     - Cardio Training
     - CrossFit
     - Fat Loss Program
     - Muscle Gain
     - Yoga
     - Zumba
     - Personal Training
   - "Book Session" buttons for each service
   - Service options: Online classes, Outdoor, On-site

4. **Gallery**
   - Masonry grid layout
   - Filter buttons (All, Workout Area, Machines, Trainers, Members, Events)
   - Lightbox preview with navigation
   - Motivational quote strip

5. **Membership Plans**
   - 3 pricing tiers: Basic, Pro (Most Popular), Elite
   - Feature comparison lists
   - Payment options (Google Pay, UPI, Cards, Cash)

6. **Testimonials**
   - Member review slider
   - Auto-play with manual controls
   - 5-star ratings and member photos

7. **Contact Us**
   - Contact form (Name, Phone, Email, Message)
   - Gym information (Address, Phone, WhatsApp, Email)
   - Opening hours
   - Google Maps embed
   - Facility amenities list

8. **Footer**
   - Social media links
   - Quick navigation links
   - Opening hours
   - Gym slogan: "Discipline Beats Motivation"

### 🚀 Interactive Features

- **Sticky Navbar**: Fixed navigation with scroll effect
- **Mobile Menu**: Responsive hamburger menu
- **Smooth Scrolling**: Seamless navigation
- **Animated Counters**: Stats count up on scroll
- **Gallery Filters**: Dynamic image filtering
- **Lightbox**: Full-screen image viewer with keyboard navigation
- **Testimonial Slider**: Auto-rotating reviews with manual controls
- **Floating Buttons**: 
  - "Join Now" button (bottom right)
  - WhatsApp chat button (bottom right)
- **Scroll to Top**: Quick return to top button
- **Parallax Effects**: Hero section background movement
- **Form Validation**: Contact form with basic validation

### 📊 Admin Panel & Lead Management
- **Firebase Authentication**: Secure admin login (email/password)
- **Real-time Lead Dashboard**: View all gym membership inquiries in real-time
- **Lead Filtering**: 
  - Filter by Goal (Weight Loss, Muscle Building, Strength Training)
  - Filter by Status (Not Talked, Talked, Joined)
  - Live count display for each filter category
- **Status Management**: Update lead status using horizontal radio buttons
- **Lead Actions**: Delete inquiries with confirmation
- **Mobile Responsive**: Fully optimized for tablets and mobile devices
- **Analytics Dashboard**: 
  - Goals distribution (Pie chart)
  - Status distribution (Bar chart)
  - Plans distribution (Radar chart)
  - KPI metrics (Total Leads, Active, Conversion Rate, Pending)

### 📋 Join Form Features
- **Modal Form**: Pop-up form accessible from "Join Now" buttons
- **Form Validation**:
  - Name: Letters and spaces only
  - Phone: Indian format (10 digits starting with 6-9)
  - Real-time duplicate phone detection
  - Gender selection (Male, Female, Other) with radio buttons
  - All required fields must be filled before submission
- **Auto-scroll**: Form fields automatically scroll into view when focused
- **Membership Plans**: Dropdown with free trial + BASIC, PRO, ELITE options
- **Fitness Goals**: Selection of Weight Loss, Muscle Building, Strength Training
- **Firestore Integration**: All submissions saved to secure Firebase database

## 🛠️ Technologies Used

- **React 18** with functional components & hooks
- **Vite 7** for dev/build tooling
- **Vanilla CSS** (original design preserved)
- **Font Awesome 6.4.0** for icons
- **Google Fonts** (Bebas Neue, Montserrat, Oswald)
- **Firebase 12.11.0**: 
  - Firestore for real-time database
  - Authentication for admin login
  - Hosting for deployment

## 📁 File Structure

```
SK-Body-First-Gym/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── components/
│       ├── common/     # Navbar, Footer, FloatingButtons, ScrollTop
│       └── sections/   # Hero, About, Services, Gallery, Plans, Testimonials, Contact
├── index.html          # React/Vite entry html used for dev/build
├── legacy/
│   └── index.html      # Frozen static HTML reference (loads ../styles.css and ../script.js)
├── public/
│   ├── dumbbell.svg    # Favicon/logo
│   └── gallery/        # Drop gallery images (served at /gallery/...)
├── styles.css          # Legacy static CSS (reference only)
├── script.js           # Legacy static JS (reference only)
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Getting Started

### Installation & Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Firebase**
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Run the dev server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview the build**
   ```bash
   npm run preview
   ```

### Admin Panel Access

- **Access Admin Panel**: Click the "Admin" link in the footer or navigate to `#/admin`
- **Login**: Use your Firebase admin email and password
- **Features**:
  - View all gym membership inquiries in real-time
  - Filter leads by fitness goal and status
  - Update lead status (Not Talked, Talked, Joined)
  - Delete leads
  - View analytics dashboard with charts and metrics
- **Security**: Admin must re-login every time for security

### Firestore Database Structure

The app uses a Firestore collection called `gym_leads` with the following fields:
```javascript
{
  name: string,           // Member name (letters and spaces only)
  phone: string,          // 10-digit Indian phone number
  gender: string,         // Male, Female, or Other
  goal: string,           // Weight Loss, Muscle Building, or Strength Training
  plan: string,           // One Day Free Visit, BASIC, PRO, or ELITE
  status: string,         // Not Talked, Talked, or Joined
  timestamp: Date,        // When inquiry was submitted
  statusUpdatedAt: Date   // When status was last updated
}
```

### Customizing Content (React)
- **Brand name & nav links**: update `src/components/Navbar.jsx`
- **Hero counters & highlights**: tweak data in `src/components/Hero.jsx`
- **Coaches**: edit the `coaches` array in `src/components/About.jsx`
- **Services**: edit the `services` array in `src/components/Services.jsx`
- **Gallery images**: drop files into `public/gallery` and point the `images` array in `src/components/Gallery.jsx` to `/gallery/<file>`
- **Plans/pricing**: edit `src/components/Plans.jsx`
- **Testimonials**: edit `src/components/Testimonials.jsx`
- **Contact info & map**: edit `src/components/Contact.jsx`
- **WhatsApp number**: update `src/components/FloatingButtons.jsx`
- **Form validation rules**: edit validation functions in `src/components/TestForm.jsx`
  - Modify phone format validation regex
  - Customize required fields
  - Add/remove fitness goals
  - Change membership plans
- **Colors & spacing**: adjust CSS variables in `src/index.css` under the `:root` block

### Form Validation Reference

The join form includes these validation rules:

| Field | Rule | Error Message |
|-------|------|---------------|
| Name | Letters and spaces only | "Please enter a valid name" |
| Phone | 10 digits, starts with 6-9 | "Please enter a valid Indian phone number" |
| Phone | Not already in database | "Phone number already exists" |
| Gender | Must select one (M/F/Other) | "Please select your gender" |
| Goal | Must select one option | "Please select your fitness goal" |
| Plan | Must select one option | "Please select a membership plan" |

## 👨‍💼 Admin Panel Features

### Dashboard Overview
- **Real-time Lead Syncing**: All submissions appear instantly on the admin dashboard
- **Leads Table**: Complete view of all gym membership inquiries with:
  - Member name, phone (clickable tel link)
  - Gender, fitness goal, selected plan
  - Submission date & time
  - Current status
  - Actions (delete)

### Filtering & Organization
- **Goal Filter**: Filter leads by fitness goal (Weight Loss, Muscle Building, Strength Training)
  - Live count display showing number of leads per goal
  - "All Leads" option to remove filter
- **Status Filter**: Filter leads by current status (Not Talked, Talked, Joined)
  - Live count display showing number of leads per status
  - "All Status" option to remove filter
- **Combined Filtering**: Use both filters simultaneously for advanced queries

### Status Management
- **Horizontal Radio Buttons**: Update lead status directly from the table
  - Not Talked (Gray)
  - Talked (Purple)
  - Joined (Blue)
- **Real-time Updates**: Status changes sync immediately to Firestore

### Analytics Dashboard
- **Goals Distribution**: Pie chart showing breakdown of fitness goals
- **Status Distribution**: Bar chart showing conversion pipeline
- **Plans Distribution**: Radar chart showing membership plan preferences
- **KPI Metrics**: 
  - Total Leads count
  - Active Leads
  - Conversion Rate (%)
  - Pending conversions

### Mobile Responsiveness
- Full responsive design for tablets (768px breakpoint)
- Mobile optimization for phones (480px breakpoint)
- Touch-friendly buttons and controls

### Deploy
- **Netlify / Vercel**: run `npm run build` and deploy the `dist/` folder
- **Static hosting**: upload `dist/` contents to your host after `npm run build`
- **GitHub Pages**: build, then deploy `dist/` to `gh-pages` (or use an action)

## Firebase Hosting

This project is ready for Firebase Hosting with a Vite SPA build output.

### Setup
1. Install the Firebase CLI if you do not already have it:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase:
   ```bash
   firebase login
   ```
3. Replace the placeholder project ID in [/.firebaserc](.firebaserc) with your Firebase project ID.
4. Deploy the app:
   ```bash
   npm run deploy:firebase
   ```

### Files Added
- [firebase.json](firebase.json) configures Hosting to serve `dist/` and rewrites all routes to `index.html` for SPA support.
- [/.firebaserc](.firebaserc) stores the default Firebase project ID.
- [package.json](package.json) includes a `deploy:firebase` script for one-command deploys.

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Alt text for images (update as needed)
- High contrast color scheme

## 🎨 Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Neon Red | `#ff0844` | Primary accent, buttons |
| Neon Blue | `#00d4ff` | Secondary accent |
| Dark BG | `#0a0a0a` | Main background |
| Dark Card | `#1a1a1a` | Card backgrounds |
| Text Primary | `#ffffff` | Main text |
| Text Secondary | `#b0b0b0` | Secondary text |

## 🔧 Customization Tips

- **Hero background & counters**: update the image URL and stats in `src/components/Hero.jsx`
- **Pricing**: edit plan amounts and features in `src/components/Plans.jsx`
- **Services**: add/remove items in the `services` array inside `src/components/Services.jsx`
- **Gallery**: add files to `public/gallery` and point `src/components/Gallery.jsx` at them
- **Animation timing**: tweak counter/testimonial intervals in `src/components/Hero.jsx` and `src/components/Testimonials.jsx`

## 📊 Performance

- Optimized CSS and JavaScript
- Lazy loading images (add `loading="lazy"` to img tags)
- Minimal external dependencies
- Fast load times

## 🐛 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 To-Do List

- [ ] Create Firebase project and set up Firestore database
- [ ] Create Firebase admin account (email/password)
- [ ] Add Firebase configuration to `.env.local`
- [ ] Create `gym_leads` Firestore collection
- [ ] Customize form validation rules for your requirements
- [ ] Add your gym photos to public/gallery
- [ ] Update all placeholder text with your gym's information
- [ ] Replace phone numbers and email addresses
- [ ] Update Google Maps embed with your location
- [ ] Test contact form and implement backend (if needed)
- [ ] Add your social media links
- [ ] Optimize images for web
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Deploy to Firebase Hosting
- [ ] Test admin panel with real leads

## 🤝 Support

For questions or issues:
- Check the code comments in each file
- Refer to the inline documentation
- Review public/gallery/README.md for image guidelines

## 📄 License

This project is open source and available for personal and commercial use.

## 🌟 Credits

- **Design**: Modern fitness industry standards
- **Icons**: Font Awesome
- **Fonts**: Google Fonts
- **Images**: Unsplash (replace with your own)

---

## 💪 Motivational Quotes Featured

- "Train Hard. Stay Strong."
- "The only bad workout is the one that didn't happen."
- "Success isn't always about greatness. It's about consistency."
- "Your body can stand almost anything. It's your mind you have to convince."
- "No Pain. No Gain."
- "Start Today. Not Tomorrow."
- "Discipline Beats Motivation."

---

**Built with 💪 for SK Body First Gym**

*Transform Your Body. Transform Your Life.*