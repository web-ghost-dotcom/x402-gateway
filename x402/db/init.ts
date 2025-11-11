import pool, { testConnection, executeWithRetry } from "./pool";
import { createTablesSQL } from "./schema";

/**
 * Initialize database schema by creating necessary tables and indexes
 *
 * @throws Error if initialization fails
 */
export async function initializeDatabase(): Promise<void> {
  // First, test the connection with retries
  const connectionOk = await testConnection(5, 2000);
  if (!connectionOk) {
    throw new Error("Unable to establish database connection after multiple attempts");
  }

  const client = await pool.connect();

  try {
    // Begin transaction
    await client.query("BEGIN");

    // Run the table creation SQL
    await client.query(createTablesSQL);

    // Commit transaction
    await client.query("COMMIT");
    console.log("✅ Database initialized successfully");
  } catch (error) {
    // Rollback on error
    await client.query("ROLLBACK");
    console.error("❌ Error initializing database:", error);
    throw error;
  } finally {
    client.release();
  }
}

// Run initialization if this script is run directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch(error => {
      console.error("Failed to initialize database:", error);
      process.exit(1);
    });
}
