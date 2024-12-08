# AI Attendance Manager

The **AI Attendance Manager** is a modern attendance tracking system built using **Next.js** for the frontend, **Express.js** for the backend, and **MongoDB** as the database. This application simplifies attendance management for organizations, schools, or other institutions by providing real-time tracking, user authentication, and comprehensive attendance history.

---

## Features

### For Teachers:
1. **Attendance Marking**:
   - Mark attendance manually by clicking **Present** or **Absent**.
   - Use **Face Recognition** for automated attendance marking.

2. **Attendance Analysis**:
   - View a student's attendance **date-wise**.
   - Filter attendance records by **day**, **month**, or **year**.

3. **Low Attendance Alerts**:
   - Send email notifications to students with attendance less than **75%**.

4. **Marks Management**:
   - Add and manage individual student marks for different subjects.

---

### For Students:
1. **Attendance Overview**:
   - View **overall attendance** displayed as **Bar Charts** or **Pie Charts** for each subject.
   - Generate **date-wise attendance records** for each subject.

2. **Filtering Options**:
   - Filter attendance data by **specific dates**.

3. **Face Authentication**:
   - Login securely with **AI-powered Face Recognition**.

4. **Automated Reports**:
   - Generate an **overall attendance report** using AI.

5. **Chatbot Integration**:
   - Get assistance for common queries through the integrated chatbot.

---

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js
- **Database**: MongoDB
- **Programming Language**: Typescript, Javascript, Python
- **AI/ML**: Face Recognition, FastAPI
- **Email Service**: NodeMailer
- **Charts and Graphs**: Chart.js

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/ai-attendance-manager.git
cd ai-attendance-manager
```

### Start the Frontend and Backend

```bash
cd client
npm install
npm run dev
```

### Dependency needs to install before running the ML model

```bash
pip install uvicorn
pip install numpy
pip install face_recognition
pip install fastapi
pip install pydantic
pip install pandas
pip install spacy
python -m spacy download en_core_web_sm
```

### Start the ML Model

```bash
python app.py
```

## Set up the .env file

```bash
MONGODB_URI = <your_url>
NEXT_PUBLIC_NODEMAILER_USER = <your_email-id>
NEXT_PUBLIC_NODEMAILER_PASS = <your_password>
```

