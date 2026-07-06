import json
import logging
from typing import Any

import redis
from redis import Redis

from app.config import settings

logger = logging.getLogger(__name__)

_client: Redis | None = None


def get_client() -> Redis | None:
    global _client
    if _client is None:
        try:
            _client = redis.from_url(settings.REDIS_URL, decode_responses=True)
            _client.ping()
            logger.info("Redis connected at %s", settings.REDIS_URL)
        except Exception as e:
            logger.warning("Redis unavailable, caching disabled: %s", e)
            _client = None
    return _client


def get(key: str) -> Any | None:
    client = get_client()
    if client is None:
        return None
    try:
        value = client.get(key)
        return json.loads(value) if value is not None else None
    except Exception as e:
        logger.warning("Redis GET failed for key '%s': %s", key, e)
        return None


def set(key: str, value: Any, ttl: int | None = None) -> None:
    client = get_client()
    if client is None:
        return
    try:
        serialized = json.dumps(value)
        if ttl:
            client.setex(key, ttl, serialized)
        else:
            client.set(key, serialized)
    except Exception as e:
        logger.warning("Redis SET failed for key '%s': %s", key, e)


def delete(key: str) -> None:
    client = get_client()
    if client is None:
        return
    try:
        client.delete(key)
    except Exception as e:
        logger.warning("Redis DELETE failed for key '%s': %s", key, e)
