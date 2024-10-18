// cacheUtils.js
/*
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds


/**
 * Retrieves data from the cache by key.
 * @param {string} key - The unique key for the cached data.
 * @returns {Object|null} - The cached data or null if not found/expired.
 */
/*
function getCachedData(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    // Implement TTL logic if necessary
    return item.data;
}

/**
 * Sets data in the cache with a specified key.
 * @param {string} key - The unique key for the cached data.
 * @param {Object} data - The data to cache.
 */
/*
function setCachedData(key, data) {
    localStorage.setItem(key, JSON.stringify({ data }));
    // Optionally, set a TTL (Time To Live) if you have a mechanism to handle cache invalidation
    const ttlKey = `${key}_TTL`;
    const now = Date.now();
    localStorage.setItem(ttlKey, now);
}
*/