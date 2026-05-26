# FAST Institute - Architecture Documentation

## System Overview

FAST Institute is a full-stack web application built with modern technologies for educational management and AI-powered learning.

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (React)                      │
│  - Multi-role UI (Student, Teacher, CEO)                    │
│  - Real-time State Management (Context API)                 │
│  - Component-based Architecture                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP/WebSocket
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                    Server Layer (Express)                    │
│  - RESTful API Endpoints                                    │
│  - Business Logic                                           │
│  - Authentication & Authorization                          │
│  - Error Handling & Validation                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                    Data Layer                                │
│  - MongoDB (Primary Database)                               │
│  - LowDB (JSON Database)                                    │
│  - Clerk (External Auth Provider)                          │
└───────────────────────────────────────────────────────────────┘
```

## Architecture Layers

### 1. Presentation Layer (Frontend)

**Location:** `/src`

**Components:**
- **Pages**: Full-page components for different routes
  - `pages/` - Global pages (LandingPage, LoginPage, etc)
  - `pages/student/` - Student portal pages
  - `pages/teacher/` - Teacher portal pages
  - `pages/ceo/` - Administrator pages

- **Components**: Reusable UI components
  - `components/Layout.jsx` - Main layout wrapper
  - `components/Navbar.jsx` - Navigation bar
  - `components/Sidebar.jsx` - Side navigation
  - `components/CommandPalette.jsx` - Quick command interface
  - `components/AISearchOverlay.jsx` - AI search functionality

**State Management:**
- Context API in `context/SchoolContext.jsx`
- Global state for user roles, schools, and application data
- Authentication state via Clerk

**Technologies:**
- React 19.2.5
- React Router DOM 7.15.0
- Framer Motion (animations)
- Lucide React (icons)

### 2. Business Logic Layer (Backend)

**Location:** `/server`

**Structure:**

```
server/
├── index.js              # Entry point
├── middleware/
│   └── auth.js          # Authentication middleware
├── routes/
│   ├── courses.js       # Course endpoints
│   └── ai.js            # AI service endpoints
├── models/
│   ├── Schema.js        # Mongoose schemas
│   └── CommunicationSchema.js
└── db.json              # Local data storage
```

**Key Responsibilities:**
- Route handling and request processing
- Business logic implementation
- Data validation and sanitization
- Authentication and authorization
- Error handling
- Rate limiting
- CORS handling
- Security headers (Helmet)

**Technologies:**
- Express.js 5.2.1
- JWT for token management
- bcryptjs for password hashing
- Morgan for logging
- Helmet for security
- Express-rate-limit for throttling

### 3. Data Access Layer

**Databases:**

1. **MongoDB** (Primary - using Mongoose)
   - User profiles and authentication
   - Course information
   - Student enrollments
   - Grades and assignments
   - Communication/messages

2. **LowDB** (Lightweight JSON database)
   - Caching
   - Session storage
   - Temporary data

**Clerk (External Auth Service):**
- User registration and login
- Session management
- Social authentication
- Multi-factor authentication

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  clerkId: String,
  email: String,
  name: String,
  role: String, // 'student' | 'teacher' | 'admin'
  avatar: String,
  school: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  teacher: ObjectId,
  students: [ObjectId],
  content: String,
  startDate: Date,
  endDate: Date,
  modules: [Object],
  createdAt: Date,
  updatedAt: Date
}
```

### Assignment Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  course: ObjectId,
  dueDate: Date,
  submissions: [Object],
  rubric: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## API Architecture

### RESTful Endpoints

**Base URL:** `http://localhost:5000/api`

**Authentication Routes:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token

**Course Routes:**
- `GET /courses` - List all courses
- `GET /courses/:id` - Get course details
- `POST /courses` - Create course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `POST /courses/:id/enroll` - Enroll student

**Student Routes:**
- `GET /students/:id` - Get student profile
- `GET /students/:id/grades` - Get grades
- `GET /students/:id/assignments` - Get assignments
- `POST /students/:id/submit-assignment` - Submit assignment

**Teacher Routes:**
- `GET /teachers/:id/classes` - Get teacher's classes
- `GET /teachers/:id/attendance` - Get attendance data
- `POST /teachers/:id/grade` - Submit grades

