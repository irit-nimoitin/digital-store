# Digital Store

A full-stack mini e-commerce platform for digital products (e-books, software licenses, online courses).

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + PrimeReact |
| State | Zustand (cart) + TanStack Query (server state) |
| Routing | React Router v6 |
| Backend | Python + FastAPI |
| Caching | Redis (with TTL) |
| Containerization | Docker + Docker Compose |

## Project Structure

```
digital-store/
├── frontend/          # React + TypeScript app
│   ├── src/
│   │   ├── api/       # Axios API clients
│   │   ├── components/# Reusable UI components
│   │   ├── hooks/     # Custom React hooks
│   │   ├── pages/     # Route-level page components
│   │   ├── store/     # Zustand global state
│   │   └── types/     # TypeScript interfaces
│   └── Dockerfile
├── backend/           # FastAPI Python app
│   ├── app/
│   │   ├── routes/    # API route handlers
│   │   ├── models/    # Pydantic data models
│   │   ├── cache/     # Redis cache layer
│   │   └── data/      # Mock JSON database
│   ├── tests/         # Pytest unit tests
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Getting Started

### Option A — Docker Compose (recommended)

```bash
docker-compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option B — Local Development

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

- Frontend dev server: http://localhost:5173
- Requires backend running on port 8000

### Running Tests

```bash
cd backend
pytest tests/ -v
```
