// cache.js

/**
 * Retrieves cached data if it's still valid based on the specified expiration time.
 * @param {string} key - The cache key.
 * @returns {Object|null} - The cached data or null if not available/expired.
 */
function getCachedData(key) {
    const cachedData = lscache.get(key);
    if (cachedData) {
        console.log(`Cache hit for "${key}"`);
        return cachedData;
    }
    console.log(`Cache miss for "${key}"`);
    return null;
}

/**
 * Caches data with a specific key and expiration time.
 * @param {string} key - The cache key.
 * @param {Object} data - The data to cache.
 * @param {number} expirationMinutes - Expiration time in minutes.
 */
function setCachedData(key, data, expirationMinutes) {
    lscache.set(key, data, expirationMinutes);
    console.log(`Data cached under key "${key}" for ${expirationMinutes} minutes.`);
}

/**
 * Clears cached data for a specific key.
 * @param {string} key - The cache key to remove.
 */
function clearCachedData(key) {
    lscache.remove(key);
    console.log(`Cache cleared for key "${key}".`);
}

/**
 * Fetches data with caching mechanism.
 * @param {string} url - The API endpoint.
 * @param {string} cacheKey - The key to store/retrieve data from cache.
 * @param {number} cacheDurationMinutes - Duration to cache the data in minutes.
 * @param {boolean} forceRefresh - If true, bypasses the cache and fetches fresh data.
 * @returns {Promise<Object>} - The fetched data.
 */
async function fetchDataWithCache(url, cacheKey, cacheDurationMinutes = 5, forceRefresh = false) {
    if (!forceRefresh) {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
            return cachedData;
        }
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCachedData(cacheKey, data, cacheDurationMinutes);
        return data;
    } catch (error) {
        console.error(`Error fetching data from "${url}":`, error);
        throw error;
    }
}

/**
 * Clears all relevant caches for a user.
 * @param {string} userId - The user's unique identifier.
 */
function clearUserCaches(userId) {
    const cacheKeys = [
        `profile_${userId}`,
        `soundEngines_batch_${userId}`,
        `interplanetaryPlayers_batch_${userId}`,
        `tracks_batch_${userId}`
    ];

    cacheKeys.forEach(key => clearCachedData(key));

    console.log(`All caches cleared for user "${userId}".`);
}

// Export functions if using ES Modules
// Uncomment the line below if you're using ES Modules
// export { getCachedData, setCachedData, clearCachedData, fetchDataWithCache, clearUserCaches };