**AI Routes:**
- `POST /ai/search` - AI-powered search
- `POST /ai/analyze` - Content analysis
- `GET /ai/suggestions` - Get recommendations

**Communication Routes:**
- `GET /messages` - Get messages
- `POST /messages` - Send message
- `GET /notifications` - Get notifications
- `POST /notifications` - Create notification

### Error Handling

**Standard Error Response:**
```javascript
{
  success: false,
  error: {
    code: 'ERR_CODE',
    message: 'Human readable message',
    details: {}
  }
}
```

**HTTP Status Codes:**
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 429 Too Many Requests
- 500 Internal Server Error

## Authentication Flow

```
User Input (Email/Password or Social)
         │
         ▼
   Clerk Auth Service
         │
         ▼
   JWT Token Generated
         │
         ▼
   Token Stored in Local Storage
         │
         ▼
   Attached to API Requests
         │
         ▼
   auth.js Middleware Validates
         │
         ▼
   Request Processed or Rejected
```

## Component Hierarchy

```
App
├── Router
├── SchoolProvider (Context)
├── Navbar
├── CommandPalette
├── AISearchOverlay
├── Layout
│   ├── Sidebar
│   ├── Main Content
│   │   ├── Student Routes
│   │   ├── Teacher Routes
│   │   ├── CEO Routes
│   │   └── Public Routes
│   └── Footer
└── Modal/Portal Components
```

## Role-Based Access Control (RBAC)

**Roles:**
1. **Student** - Access own courses, assignments, grades
2. **Teacher** - Manage classes, assignments, grades, attendance
3. **Admin/CEO** - Global analytics, staff management, verification
4. **Public** - Limited access to public resources

**Permission Model:**
- Check user role in middleware
- Verify resource ownership
- Apply granular permission checks
- Log access attempts

## Deployment Architecture

### Frontend Deployment
- Build: `npm run build` → `dist/` folder
- Deploy to:
  - Vercel (recommended)
  - Netlify
  - GitHub Pages
  - AWS S3 + CloudFront

### Backend Deployment
- Containerize with Docker
- Deploy to:
  - Railway
  - Render
  - Heroku
  - AWS EC2/ECS
  - DigitalOcean

### Database Deployment
- MongoDB Atlas (cloud-hosted)
- Self-hosted MongoDB
- Connection pooling for performance

## Security Considerations

1. **Authentication**
   - JWT tokens with expiration
   - Refresh token rotation
   - Secure password hashing (bcryptjs)

2. **Authorization**
   - Role-based access control
   - Resource-level permissions
   - Audit logging

3. **Data Protection**
   - HTTPS/TLS encryption
   - MongoDB encryption at rest
   - Data sanitization (express-mongo-sanitize)

4. **API Security**
   - CORS configuration
   - Rate limiting
   - Request validation
   - SQL injection prevention (Mongoose)
   - XSS protection (React escaping)
   - CSRF tokens (if applicable)

5. **Infrastructure**
   - Security headers (Helmet)
   - Environment variables for secrets
   - Dependency scanning
   - Regular security updates

## Performance Optimization

1. **Frontend**
   - Code splitting with React Router
   - Lazy loading components
   - Image optimization
   - Caching with service workers (future)

2. **Backend**
   - Database indexing
   - Query optimization
   - Pagination for large datasets
   - Connection pooling
   - Response compression

3. **Caching**
   - LowDB for session caching
   - Redis for distributed caching (future)
   - HTTP caching headers

## Monitoring & Logging

- Morgan for HTTP request logging
- Console logging for errors
- Audit logs for sensitive operations
- Performance monitoring hooks (future)

## Scalability Considerations

- Horizontal scaling with load balancers
- Database replication
- Microservices separation (future)
- Message queues for async operations (future)
- CDN for static assets

## Future Enhancements

1. **Real-time Features**
   - WebSocket for live notifications
   - Real-time collaboration

2. **Advanced Features**
   - Video streaming
   - AI-powered tutoring
   - Gamification

3. **Infrastructure**
   - Kubernetes orchestration
   - Automated CI/CD pipeline
   - Infrastructure as Code

---

**For questions about architecture, please open an issue or contact the team.**
