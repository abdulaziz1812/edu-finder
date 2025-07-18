# 🎓 EduFinder - College Booking Web App

[Live Site 🚀](https://edufinder.vercel.app) | [GitHub Repo](https://github.com/abdulaziz1812/edu-finder)

EduFinder is a modern and responsive college booking web application where users can browse college details, submit admission forms, leave reviews, and manage profiles — all built with the **MERN stack** and powered by **Next.js**.

## ✨ Features

- 🔍 **Search Colleges**: Search by college name.
- 🏫 **College Details**: View admission dates, events, research work, and sports info.
- 📝 **Admission Form**: Fill out detailed admission forms per college.
- 👨‍🎓 **My College Page**: View submitted applications and submit 1 review per college.
- ⭐ **Review System**: Add rating-based reviews, visible on homepage.
- 👤 **Authentication**:
  - Email/password login
  - Google login
  - GitHub login
  - Password reset
- 🧑 **User Profile**: View and edit personal info including photo.
- 📸 **Image Upload** via ImgBB
- 🖼️ **Gallery**: Photos of graduates.
- 📚 **Research Links**: Research papers by students.
- ❌ **Custom 404 Page**
- 💡 **Fully responsive** and mobile-friendly.
- ✨ Smooth animations using `Framer Motion` and `Swiper.js`.

---

## 🛠 Tech Stack

| Tech | Description |
|------|-------------|
| **Next.js** | React framework for SSR/SSG |
| **Tailwind CSS + DaisyUI** | For responsive styling |
| **Firebase** | Auth (Email/Google/GitHub), photoURL |
| **MongoDB & Express** | Backend & Database |
| **ImgBB** | Profile and form image uploads |
| **Framer Motion** | Smooth animations |
| **Swiper.js** | Responsive image gallery |
| **Vercel** | Deployment platform |

---

## 🧭 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home with Search, Colleges, Gallery, Research & Reviews |
| `/colleges` | All colleges listed with key info |
| `/college/[id]` | Detailed page for individual college |
| `/admission` | Submit admission form |
| `/my-college` | View submission, add/edit review |
| `/profile` | View and update user profile |
| `/login`, `/register`, `/reset-password` | Auth routes |
| `404` | Custom Not Found page |

---

## 📂 Folder Structure

    /pages /api → Backend API (MongoDB)
        /college → Dynamic college routes 
        /profile → User profile route 
        /my-college → Admission + Review management 
        /auth → Login 
        / Register 
        / Reset 
    /components → Reusable UI components 
    /lib → Firebase config & MongoDB (dbConnect) 
    /public → Static assets like images, favicon, etc. 

---

## 📦 Setup & Deployment

### 🔧 Installation

```bash
git clone https://github.com/abdulaziz1812/edu-finder.git
cd edu-finder
npm install
🔑 Environment Variables
Create a .env.local file and add:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
MONGODB_URI=your_mongodb_uri
🚀 Deployment
Deployed on Vercel:
https://edufinder.vercel.app


🤝 Contributing
Pull requests and feature suggestions are welcome! Fork the repo and submit a PR.

📜 License
This project is open-source and free to use.

👤 Author
Abdul Aziz Abdul Mannan
Frontend Developer | MERN Stack