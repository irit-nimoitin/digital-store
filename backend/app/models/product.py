from pydantic import BaseModel, Field
from typing import Optional, Literal


class ProductReview(BaseModel):
    id: str
    author: str
    rating: int = Field(ge=1, le=5)
    comment: str
    createdAt: str


class Product(BaseModel):
    id: str
    name: str
    price: float = Field(gt=0)
    shortDescription: str
    thumbnailUrl: str
    longDescription: str
    category: Literal["ebook", "software", "course"]
    reviews: list[ProductReview] = []


class PaginatedProducts(BaseModel):
    items: list[Product]
    total: int
    page: int
    pageSize: int


class ProductFilters(BaseModel):
    name: Optional[str] = None
    category: Optional[Literal["ebook", "software", "course"]] = None
    sort_by: Optional[Literal["price", "name"]] = None
    sort_order: Optional[Literal["asc", "desc"]] = "asc"
