# HireSync

# HireSync – Interview Scheduling & Panel Availability Dashboard

HireSync is a full-stack interview scheduling platform that helps recruiters and admins manage panelist availability, candidate availability, interview scheduling, and status tracking efficiently.

## 🚀 Live Demo

### Frontend
https://hire-sync-kohl-six.vercel.app/

### Backend API
https://hiresync-0lnu.onrender.com

---

## 📌 Features

### Panelist Features
- Add interview availability slots
- Set interview type
- Set maximum interviews per day

### Candidate Features
- Submit availability slots
- Provide candidate details

### Admin Features
- View matching slots
- Schedule interviews
- Generate dummy meeting links
- Update interview status
- Prevent overlapping bookings
- View upcoming interviews dashboard

---

## 📌 Interview Status Options

- Scheduled
- Completed
- No Show
- Rescheduled
- Cancelled

---

## 🛠 Tech Stack

### Frontend
- ReactJS
- React Router DOM
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- SQLite

### Deployment
- Frontend → Vercel
- Backend → Render

---

## 📂 Project Structure

```bash
HireSync/
│
├── frontend/
│
├── backend/
│
└── README.md
```

---

# ⚙️ Backend Setup

## 1️⃣ Move to backend

```bash
cd backend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Start backend server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# ⚙️ Frontend Setup

## 1️⃣ Move to frontend

```bash
cd frontend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Start frontend server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 📌 API Endpoints

## Panelist APIs

| Method | Endpoint |
|---|---|
| POST | /api/panelists/availability |
| GET | /api/panelists/availability |

---

## Candidate APIs

| Method | Endpoint |
|---|---|
| POST | /api/candidates/availability |

---

## Matching APIs

| Method | Endpoint |
|---|---|
| GET | /api/matches |

---

## Interview APIs

| Method | Endpoint |
|---|---|
| POST | /api/interviews |
| GET | /api/interviews/upcoming |
| PUT | /api/interviews/:id/status |

---

# 📌 Database Tables

- users
- panelist_availability
- candidate_availability
- interviews
- interview_status_logs

---

# 📌 Business Rules Implemented

✅ Prevent overlapping interview bookings
✅ Match candidate and panelist slots
✅ Status tracking system
✅ Dynamic meeting link generation
✅ Responsive UI
✅ API error handling

---

# 📌 Screenshots

## Dashboard


## Matching Slots


## Interview Scheduler


---

# 📌 Future Improvements

- Authentication & Authorization
- Calendar View
- Search & Filters
- Pagination
- CSV Import
- Email Notifications

---

# 👨‍💻 Author

Moodu Prabhakar

- GitHub: https://github.com/prabhakar-nayak
- LinkedIn: https://www.linkedin.com/in/prabhakarmoodu/
