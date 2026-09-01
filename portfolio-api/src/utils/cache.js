class MemoryCache {
  constructor(defaultTtlMs = 10 * 60 * 1000) {
    this.cache = new Map()
    this.defaultTtlMs = defaultTtlMs
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return null
    }
    return item.value
  }

  set(key, value, ttlMs = this.defaultTtlMs) {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    })
  }

  del(key) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  invalidatePattern(pattern) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    }
  }
}

export const apiCache = new MemoryCache(10 * 60 * 1000)
