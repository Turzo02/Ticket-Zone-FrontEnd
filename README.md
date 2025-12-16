
# TicketZone — Online Ticket Booking Platform

## Project Overview
TicketZone is a full-stack **MERN (MongoDB, Express, React, Node.js)** based Online Ticket Booking Platform where users can discover and book travel tickets such as **Bus, Train, Launch, Plane, Flight, and Ship**.  
The platform supports **three user roles**: **User**, **Vendor**, and **Admin**, each with dedicated dashboards and permissions.

This project is designed with **production-level architecture**, **secure authentication**, and a **recruiter-friendly UI/UX**.

---

## 🎯 Purpose of the Project
- Build a real-world ticket booking system using MERN stack
- Implement role-based dashboards and permissions
- Practice secure authentication and payment integration
- Deliver a fully deployed, production-ready application

---

## 🌐 Live Site
**Live URL:** https://your-live-site-link.com

---


---

## 🚀 Key Features

### General
- MERN Stack application
- Firebase Authentication (Email/Password + Google)
- JWT / Firebase Token protected APIs
- Responsive design (Mobile, Tablet, Desktop)
- Dark / Light mode toggle
- Loading spinners & global error handling
- Secure environment variable usage

### User Features
- Browse all approved tickets
- Search by **From → To**
- Filter by transport type
- Sort by price (Low → High, High → Low)
- Pagination (6–9 tickets per page)
- View ticket details with countdown timer
- Book tickets with quantity validation
- Stripe payment integration
- Booking status tracking (pending, accepted, rejected, paid)
- Transaction history

### Vendor Features
- Add tickets with image upload (imgbb)
- Manage own tickets (Update / Delete)
- View booking requests
- Accept or reject bookings
- Revenue overview with charts
- Ticket verification status tracking

### Admin Features
- Approve / Reject vendor tickets
- Manage users (Make Admin / Vendor)
- Mark vendors as fraud
- Advertise tickets (max 6)
- Full platform control

---

## 🧩 Layout Structure

### Main Layout
- Navbar (Sticky)
- Outlet / Main Content
- Footer

### Navbar
- Logo: **TicketZone**
- Home
- All Tickets (Private)
- Dashboard (Private)
- Login / Register
- User Avatar Dropdown

### Footer
- Logo & description
- Quick Links
- Contact Info
- Payment Methods
- Copyright

---

## 🔑 Authentication & Security
- Firebase Authentication
- Google Social Login
- Password validation:
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - Minimum 6 characters
- Secure Firebase config using environment variables
- Secure MongoDB credentials via environment variables
- Protected private routes (no redirect on reload)

---

## 🏠 Pages & Dashboards

### Home Page
- Hero banner / slider
- Advertisement section (6 admin-selected tickets)
- Latest tickets section
- Extra custom sections

### All Tickets Page
- Approved tickets only
- Search, filter, sort & pagination

### Ticket Details Page (Protected)
- Full ticket details
- Countdown timer
- Book Now modal
- Quantity validation

---

## 📊 Dashboards

### User Dashboard
- Profile
- My Booked Tickets
- Transaction History

### Vendor Dashboard
- Profile
- Add Ticket
- My Added Tickets
- Requested Bookings
- Revenue Overview

### Admin Dashboard
- Profile
- Manage Tickets
- Manage Users
- Advertise Tickets

---

## 💳 Payment System
- Stripe integration
- Payment only after vendor acceptance
- Automatic ticket quantity reduction after payment
- Payment blocked after departure time

---

## ⚙️ Technologies Used

### Client
- React
- React Router DOM
- Tailwind CSS
- Firebase
- Axios
- React Query
- Stripe JS
- Chart.js / Recharts
- React Hook Form
- Sweetalert2
- Swiper 
- Framer Motion
- Dotenv
- Vite
- DaisyUI


### Server
- Node.js
- Express.js
- MongoDB
- JWT
- Stripe
- CORS
- dotenv

---



## 🧪 Deployment Checklist
- No CORS / 404 / 504 errors
- Firebase authorized domains added
- Private routes work on reload
- Server runs smoothly in production
- Live link loads without error

---




## 📁 GitHub Repositories
- Client: https://github.com/your-username/TicketZone-client
- Server: https://github.com/your-username/TicketZone-server

---


© 2025 TicketZone. All rights reserved.
