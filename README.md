# 🏥 MedMind

![MedMind Banner](https://img.shields.io/badge/MedMind-Healthcare%20Management-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> A secure, full-stack healthcare management platform built for educational purposes.

---
## 🎯 Motivation

Healthcare information is often fragmented across different systems. MedMind was built to provide a secure, centralized platform where users can manage their personal health records while demonstrating secure full-stack development practices.

## 📋 About

MedMind is a comprehensive healthcare management application designed to help users securely manage their personal health information. Built with modern web technologies, it provides a clean, intuitive interface for tracking health profiles, medical records, and receiving AI-powered health insights.

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| Database | SQLite + SQLAlchemy |
| Authentication | JWT |
| API | REST |

### Key Capabilities

- 🧬 **Personal Health Profile** - Manage demographics, allergies, chronic conditions, and insurance details
- 📋 **Medical Records** - Create, read, update, and delete healthcare documentation
- 🔔 **Notifications** - Stay informed with real-time alerts and updates
- 🤖 **AI Health Insights** - Demo visualizations of health analytics (frontend-only mock data)
- 🔐 **JWT Authentication** - Secure user authentication with protected routes

> ⚠️ **Disclaimer**: AI Insights are frontend demo visualizations for demonstration purposes only and do not provide medical advice. Always consult healthcare professionals for medical decisions.

---

## ✨ Features

### 🔐 Authentication
- User registration with email validation
- Secure login with JWT tokens
- Protected routes with authentication guards
- Session management with automatic token refresh

### Dashboard
- Profile completion tracking
- Quick action shortcuts
- Medical record summary
- Recent activity overview
- Notification center

### Health Profile
- Create and update personal health information
- Emergency contact management
- Blood group tracking
- Allergies documentation
- Chronic diseases recording
- Insurance provider and policy details
- Form validation with user-friendly error messages

### Medical Records
- Full CRUD operations (Create, Read, Update, Delete)
- Advanced search across all fields (title, type, hospital, doctor, notes, file, date)
- Filter by record type (Check-up, Lab Result, Prescription, Imaging, Surgery, Vaccination)
- Detailed record view modal
- Responsive table and card layouts
- Mobile-friendly interface

### AI Insights (Demo)
- Health Score (0-100) with visual gauge
- Risk Level Assessment (Cardiovascular, Diabetes, Respiratory, Mental Health)
- BMI Calculator with category classification
- Heart Health Metrics (Resting Heart Rate, Blood Pressure, Cholesterol)
- Hydration Tracker with daily goal
- Medication Reminders with status tracking
- Exercise Recommendations
- Nutrition Guidance with food group visualization
- Sleep Quality Recommendations
- Weekly Health Trend Charts (SVG/CSS)
- Preventive Care Tips with priority levels
- Upcoming Appointments display

### Design & UX
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern UI with Tailwind CSS
- ⚡ Loading skeletons and empty states
- 🔄 Smooth animations and transitions
- ♿ Accessibility features (keyboard navigation, ARIA labels, focus indicators)
- 🌙 Light/dark mode support
- 🎯 Consistent design system across all pages

### Error Handling
- User-friendly error messages
- Network error detection
- Authentication error handling
- Retry functionality for failed requests
- Form validation with inline error display

---

## 📸 Screenshots

| Page | Screenshot |
|------|------------|
| Login | `docs/login.png` |
| Dashboard | `docs/dashboard.png` |
| Health Profile | `docs/profile.png` |
| Medical Records | `docs/records.png` |
| AI Insights | `docs/insights.png` |

---

## 📁 Project Structure

```
MedMind/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── models.py            # SQLAlchemy database models
│   │   ├── schemas.py           # Pydantic request/response schemas
│   │   ├── auth.py              # Authentication routes
│   │   ├── profile.py           # Health profile routes
│   │   └── records.py           # Medical records routes
│   ├── database.py              # Database configuration
│   ├── requirements.txt         # Python dependencies
│   └── venv/                    # Virtual environment
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Layout components (Sidebar, Header, etc.)
│   │   │   └── ui/              # Reusable UI components (Button, Input, Card, etc.)
│   │   ├── pages/               # Page components (Dashboard, Profile, Records, etc.)
│   │   ├── context/             # React Context (Auth, Toast)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── api/                 # API client with Axios
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Utility functions
│   │   ├── App.tsx              # Main App component with routing
│   │   └── index.css            # Global styles and Tailwind CSS
│   ├── package.json             # Node.js dependencies
│   ├── vite.config.ts           # Vite configuration
│   └── tsconfig.json            # TypeScript configuration
├── docs/                        # Documentation and screenshots
└── README.md                    # This file
```

---

## 🚀 Installation

### Prerequisites

- **Backend**: Python 3.8+
- **Frontend**: Node.js 18+ and npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the development server:
```bash
uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

### Production Build

To build the frontend for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

---

## 🔌 API Overview

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |
| GET | `/auth/me` | Get current user profile |

### Health Profile Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get user's health profile |
| POST | `/profile` | Create health profile |
| PUT | `/profile` | Update health profile |

### Medical Records Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/records` | Get all medical records |
| POST | `/records` | Create a new medical record |
| PUT | `/records/{id}` | Update a medical record |
| DELETE | `/records/{id}` | Delete a medical record |

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication with expiration
- **Protected Routes**: All API endpoints require valid authentication
- **Input Validation**: Server-side validation using Pydantic schemas
- **Secure Password Storage**: Passwords hashed using bcrypt
- **Role-Ready Architecture**: Backend designed for role-based access control
- **CORS Configuration**: Cross-origin resource sharing properly configured
- **SQL Injection Prevention**: Parameterized queries via SQLAlchemy ORM

---

## 🚧 Future Improvements

- [ ] **Real AI Integration**: Connect to actual AI/ML services for health insights
- [ ] **OCR for Medical Reports**: Extract text from uploaded medical documents
- [ ] **PDF Upload**: Support for PDF file uploads and storage
- [ ] **Appointment Booking**: Schedule and manage healthcare appointments
- [ ] **Doctor Portal**: Separate interface for healthcare providers
- [ ] **Prescription Scanner**: Digitize prescription information
- [ ] **Cloud Storage**: Integrate with cloud storage services (AWS S3, etc.)
- [ ] **Email Notifications**: Send email alerts for appointments and reminders
- [ ] **Data Export**: Export health data in standard formats (FHIR, HL7)
- [ ] **Multi-language Support**: Internationalization (i18n) for global users
- [ ] **Mobile App**: React Native or Flutter mobile application
- [ ] **Health Device Integration**: Connect with wearables and health trackers

---

## 📚 Learning Outcomes

This project demonstrates proficiency in:

### Frontend Development
- React 18 with TypeScript for type-safe component development
- Vite for fast development and optimized production builds
- Tailwind CSS for utility-first styling
- React Context API for state management
- Custom hooks for reusable logic
- Responsive design principles
- Accessibility (a11y) best practices
- Client-side routing with React Router

### Backend Development
- FastAPI for high-performance API development
- SQLAlchemy ORM for database operations
- Pydantic for data validation and serialization
- JWT authentication implementation
- RESTful API design patterns
- Database modeling and relationships

### Full-Stack Integration
- Axios for HTTP client communication
- CORS configuration for cross-origin requests
- Error handling and user feedback
- Loading states and optimistic UI updates
- Form validation (client and server-side)

### Development Practices
- Git version control
- Modular component architecture
- Code reusability and DRY principles
- Type safety with TypeScript
- Clean code organization
- Professional documentation

---

## ⚠️ Disclaimer

This project is developed for **educational purposes only** and should not be used for clinical decision making or actual healthcare management. The AI Insights feature uses mock data for demonstration purposes and does not provide real medical advice.

Always consult qualified healthcare professionals for medical decisions and treatment.

---

## 👤 Author

**Manisha Rameshbabu**

- 📧 Email: [manisharamesh1314@gmail.com]
- 🔗 GitHub: [https://github.com/manisharamesh1314-jpg]
- 💼 LinkedIn: [https://www.linkedin.com/in/manisha-rameshbabu/]
- 🌐 Portfolio: [https://manisharam-portfolio.lovable.app/]

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Healthcare professionals for domain expertise
- Open-source community for amazing tools and libraries
- React, FastAPI, and Tailwind CSS documentation teams

---

## 📞 Support

If you have any questions or suggestions, feel free to open an issue on GitHub or contact the author directly.

---

**Built with ❤️ for better healthcare management**
