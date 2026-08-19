# 🚀 Imadh Ahmed Portfolio & CMS – Complete Running Guide

A full-stack portfolio ecosystem featuring a dynamic public portfolio site, a headless CMS REST API, and an administrative control panel.

---

## 📌 Project Architecture

The repository is structured into three main components:

| Component | Directory | Description | Default Port / URL |
| :--- | :--- | :--- | :--- |
| **Public Frontend** | Root (`/`) | Modern React 19 + Vite site with Tailwind CSS & Framer Motion | `http://localhost:5173` |
| **Backend API** | `portfolio-api/` | Express.js + MongoDB + Cloudinary CMS REST API | `http://localhost:5000` |
| **Admin Dashboard** | `portfolio-admin/` | Admin panel for managing projects, certificates, achievements & settings | `http://localhost:5174` |

```
📁 Repository Structure
├── 📁 portfolio-api/       # Node.js + Express + MongoDB REST API backend
├── 📁 portfolio-admin/     # React + Vite Admin dashboard interface
├── 📁 src/                 # Main portfolio public frontend source
├── 📁 public/              # Static assets for main frontend
├── 📄 package.json         # Main frontend dependencies & scripts
├── 📄 vite.config.js       # Vite configuration for main frontend
└── 📄 README.md            # Complete project running guide
```

---

## 🛠️ Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB**: A running local MongoDB instance or a cloud database connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Cloudinary Account**: Required for media uploads (project thumbnails, certificates, etc.).

---

## ⚡ Quick Start: Running Everything Locally

### 1️⃣ Step 1: Clone the Repository
```bash
git clone https://github.com/imadhahmed/imadhahmed.github.io.git
cd imadhahmed.github.io
```

---

### 2️⃣ Step 2: Set Up Environment Variables

#### Backend API (`portfolio-api/.env`)
Create a `.env` file inside the `portfolio-api/` directory (you can copy from `.env.example`):

```bash
cp portfolio-api/.env.example portfolio-api/.env
```

Fill in `portfolio-api/.env` with your credentials:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173,https://imadh.me
ADMIN_URL=http://localhost:5174,https://admin.imadh.me
ADMIN_INITIAL_PASSWORD=your_initial_admin_password
```

#### Public Frontend (`.env` in root)
*(Optional for local dev)* Create a `.env` file in the root directory to point to your local API:
```env
VITE_API_URL=http://localhost:5000/api
```

#### Admin Dashboard (`portfolio-admin/.env`)
*(Optional for local dev)* Create a `.env` file inside `portfolio-admin/`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3️⃣ Step 3: Install Dependencies

Install dependencies for all 3 projects:

```bash
# 1. Main Public Frontend (Root)
npm install

# 2. Backend API
cd portfolio-api
npm install
cd ..

# 3. Admin Dashboard
cd portfolio-admin
npm install
cd ..
```

---

### 4️⃣ Step 4: Start Development Servers

Open **3 separate terminal windows** (or terminal tabs) to run all services concurrently:

#### Terminal 1: Backend API
```bash
cd portfolio-api
npm run dev
```
> 🚀 **API Running at**: `http://localhost:5000`  
> 🏥 **Health Check**: `http://localhost:5000/health`

#### Terminal 2: Public Frontend
```bash
npm run dev
```
> 🌐 **App Running at**: `http://localhost:5173`

#### Terminal 3: Admin Dashboard
```bash
cd portfolio-admin
npm run dev
```
> 🛠️ **Admin Running at**: `http://localhost:5174`

---

## 🔑 Initial Admin Account Setup

The API features an **automatic first-time admin bootstrap mechanism**:

1. Start the **Backend API** and the **Admin Dashboard**.
2. Navigate to the Admin Dashboard at `http://localhost:5174`.
3. Enter your desired **Admin Email** and **Password** on the login page.
4. **Auto-Seeding**: If no admin user exists in the MongoDB database yet, the API will automatically register your first admin account with those credentials (or `ADMIN_INITIAL_PASSWORD` if set in `.env`).
5. Subsequent login attempts will authenticate against the stored bcrypt password hash.

---

## 🔌 API Endpoints Overview

| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | System status and uptime check |
| `POST` | `/api/auth/login` | Public | Admin login & JWT generation |
| `GET` | `/api/auth/me` | Admin Auth | Verify current admin token |
| `GET` | `/api/projects` | Public | Fetch all portfolio projects |
| `POST` | `/api/projects` | Admin Auth | Create new project (supports image upload) |
| `PUT` | `/api/projects/:id` | Admin Auth | Update existing project |
| `DELETE` | `/api/projects/:id` | Admin Auth | Delete a project |
| `GET` | `/api/certificates` | Public | Fetch all certificates |
| `POST` | `/api/certificates` | Admin Auth | Create certificate |
| `PUT` | `/api/certificates/:id` | Admin Auth | Update certificate |
| `DELETE` | `/api/certificates/:id` | Admin Auth | Delete certificate |
| `GET` | `/api/achievements` | Public | Fetch all achievements |
| `POST` | `/api/achievements` | Admin Auth | Create achievement |
| `PUT` | `/api/achievements/:id` | Admin Auth | Update achievement |
| `DELETE` | `/api/achievements/:id` | Admin Auth | Delete achievement |
| `GET` | `/api/settings` | Public | Fetch site settings (bio, social links, status) |
| `PUT` | `/api/settings` | Admin Auth | Update site settings |

---

## 📦 Scripts Reference

### Main Public Frontend (Root `/`)
- `npm run dev` – Start Vite development server with HMR.
- `npm run build` – Create production bundle in `dist/`.
- `npm run preview` – Locally preview production build.
- `npm run lint` – Run Oxlint code linter.
- `npm run deploy` – Deploy production build to GitHub Pages (`gh-pages`).

### Backend API (`portfolio-api/`)
- `npm run dev` – Run Node server with hot-reloading (`node --watch server.js`).
- `npm start` – Run production Node server (`node server.js`).

### Admin Dashboard (`portfolio-admin/`)
- `npm run dev` – Start Vite development server.
- `npm run build` – Build production assets in `dist/`.
- `npm run preview` – Preview production build locally.

---

## 🚀 Deployment Guide

### 1. Backend API (Render / Railway / Heroku)
- Point service deployment to the `portfolio-api` subfolder.
- Set environment variables (`MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `FRONTEND_URL`, `ADMIN_URL`).
- Start Command: `npm start`.

### 2. Public Frontend (GitHub Pages / Vercel / Netlify)
- For GitHub Pages deployment, run `npm run deploy` from the root directory.
- Configure `VITE_API_URL` environment variable pointing to live backend API URL (e.g., `https://api.imadh.me/api`).

### 3. Admin Dashboard (Vercel / Netlify / Render)
- Deploy `portfolio-admin` subfolder as a static website.
- Set `VITE_API_URL` to point to production backend API URL.

> 📖 **For a step-by-step production deployment guide for Render & GitHub Pages, see [`DEPLOYMENT.md`](DEPLOYMENT.md).**

---

## ❓ Troubleshooting

<details>
<summary><b>1. MongoDB Connection Failure / Timeout</b></summary>

- Verify `MONGODB_URI` connection string format.
- Ensure Network Access IP whitelist in MongoDB Atlas allows your IP (`0.0.0.0/0` for dev).
</details>

<details>
<summary><b>2. CORS Restrictions in Browser</b></summary>

- Verify `FRONTEND_URL` and `ADMIN_URL` in `portfolio-api/.env` match the exact domain/port of your client apps (`http://localhost:5173`, `http://localhost:5174`).
</details>

<details>
<summary><b>3. Media Upload Errors (Server returned unexpected status code - 403)</b></summary>

- If you receive `Server returned unexpected status code - 403` when uploading an image in the Admin Portal, it means your Cloudinary credentials in `portfolio-api/.env` are invalid, mismatch, or your Cloudinary cloud account is **disabled** on Cloudinary.
- **Solution**:
  1. Log in to [Cloudinary Console](https://cloudinary.com/console).
  2. Verify your **Cloud Name**, **API Key**, and **API Secret**.
  3. Ensure your Cloudinary cloud status is active (not suspended/disabled).
  4. Update `portfolio-api/.env` with your active Cloudinary credentials and restart the API server.
</details>

---

## 📄 License

Maintained by [Imadh Ahmed](https://github.com/imadhahmed).

