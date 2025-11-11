import { Pool, type PoolConfig } from "pg";
import { config } from "dotenv";

config();

// Debug: Log connection info (without password)
console.log("🔍 Database Configuration:");
console.log(`  Host: ${process.env.DB_HOST}`);
console.log(`  Port: ${process.env.DB_PORT}`);
console.log(`  Database: ${process.env.DB_NAME}`);
console.log(`  User: ${process.env.DB_USER}`);
console.log(`  Password: ${process.env.DB_PASSWORD ? `[${process.env.DB_PASSWORD.length} chars]` : 'NOT SET'}`);
console.log(`  SSL: ${process.env.DB_SSL}`);

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === "true" ? {
    rejectUnauthorized: false, // Required for Supabase and managed database services
  } : false,
  max: parseInt(process.env.DB_POOL_SIZE || "20"), // Maximum number of clients in the pool
  min: 2, // Minimum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 5000, // Timeout for establishing connection (5s)
  query_timeout: 30000, // Query timeout (30s)
  statement_timeout: 30000, // Statement timeout (30s)
  // Connection retry settings
  keepAlive: true, // Enable TCP keepalive
  keepAliveInitialDelayMillis: 10000, // Initial delay before keepalive starts
};

// Create the connection pool
const pool = new Pool(poolConfig);

// Track connection state
let isConnected = false;
let reconnectTimeout: NodeJS.Timeout | null = null;

// The pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  isConnected = false;

  // Attempt to reconnect after a delay
  if (!reconnectTimeout) {
    console.log("Scheduling reconnection attempt...");
    reconnectTimeout = setTimeout(() => {
      reconnectTimeout = null;
      testConnection().catch(e => console.error("Reconnection failed:", e));
    }, 5000);
  }
});

// Handle successful connections
pool.on("connect", (client) => {
  isConnected = true;
  console.log("New database client connected");

  // Set statement timeout for this client
  client.query("SET statement_timeout = 30000").catch(err => {
    console.warn("Failed to set statement timeout:", err);
  });
});

// Handle client removal
pool.on("remove", () => {
  console.log("Database client removed from pool");
});

/**
 * Tests the database connection by attempting to connect and run a simple query
 * Implements retry logic with exponential backoff
 *
 * @param retries - Number of retry attempts remaining (default: 3)
 * @param delay - Delay before retry in milliseconds (default: 1000)
 * @returns Promise<boolean> True if connection is successful, false otherwise
 */
export async function testConnection(retries = 3, delay = 1000): Promise<boolean> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const client = await pool.connect();
      try {
        await client.query("SELECT NOW()");
        console.log("✅ Database connection successful");
        isConnected = true;
        return true;
      } finally {
        client.release();
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`❌ Database connection attempt ${attempt}/${retries} failed:`, lastError.message);

      if (attempt < retries) {
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        // Exponential backoff
        delay *= 2;
      }
    }
  }

  console.error("❌ All database connection attempts failed:", lastError?.message);
  isConnected = false;
  return false;
}

/**
 * Execute a query with automatic retry on connection errors
 * 
 * @param queryFn - Function that executes the query
 * @param retries - Number of retry attempts for transient errors
 * @returns Promise with query result
 */
export async function executeWithRetry<T>(
  queryFn: () => Promise<T>,
  retries = 2
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      return await queryFn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      const errorCode = (err as any)?.code;

      // Retry on connection errors
      const shouldRetry = [
        'ECONNRESET',
        'ECONNREFUSED',
        'ETIMEDOUT',
        'EPIPE',
        'ENOTFOUND',
        'EAI_AGAIN',
        '57P01', // admin_shutdown
        '57P03', // cannot_connect_now
        '08006', // connection_failure
        '08003', // connection_does_not_exist
      ].includes(errorCode);

      if (shouldRetry && attempt <= retries) {
        console.warn(`⚠️  Query failed with ${errorCode}, retrying (${attempt}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
        continue;
      }

      throw lastError;
    }
  }

  throw lastError || new Error('Query failed after retries');
}

/**
 * Get connection status
 */
export function isPoolConnected(): boolean {
  return isConnected;
}

/**
 * Gracefully close all connections in the pool
 */
export async function closePool(): Promise<void> {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
  await pool.end();
  console.log("Database pool closed");
}

export default pool;
