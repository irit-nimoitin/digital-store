from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from app.models import Product, PaginatedProducts
from app.data.database import get_all_products, get_product_by_id
from app.config import settings
import app.cache as cache

router = APIRouter(prefix="/products", tags=["products"])

PAGE_SIZE = 12


@router.get("", response_model=PaginatedProducts)
async def list_products(
    name: Optional[str] = Query(None, description="Filter by product name (case-insensitive)"),
    category: Optional[str] = Query(None, description="Filter by category: ebook, software, course"),
    sort_by: Optional[str] = Query(None, description="Sort field: price or name"),
    sort_order: Optional[str] = Query("asc", description="Sort direction: asc or desc"),
    page: int = Query(1, ge=1, description="Page number"),
):
    cache_key = f"products:list:{name}:{category}:{sort_by}:{sort_order}:{page}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    products: list[Product] = get_all_products()

    if name:
        products = [p for p in products if name.lower() in p.name.lower()]

    if category:
        products = [p for p in products if p.category == category]

    if sort_by == "price":
        products.sort(key=lambda p: p.price, reverse=(sort_order == "desc"))
    elif sort_by == "name":
        products.sort(key=lambda p: p.name.lower(), reverse=(sort_order == "desc"))

    total = len(products)
    start = (page - 1) * PAGE_SIZE
    end = start + PAGE_SIZE
    page_items = products[start:end]

    result = PaginatedProducts(
        items=page_items,
        total=total,
        page=page,
        pageSize=PAGE_SIZE,
    )

    cache.set(cache_key, result.model_dump(), ttl=settings.REDIS_TTL_SECONDS)

    return result


@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    cache_key = f"products:detail:{product_id}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    product = get_product_by_id(product_id)
    if product is None:
        raise HTTPException(status_code=404, detail=f"Product '{product_id}' not found")

    cache.set(cache_key, product.model_dump(), ttl=settings.REDIS_TTL_SECONDS)

    return product
