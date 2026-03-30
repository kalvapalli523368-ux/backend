# Student Complaint Management — Backend

This is the backend server for the Student Complaint Management system. It provides a RESTful API for user authentication and complaint management, originally designed for MySQL but currently running on a locally-stored SQLite database for easy development and testing.

## 📂 Project Structure

```text
📁 backend/
├── 📄 server.js             # Main entry point
├── 🗄️ db.js                 # SQLite connection
├── 📜 schema.sql            # Table definitions (Users, Complaints)
├── 📁 routes/
│   ├── 🔐 auth.js           # Auth (Login/Register)
│   └── 📝 complaints.js     # Complaints (submission, resolution, and admin_remark)
├── 📁 middleware/
│   └── 🛡️ authMiddleware.js # JWT + Role-based access
└── ⚙️ .env                  # Environment secrets
```

---

## ⚙️ Technology Stack
- **Node.js**: Core server framework.
- **Express.js**: API development.
- **SQLite3**: Lightweight database with zero configuration.
- **Bcryptjs**: Secure password hashing.
- **JWT**: Stateless session management.

---

## 🏗️ Latest Enhancements
- **Admin Remarks**: New `admin_remark` field in the `complaints` table to allow administrators to provide feedback/solutions.
- **Schema Cleanup**: Removed legacy `image_url` column to optimize the data model.
- **Automatic Sync**: The `db.js` system automatically initializes the database on startup.

---

## 🚀 Running the Server
Make sure dependencies are installed (`npm install`), then run:

```bash
node server.js
```

The database `database.sqlite` will be created automatically if it doesn't exist.

---

## 🛡️ Security Check
Ensure `.env` contains a secure **`JWT_SECRET`**.

---
