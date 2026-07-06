from pydantic import BaseModel, Field
from app.models.product import Product


class CartItem(BaseModel):
    product: Product
    quantity: int = Field(ge=1)


class CartResponse(BaseModel):
    items: list[CartItem]
    total: float


class AddToCartPayload(BaseModel):
    productId: str
    quantity: int = Field(default=1, ge=1)


class UpdateQuantityPayload(BaseModel):
    quantity: int = Field(ge=1)
