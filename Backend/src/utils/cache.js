import { createClient } from "redis";

let redisClient = null;
let redisReady = false;

function getRedisUrl() {
  return process.env.REDIS_URL || null;
}

export async function getCacheClient() {
  const redisUrl = getRedisUrl();
  if (!redisUrl) return null;

  if (!redisClient) {
    redisClient = createClient({ url: redisUrl });
    redisClient.on("error", (err) => {
      redisReady = false;
      console.error("[redis] Client error:", err.message);
    });
    redisClient.on("ready", () => {
      redisReady = true;
      console.log("[redis] Connected");
    });
    await redisClient.connect();
  }

  if (!redisReady) return null;
  return redisClient;
}

export async function cacheGetJson(key) {
  const client = await getCacheClient();
  if (!client) return null;
  const value = await client.get(key);
  return value ? JSON.parse(value) : null;
}

export async function cacheSetJson(key, data, ttlSeconds = 60) {
  const client = await getCacheClient();
  if (!client) return;
  await client.set(key, JSON.stringify(data), { EX: ttlSeconds });
}

function userIndexKey(userId) {
  return `cache:index:user:${userId}`;
}

export async function trackUserCacheKey(userId, cacheKey) {
  const client = await getCacheClient();
  if (!client || !userId) return;
  const indexKey = userIndexKey(userId);
  await client.sAdd(indexKey, cacheKey);
  await client.expire(indexKey, 60 * 60 * 24 * 7);
}

export async function invalidateUserCache(userId) {
  const client = await getCacheClient();
  if (!client || !userId) return;
  const indexKey = userIndexKey(userId);
  const keys = await client.sMembers(indexKey);
  if (keys.length) {
    await client.del(keys);
  }
  await client.del(indexKey);
}
