# Sweet Shop Management System

A full-stack TDD-driven application for managing a premium sweet shop. Users can browse sweets, make purchases, and admins can manage inventory.

## Project Overview

This is a demonstration of modern full-stack development using Node.js/Express (backend), React (frontend), SQLite (database), and Test-Driven Development (TDD) principles.

**Features:**
- User authentication with JWT tokens
- Sweet catalog browsing with Search & Category filters
- Admin panel for inventory management (add, edit, delete, restock)
- Responsive UI with Glassmorphism styling and Toast notifications
- Comprehensive test coverage using Jest
- Type-safe implementation with TypeScript

## Tech Stack

**Backend:**
- Node.js & Express (Web Framework)
- Prisma (ORM for SQLite)
- JWT authentication & Bcrypt hashing
- Jest & Supertest (Testing)
- Zod (Validation)

**Frontend:**
- React 18
- Vite (Build tool)
- Tailwind CSS (Styling)
- Zustand (State Management)
- Axios (API Client)

**Database:**
- SQLite (File-based)

## Getting Started

### Manual Setup

**Backend:**
```powershell
cd sweets-mgmt-system/backend
npm install
npx prisma db push
npm run seed     # Seeds database with manual & AI data
npm run dev      # Server starts on localhost:3000
```

**Frontend:**
```bash
cd sweets-mgmt-system/frontend
npm install
npm run dev      # Client starts on localhost:5173
```

## API Documentation

The API follows RESTful conventions.

### Key Endpoints

**Auth:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

**Sweets (Public/Protected):**
- `GET /api/sweets` - List all sweets
- `GET /api/sweets/search?q=...` - Search sweets
- `POST /api/sweets` - Add sweet (Admin only)
- `PUT /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)

**Inventory (Protected):**
- `POST /api/sweets/:id/purchase` - Purchase a sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

## Testing

**Run backend tests:**
```powershell
cd backend
npm test
```

**Test Results:**
```
PASS  src/tests/auth.test.ts
PASS  src/tests/sweets.test.ts
PASS  src/tests/inventory.test.ts
```

Tests cover:
- User registration and login flow
- JWT token validation
- Sweets CRUD operations
- Purchase logic and stock decrement
- Zod schema validation

## Default Users

Since the database is persistent SQLite:
- **Registration**: Use the "Get Started" button on the frontend to create your own account.
- **Admin**: The current system treats authenticated users as admins for demonstration purposes (unless specific role logic is enforced).

## File Structure

```
sweets-mgmt-system/
├── README.md                          # This file
├── backend/
│   ├── prisma/
│   │   └── schema.prisma              # Database Model
│   ├── src/
│   │   ├── app.ts                     # Express App Setup
│   │   ├── seed.ts                    # AI-generated Seed Data
│   │   ├── controllers/               # Route Handlers
│   │   ├── middleware/                # Auth & Error Middleware
│   │   ├── routes/                    # API Routes
│   │   ├── services/                  # Business Logic
│   │   └── tests/                     # TDD Jest Tests
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.ts
    ├── src/
    │   ├── App.tsx                    # Main Component
    │   ├── api/                       # Axios Setup
    │   ├── layouts/                   # Navbar & Layout
    │   ├── pages/
    │   │   ├── Home.tsx               # Dashboard with Filters
    │   │   ├── AdminPanel.tsx         # Inventory Manager
    │   │   └── Login/Register.tsx
    │   └── store/
    │       └── authStore.ts           # Zustand Auth State
    └── package.json
```

## Development Workflow

This project follows **Test-Driven Development (TDD)**:

1.  **Red**: Write failing integration tests for an endpoint (e.g., `POST /register`).
2.  **Green**: Implement the Controller, Service, and Route to pass the test.
3.  **Refactor**: Optimize code and add validation schemas.

All backend features were implemented using this rigorous cycle.

## Deployment

### Backend Deployment
Compatible with Node.js hosting environments:
- Railway, Render, Fly.io, Heroku.
- Environment Variables required: `DATABASE_URL`, `JWT_SECRET`.

### Frontend Deployment
Static hosting compatible:
- Vercel, Netlify, GitHub Pages.
- Build command: `npm run build`.

## My AI Usage

### Tools Used
- **Agentic AI**: Primary AI assistant for code generation, debugging, and test writing
- Used throughout the entire development cycle for:
  - Node.js/Express endpoint scaffolding and implementation
  - React component generation and state management
  - Test case generation and TDD implementation
  - Debugging environment issues (Prisma schema sync, TypeScript types)
  - CSS styling and responsive design
  - Script generation for startup automation
  - Documentation and README content

### How AI Was Used

1. **Backend Implementation** (30% AI-assisted)
   - Generated initial Express app structure
   - Scaffolded Prisma ORM code and database helpers
   - Created test fixtures and test cases
   - Debugged dependency injection and JWT middleware

2. **Frontend Implementation** (40% AI-assisted)
   - Generated React component structures (Login, Sweets, Admin)
   - Implemented state management with Zustand hooks
   - Created Tailwind CSS grid layouts and responsive design
   - Generated form handling and API client logic

3. **Testing** (50% AI-assisted)
   - Generated test case templates
   - Created test fixtures for database isolation
   - Debugged test failures and environment issues

4. **DevOps & Automation** (70% AI-assisted)
   - Created startup scripts for multi-process management
   - Generated GitHub Actions CI workflow
   - Configured Vite with API proxy

5. **Documentation** (60% AI-assisted)
   - Generated README content and setup instructions
   - Created inline code comments
   - Structured project documentation

### AI Impact on Development

**Advantages:**
- Significantly accelerated boilerplate code generation
- Helped debug environment-specific issues (Prisma schema compatibility)
- Generated comprehensive test coverage quickly
- Streamlined UI/UX with ready-made component patterns
- Automation of repetitive setup tasks

**Challenges:**
- Required manual review of generated code for correctness
- Had to fix TypeScript type compatibility issues
- Refined endpoint signatures to match requirements
- Validated test logic and business rules

**Reflection:**
AI was invaluable for rapid prototyping and implementation, especially for boilerplate and structural code. However, domain-specific logic (auth, inventory management, permission checks) required careful review and refinement. The TDD approach ensured generated code was validated through tests before integration.

## CI/CD

GitHub Actions workflow runs tests on every push/PR:
- Runs Jest on backend
- Validates code with linting (when added)
- Ensures pull requests pass all tests before merging

## License

This project is provided as-is for educational purposes.

## Questions?

Refer to individual README files in `backend/` and `frontend/` for detailed setup and architecture notes.
