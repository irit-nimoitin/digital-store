from fastapi import APIRouter, HTTPException

from app.models.cart import CartResponse, AddToCartPayload, UpdateQuantityPayload
from app.data import cart_store

router = APIRouter(prefix="/cart", tags=["cart"])


@router.get("", response_model=CartResponse)
async def get_cart():
    return cart_store.get_cart()


@router.post("/items", response_model=CartResponse, status_code=201)
async def add_to_cart(payload: AddToCartPayload):
    result = cart_store.add_item(payload.productId, payload.quantity)
    if result is None:
        raise HTTPException(status_code=404, detail=f"Product '{payload.productId}' not found")
    return result


@router.put("/items/{product_id}", response_model=CartResponse)
async def update_cart_item(product_id: str, payload: UpdateQuantityPayload):
    result = cart_store.update_item(product_id, payload.quantity)
    if result is None:
        raise HTTPException(status_code=404, detail=f"Product '{product_id}' is not in the cart")
    return result


@router.delete("/items/{product_id}", response_model=CartResponse)
async def remove_cart_item(product_id: str):
    result = cart_store.remove_item(product_id)
    if result is None:
        raise HTTPException(status_code=404, detail=f"Product '{product_id}' is not in the cart")
    return result


@router.delete("", status_code=204)
async def clear_cart():
    cart_store.clear_cart()
