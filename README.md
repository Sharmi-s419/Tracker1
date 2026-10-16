# Hotel Lara International — Monorepo Architecture

Comprehensive hotel website, online guest room-selection portal, and staff reception management system for **Hotel Lara International** (Suchindram, Kanyakumari District, Tamil Nadu).

---

## 1. Monorepo Project Structure

```text
hotel-lara-international/
├── frontend/                       # Public guest-facing hotel website (React + Vite)
│   ├── src/
│   │   ├── components/             # Hero, Rooms, Gallery, Location, Contact, FAQ, etc.
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css               # Luxury branding & typography
│   ├── public/                     # Static assets & optimized WebP images
│   ├── images/                     # Raw image assets
│   ├── scripts/                    # Image optimization scripts
│   ├── index.html                  # SEO-optimized HTML entry
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js              # Runs on http://localhost:3000
│   ├── .env.example
│   └── .env
│
├── booking-dashboard/              # Online Room-Selection & Staff Reception Console (React + Vite)
│   ├── src/
│   │   ├── api/client.js           # Axios client configured with JWT interceptors
│   │   ├── pages/
│   │   │   ├── GuestRoomSelection.jsx # Guest room-selection experience (Reference 3)
│   │   │   ├── Login.jsx           # Staff reception authentication
│   │   │   ├── DashboardOverview.jsx # Live KPIs, today's arrivals & departures
│   │   │   ├── RoomManagement.jsx  # 14 physical rooms inventory & housekeeping states
│   │   │   ├── NewBookingForm.jsx  # Offline phone/walk-in reservation form
│   │   │   ├── BookingManagement.jsx # Comprehensive reservations register & filters
│   │   │   ├── FrontDeskOperations.jsx # Daily check-in/out & room turnover desk
│   │   │   ├── GuestDirectory.jsx  # Guest history & contact profiles
│   │   │   └── ReportsView.jsx     # Financial analytics & booking channels breakdown
│   │   ├── styles/dashboard.css    # Warm cream (#FAF7F1), dark brown, and burgundy theme
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js              # Runs on http://localhost:3001
│   ├── .env.example
│   └── .env
│
├── backend/                        # Django REST Framework API & PostgreSQL engine
│   ├── manage.py
│   ├── requirements.txt            # Django 5.1, DRF, SimpleJWT, psycopg, corsheaders
│   ├── .env.example
│   ├── .env
│   ├── config/
│   │   ├── settings.py             # DB config (PostgreSQL in prod, SQLite fallback), CORS, JWT
│   │   ├── urls.py                 # API router (/api/auth/, /api/rooms/, /api/bookings/)
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── apps/
│       ├── accounts/               # Staff authentication & profiles
│       ├── rooms/                  # 14 rooms inventory, tariffs, live availability
│       │   └── management/commands/setup_initial_rooms.py
│       ├── guests/                 # Guest profiles & records
│       └── bookings/               # Concurrency locking, double-booking prevention, KPIs
│
├── .gitignore                      # Monorepo git exclusion rules
└── README.md                       # Comprehensive guide
```

---

## 2. Quick Start / Running Locally

### Prerequisites
- Node.js (v18+)
- Python (v3.11+; tested on Python 3.13)

### Step 1: Start the Django REST API Backend (Port 8000)
```powershell
# From the repository root:
.\backend\venv\Scripts\activate

# Apply database migrations
python backend\manage.py migrate

# (Optional) Seed the 14 physical rooms if not yet initialized
python backend\manage.py setup_initial_rooms

# Launch Django development server
python backend\manage.py runserver 127.0.0.1:8000
```
- API Base: `http://127.0.0.1:8000/api/`
- Default Staff Credentials: Username `admin`, Password `admin123`

### Step 2: Start the Staff & Guest Booking Console (Port 3001)
```powershell
cd booking-dashboard
npm install
npm run dev
```
- Available at: `http://localhost:3001/`

### Step 3: Start the Public Hotel Website (Port 3000)
```powershell
cd frontend
npm install
npm run dev
```
- Available at: `http://localhost:3000/`

---

## 3. Core Features & Architecture Highlights

