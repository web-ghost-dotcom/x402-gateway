import { Pool, type PoolConfig } from "pg";
import { config } from "dotenv";

config();

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase's self-signed certificates
  },
  max: parseInt(process.env.DB_POOL_SIZE || "10"), // maximum number of clients in the pool
  idleTimeoutMillis: 30000000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 10000000, // increased timeout to 10s
};

// Create the connection pool
const pool = new Pool(poolConfig);

// The pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", err => {
  console.error("Unexpected error on idle client", err);
  // Don't exit immediately - let the application handle it
  // Only log the error for debugging
});

/**
 * Tests the database connection by attempting to connect and run a simple query
 *
 * @returns Promise<boolean> True if connection is successful, false otherwise
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log("Database connection successful");
    return true;
  } catch (err) {
    console.error("Database connection error:", err);
    return false;
  }
}

export default pool;
