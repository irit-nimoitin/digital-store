import json
from pathlib import Path
from app.models import Product

_DATA_FILE = Path(__file__).parent / "products.json"

_products: list[Product] = []


def _load() -> None:
    global _products
    raw = json.loads(_DATA_FILE.read_text(encoding="utf-8"))
    _products = [Product(**item) for item in raw]


def get_all_products() -> list[Product]:
    if not _products:
        _load()
    return list(_products)


def get_product_by_id(product_id: str) -> Product | None:
    if not _products:
        _load()
    return next((p for p in _products if p.id == product_id), None)
