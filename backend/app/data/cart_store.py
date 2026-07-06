from app.models.cart import CartItem, CartResponse
from app.data.database import get_product_by_id

# productId → quantity
_cart: dict[str, int] = {}


def _build_response() -> CartResponse:
    items: list[CartItem] = []
    for product_id, quantity in _cart.items():
        product = get_product_by_id(product_id)
        if product is not None:
            items.append(CartItem(product=product, quantity=quantity))

    total = round(sum(item.product.price * item.quantity for item in items), 2)
    return CartResponse(items=items, total=total)


def get_cart() -> CartResponse:
    return _build_response()


def add_item(product_id: str, quantity: int = 1) -> CartResponse | None:
    if get_product_by_id(product_id) is None:
        return None
    _cart[product_id] = _cart.get(product_id, 0) + quantity
    return _build_response()


def update_item(product_id: str, quantity: int) -> CartResponse | None:
    if product_id not in _cart:
        return None
    _cart[product_id] = quantity
    return _build_response()


def remove_item(product_id: str) -> CartResponse | None:
    if product_id not in _cart:
        return None
    del _cart[product_id]
    return _build_response()


def clear_cart() -> None:
    _cart.clear()
