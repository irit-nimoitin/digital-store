import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


# ── Helpers ───────────────────────────────────────────────────────────────────

def get_products(**params) -> list[dict]:
    response = client.get("/products", params=params)
    assert response.status_code == 200
    return response.json()["items"]


# ── Category filtering ────────────────────────────────────────────────────────

def test_filter_by_ebook_category():
    items = get_products(category="ebook")
    assert len(items) > 0
    assert all(item["category"] == "ebook" for item in items)


def test_filter_by_software_category():
    items = get_products(category="software")
    assert len(items) > 0
    assert all(item["category"] == "software" for item in items)


def test_filter_by_course_category():
    items = get_products(category="course")
    assert len(items) > 0
    assert all(item["category"] == "course" for item in items)


def test_filter_by_category_returns_no_other_categories():
    items = get_products(category="ebook")
    assert not any(item["category"] in ("software", "course") for item in items)


# ── Name filtering ────────────────────────────────────────────────────────────

def test_filter_by_name_case_insensitive_lowercase():
    items = get_products(name="clean")
    assert any("Clean" in item["name"] for item in items)


def test_filter_by_name_case_insensitive_uppercase():
    items = get_products(name="CLEAN")
    assert any("Clean" in item["name"] for item in items)


def test_filter_by_name_partial_match():
    items = get_products(name="pro")
    assert len(items) > 0
    assert all("pro" in item["name"].lower() for item in items)


def test_filter_by_name_no_match_returns_empty():
    items = get_products(name="zzznomatchzzz")
    assert items == []


# ── Sorting ───────────────────────────────────────────────────────────────────

def test_sort_by_price_ascending():
    items = get_products(sort_by="price", sort_order="asc")
    prices = [item["price"] for item in items]
    assert prices == sorted(prices)


def test_sort_by_price_descending():
    items = get_products(sort_by="price", sort_order="desc")
    prices = [item["price"] for item in items]
    assert prices == sorted(prices, reverse=True)


def test_sort_by_name_ascending():
    items = get_products(sort_by="name", sort_order="asc")
    names = [item["name"].lower() for item in items]
    assert names == sorted(names)


def test_sort_by_name_descending():
    items = get_products(sort_by="name", sort_order="desc")
    names = [item["name"].lower() for item in items]
    assert names == sorted(names, reverse=True)


# ── Single product ────────────────────────────────────────────────────────────

def test_get_existing_product_returns_200():
    response = client.get("/products/ebook-001")
    assert response.status_code == 200


def test_get_existing_product_returns_correct_data():
    response = client.get("/products/ebook-001")
    data = response.json()
    assert data["id"] == "ebook-001"
    assert data["category"] == "ebook"
    assert "reviews" in data
    assert isinstance(data["reviews"], list)


def test_get_nonexistent_product_returns_404():
    response = client.get("/products/fake-id")
    assert response.status_code == 404


def test_get_nonexistent_product_returns_detail_message():
    response = client.get("/products/fake-id")
    assert "not found" in response.json()["detail"].lower()


# ── Pagination ────────────────────────────────────────────────────────────────

def test_paginated_response_has_required_fields():
    response = client.get("/products")
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert "page" in data
    assert "pageSize" in data


def test_default_page_is_1():
    response = client.get("/products")
    assert response.json()["page"] == 1


def test_total_reflects_filtered_count():
    all_items = client.get("/products").json()
    ebook_items = client.get("/products?category=ebook").json()
    assert ebook_items["total"] < all_items["total"]
