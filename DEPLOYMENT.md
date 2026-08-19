# 🚀 Production Deployment & Interconnection Guide

Complete guide for deploying and interconnecting the **Public Frontend on GitHub Pages (`https://imadh.me`)**, and the **Backend API** & **Admin Dashboard on Render**.

---

## 🌐 Architectural Interconnection Diagram

```
                              ┌───────────────────────────────────────────────┐
                              │           MongoDB Atlas & Cloudinary          │
                              └──────────────────────▲────────────────────────┘
                                                     │
                                                     │ (Database & Media)
                                                     │
┌─────────────────────────┐               ┌──────────┴────────────────────────┐               ┌─────────────────────────┐
│     Public Frontend     │               │            Backend API            │               │     Admin Dashboard     │
│   (GitHub Pages / DNS)  │ ────────────► │           (Render Web)            │ ◄──────────── │      (Render Static)    │
│    https://imadh.me     │   Fetch API   │ https://portfolio-api.onrender.com│   Admin API   │https://admin.onrender...│
└─────────────────────────┘               └───────────────────────────────────┘               └─────────────────────────┘
```

---

## 1️⃣ Step 1: Deploy Backend API (`portfolio-api`) on Render

1. Log in to [Render Dashboard](https://dashboard.render.com/) and click **New +** ➔ **Web Service**.
2. Connect your GitHub repository: `imadhahmed/imadhahmed.github.io`.
3. Configure the Web Service details:

| Setting | Value |
| :--- | :--- |
| **Name** | `imadh-portfolio-api` |
| **Root Directory** | `portfolio-api` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

4. Scroll down to **Environment Variables** and add the following keys:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_production_jwt_key
CLOUDINARY_CLOUD_NAME=your_active_cloud_name
CLOUDINARY_API_KEY=your_active_api_key
CLOUDINARY_API_SECRET=your_active_api_secret
FRONTEND_URL=https://imadh.me,https://imadhahmed.github.io
ADMIN_URL=https://imadh-portfolio-admin.onrender.com
```

5. Click **Create Web Service**.
   > 📌 **Copy your live API URL**: e.g., `https://imadh-portfolio-api.onrender.com`

---

## 2️⃣ Step 2: Deploy Admin Dashboard (`portfolio-admin`) on Render

1. On Render Dashboard, click **New +** ➔ **Static Site**.
2. Connect the same repository: `imadhahmed/imadhahmed.github.io`.
3. Configure the Static Site details:

| Setting | Value |
| :--- | :--- |
| **Name** | `imadh-portfolio-admin` |
| **Root Directory** | `portfolio-admin` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

4. Under **Environment Variables**, add:

```env
VITE_API_URL=https://imadh-portfolio-api.onrender.com/api
```
*(Replace `imadh-portfolio-api.onrender.com` with your actual API domain from Step 1).*

5. Under **Redirects / Rewrites** in your Render Static Site settings:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite` (Status 200) — *Required for React SPA single-page routing!*

6. Click **Create Static Site**.

---

## 3️⃣ Step 3: Connect Public Frontend (`https://imadh.me` / GitHub Pages)

To point your GitHub Pages site to your live Render Backend API:

1. **Set GitHub Repository Secret/Variable**:
   - Go to your GitHub Repository ➔ **Settings** ➔ **Secrets and variables** ➔ **Actions**.
   - Under **Secrets** (or **Variables**), click **New repository secret**.
   - **Name**: `VITE_API_URL`
   - **Value**: `https://imadh-portfolio-api.onrender.com/api` (Replace with your actual live API URL from Step 1).

2. **Automatic Deployment via GitHub Actions**:
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically injects `VITE_API_URL` into the Vite build step whenever you push to `main`.

3. **Manual Local Build & Deploy (Optional)**:
   - Create a local `.env` file in the root directory:
     ```env
     VITE_API_URL=https://imadh-portfolio-api.onrender.com/api
     ```
   - Then run:
     ```bash
     npm run build
     npm run deploy
     ```

---

## 4️⃣ Step 4: Update CORS Origins on Backend API

Ensure `FRONTEND_URL` and `ADMIN_URL` in your **Backend API Environment Variables** on Render match your production domain names:

```env
FRONTEND_URL=https://imadh.me,https://imadhahmed.github.io
ADMIN_URL=https://imadh-portfolio-admin.onrender.com
```

---

## 🔍 Verification & Interconnection Matrix

| Service | Host URL | Connects To (`VITE_API_URL` / CORS) | Status |
| :--- | :--- | :--- | :--- |
| **Backend API** | `https://imadh-portfolio-api.onrender.com` | MongoDB Atlas & Cloudinary | 🚀 Active |
| **Admin Portal** | `https://imadh-portfolio-admin.onrender.com` | Calls `https://imadh-portfolio-api.onrender.com/api` | 🛠️ Connected |
| **Public Site** | `https://imadh.me` | Calls `https://imadh-portfolio-api.onrender.com/api` | 🌐 Connected |