### A. Double-Booking Prevention & Concurrency Controls
- **Date Rule**: Check-in is **inclusive**; check-out is **exclusive**.
- A booking ending on October 22 followed by another beginning on October 22 is permitted without conflict.
- Handled at the database engine level inside `transaction.atomic()` with `select_for_update()` row-level locks on the Room model.
- Cancelled reservations immediately release the room back to active inventory.

### B. Guest-Facing Room-Selection Portal
- Inspired by luxury hotel room selection with elegant navy blue (`#17243D`) and gold (`#C49A45`) styling (Screenshot 2 reference).
- Uses warm cream (`#FAF7F1`), dark brown (`#342321`), navy blue (`#17243D`), and primary gold (`#C49A45`, hover `#A77B2E`).
- Live check-in/out date search, guest selector, room category filters (Deluxe AC, Executive, Comfort), budget slider, and real-time room availability.
- Online reservation confirmation directly registers into the database with unique booking references (`HLI-...`).

### C. Public Website Enhancements
- **Zero WhatsApp**: WhatsApp booking buttons, floating WhatsApp dock, and WhatsApp icons completely removed.
- **Direct Navigation**: "Book a Room" and "Reserve Stay" connect directly to the online booking portal via `VITE_BOOKING_APP_URL`.
- **SEO Optimization**: Clean H1 heading hierarchy, location-specific metadata for Suchindram, Kanyakumari, and structured headings.
- **Visual Tour**: Organized into 3 distinct categories with real hotel photographs:
  1. Exterior & Facade
  2. Bedroom Ensuite
  3. Bathroom Amenities
- **3 Accommodation Categories**: Deluxe AC Room, Executive Room, and Comfort Room (standalone kitchenette suite removed).

---

## 4. Production Deployment Guidelines

Deploy the monorepo as **two separate Vercel projects** and one **Render Web Service**:

```text
GitHub: Tracker1 (Single Monorepo)
├── Vercel Project 1: Public Website (Root Directory: frontend)
├── Vercel Project 2: Booking Dashboard (Root Directory: booking-dashboard)
└── Render Web Service: Django REST API (Root Directory: backend)
```

---

### A. Deploy Public Website on Vercel (Project 1)

1. Go to [Vercel Dashboard](https://vercel.com/new) → **Add New Project**.
2. Select your repository: **`Tracker1`**.
3. In **Project Configuration**:
   - **Project Name**: `hotel-lara-international` (or your choice)
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click **Edit** and select **`frontend`**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. In **Environment Variables**:
   - `VITE_BOOKING_APP_URL`: `https://hotel-lara-booking-dashboard.vercel.app` (URL of Project 2)
5. Click **Deploy**.

---

### B. Deploy Booking Dashboard on Vercel (Project 2)

1. Go to [Vercel Dashboard](https://vercel.com/new) → **Add New Project**.
2. Import the **same repository** (`Tracker1`) a second time.
3. In **Project Configuration**:
   - **Project Name**: `hotel-lara-booking-dashboard`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click **Edit** and select **`booking-dashboard`**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. In **Environment Variables**:
   - `VITE_API_BASE_URL`: `https://hotel-lara-backend.onrender.com/api` (Render backend API URL)
5. Click **Deploy**.

---

### C. Deploy Django Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com/) → **New Web Service**.
2. Connect your GitHub repository: **`Tracker1`**.
3. In **Service Settings**:
   - **Name**: `hotel-lara-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Region**: Choose the closest region (e.g., Singapore / Frankfurt)
   - **Branch**: `main`
   - **Build Command**: `./build.sh` (or `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`)
   - **Start Command**: `gunicorn config.wsgi:application`
4. In **Environment Variables**:
   - `PYTHON_VERSION`: `3.11.9` (or `3.12.0`)
   - `DJANGO_SECRET_KEY`: `<Generate a random 50-character secret>`
   - `DEBUG`: `False`
   - `DATABASE_URL`: `<Render PostgreSQL Internal Connection String>`
   - `CORS_ALLOWED_ORIGINS`: `https://hotel-lara-international.vercel.app,https://hotel-lara-booking-dashboard.vercel.app`
   - `CORS_ALLOW_VERCEL_PREVIEWS`: `True`
5. Click **Create Web Service**.
