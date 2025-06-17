# 📊 Excel Analytics Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to upload, parse, and visualize Excel data with rich analytics and visual charts. It features a clean structure, real-time insights, and role-based access handling.

---

## 📁 Project Structure

excel-analytics/
│
├── backend/ # Node + Express server, Excel parsing
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── server.js
│
├── frontend/ # React.js frontend with charts
│ ├── public/
│ ├── src/
│ └── package.json
│
├── .gitignore
└── README.md

yaml
Copy
Edit

---

## 🚀 Features

- ✅ Upload and parse Excel files
- ✅ Store parsed data in MongoDB
- ✅ Dynamic chart rendering using Chart.js
- ✅ React UI with responsive layout
- ✅ RESTful API structure
- ✅ Secure environment variable handling
- ✅ Modular and clean codebase

---

## ⚙️ Tech Stack

| Frontend        | Backend           | Database      | Libraries |
|----------------|-------------------|---------------|-----------|
| React.js       | Express.js        | MongoDB       | XLSX, Mongoose, Chart.js |
| Axios          | Node.js           | MongoDB Atlas | Multer, dotenv           |

---

## 🧑‍💻 Getting Started

### 🔁 Clone the Repository

```bash
git clone https://github.com/<your-username>/excel-analytics.git
cd excel-analytics
🔧 Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend/ directory:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
Run backend:

bash
Copy
Edit
npm start
💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
The React app will run at:
http://localhost:3000

🌐 Deployment
Frontend: Vercel

Backend: Render

Database: MongoDB Atlas


🙌 Contributing
Contributions, issues and feature requests are welcome!

bash
Copy
Edit
git checkout -b feature/your-feature-name
git commit -m "Add feature"
git push origin feature/your-feature-name
📄 License
This project is licensed under the MIT License.

✉️ Contact
Developer: Vickey Yadav

📧 Email: vickeyyadav0088@gmail.com


yaml
Copy
Edit

---
