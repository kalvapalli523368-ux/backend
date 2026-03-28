# Student Complaint Management — Backend

This is the backend server for the Student Complaint Management system. It provides a RESTful API for user authentication and complaint management, originally designed for MySQL but currently running on a locally-stored SQLite database for easy development and testing.

## 📂 Project Structure

```text
📁 student-complaint-backend/
├── 📄 server.js             # Main entry point
├── 🗄️ db.js                 # SQLite connection
├── 📜 schema.sql            # Table definitions
├── 📁 routes/
│   ├── 🔐 auth.js           # Auth endpoints
│   └── 📝 complaints.js     # Complaint endpoints
├── 📁 middleware/
│   └── 🛡️ authMiddleware.js # JWT verification
├── 📁 assets/               # Architecture diagrams
└── ⚙️ .env                  # Environment variables
```

---

## ⚙️ Technology Stack
- **Node.js & Express.js**: Core server framework.
- **SQLite3**: Lightweight database.
- **JSON Web Tokens (JWT)**: Stateless authentication.
- **Bcrypt**: Secure password hashing.

---

## 🏗️ System Architecture 

Below are the architectural diagrams outlining the flow of data between the Student, Admin, and the System Backend.

### 1. Database & State Flow
![System Architecture Diagram 1](./assets/Student%20and%20Admin-2026-03-24-173419.png)

### 2. API Request Hierarchy
![System Architecture Diagram 2](./assets/Student%20and%20Admin-2026-03-24-173427.png)

### 3. Component Interaction Map
![System Architecture Diagram 3](./assets/Student%20and%20Admin-2026-03-24-173434.png)

---

## 🚀 Running the Server
Make sure dependencies are installed (`npm install`), then run:

```bash
node server.js
```

The server will automatically create `database.sqlite` and the core tables if they don't exist.

---

## 📌 Pushing to GitHub (Backend)
To push this backend server to a new GitHub repository, run these commands in your terminal from the `backend` folder:

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Add all files to staging (ensure .env and database.sqlite are in .gitignore!)
git add .

# 3. Commit your changes
git commit -m "Initial backend commit: Express SQLite setup"

# 4. Link to your empty GitHub repository
git remote add origin https://github.com/your-username/student-complaint-backend.git

# 5. Push to the main branch
git branch -M main
git push -u origin main
```
> **⚠️ Security Warning:** Make sure to create a `.gitignore` file mapping `/node_modules`, `.env`, and `database.sqlite` before pushing to avoid leaking secrets or user data!
