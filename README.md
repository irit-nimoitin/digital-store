# Digital Store

A full-stack mini e-commerce platform for digital products — e-books, software licenses, and online courses.

## Live Demo

**Frontend:** https://digital-store-app.vercel.app

> Note: The live demo shows the frontend only. Products will not load because the backend is not deployed. To see the full working application, run the complete stack locally using Docker Compose (see Getting Started below).

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v4 + PrimeReact |
| State | MobX (cart) + TanStack Query (server state) |
| Routing | React Router v6 |
| Backend | Python + FastAPI |
| Validation | Pydantic v2 + pydantic-settings |
| Caching | Redis with TTL |
| Containerization | Docker + Docker Compose |

## Project Structure

```
digital-store/
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios API clients (products, cart)
│   │   ├── components/
│   │   │   ├── common/     # Navbar, StarRating
│   │   │   ├── product/    # ProductCard, FilterBar, SkeletonCard, ReviewCard, AddToCartButton
│   │   │   └── cart/       # CartItemRow, CartSummary
│   │   ├── hooks/          # useProducts, useProduct (TanStack Query wrappers)
│   │   ├── pages/          # ProductListPage, ProductDetailPage, CartPage, NotFoundPage
│   │   ├── store/          # MobX cart store (persisted to localStorage)
│   │   └── types/          # TypeScript interfaces: Product, CartItem, ProductReview
│   ├── Dockerfile
│   └── nginx.conf
├── backend/
│   ├── app/
│   │   ├── routes/         # products.py, cart.py
│   │   ├── models/         # product.py, cart.py (Pydantic models)
│   │   ├── cache/          # Redis cache with TTL and graceful fallback
│   │   ├── data/           # products.json (mock DB), database.py, cart_store.py
│   │   ├── config.py       # pydantic-settings (reads .env)
│   │   └── main.py         # FastAPI app entry point
│   ├── tests/              # Pytest unit tests
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Architecture

```
Browser
  │
  ├── React (Vite dev server / Nginx in Docker)
  │     ├── MobX          → cart state (localStorage)
  │     ├── TanStack Query → server state cache
  │     └── Axios         → /api/* requests
  │
  │   [proxy: /api → :8000]
  │
  ├── FastAPI (Uvicorn)
  │     ├── GET /products          → filter + sort + paginate → Redis cache
  │     ├── GET /products/{id}     → single product → Redis cache
  │     ├── GET /cart              → in-memory cart state
  │     ├── POST /cart/items       → add item
  │     ├── PUT /cart/items/{id}   → update quantity
  │     ├── DELETE /cart/items/{id}→ remove item
  │     └── DELETE /cart           → clear cart
  │
  └── Redis (TTL cache for product endpoints)
```

## API Endpoints

### Products

| Method | Path | Description |
|---|---|---|
| `GET` | `/products` | List products with filtering and sorting |
| `GET` | `/products/{id}` | Single product details |

**Query parameters for `GET /products`:**

| Param | Type | Description |
|---|---|---|
| `name` | string | Filter by name (case-insensitive, partial match) |
| `category` | string | Filter by category: `ebook`, `software`, `course` |
| `sort_by` | string | Sort field: `price` or `name` |
| `sort_order` | string | `asc` (default) or `desc` |
| `page` | int | Page number, default `1` |

### Cart

| Method | Path | Description |
|---|---|---|
| `GET` | `/cart` | Get current cart with full product details and total |
| `POST` | `/cart/items` | Add product to cart `{ productId, quantity }` |
| `PUT` | `/cart/items/{productId}` | Update item quantity `{ quantity }` |
| `DELETE` | `/cart/items/{productId}` | Remove item from cart |
| `DELETE` | `/cart` | Clear entire cart |

### System

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/docs` | Interactive Swagger UI |

## Getting Started

### Option A — Docker Compose (recommended)

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |

### Option B — Local Development

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
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
- Vite proxies `/api/*` → `http://localhost:8000`

### Running Tests

```bash
cd backend
pytest tests/ -v
```

Tests cover: category filtering, name filtering (case-insensitive), price/name sorting, single product retrieval, 404 handling, and pagination.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REDIS_URL` | `redis://localhost:6379` | Redis connection URL |
| `REDIS_TTL_SECONDS` | `300` | Cache TTL in seconds (5 minutes) |
