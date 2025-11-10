import pool from "./pool.ts";
import type { APIListing, APIUsage } from "./schema.ts";

export class DatabaseService {
  /**
   * Creates a new API listing in the database
   *
   * @param listing - The API listing data to create
   * @returns The created API listing
   */
  async createAPIListing(
    listing: Omit<APIListing, "id" | "created_at" | "updated_at">,
  ): Promise<APIListing> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        `INSERT INTO api_listings 
         (name, description, base_url, api_key, price_per_call, category, status, source, owner) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
         RETURNING *`,
        [
          listing.name,
          listing.description,
          listing.base_url,
          listing.api_key,
          listing.price_per_call,
          listing.category,
          "active",
          listing.source,
          listing.owner,
        ],
      );
      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Gets a single API listing by ID
   *
   * @param id - The ID of the API listing to retrieve
   * @returns The API listing if found, null otherwise
   */
  async getAPIListing(id: string): Promise<APIListing | null> {
    const result = await pool.query("SELECT * FROM api_listings WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  /**
   * Gets all API listings
   *
   * @returns Array of all API listings
   */
  async getAllAPIListings(): Promise<APIListing[]> {
    const result = await pool.query("SELECT * FROM api_listings ORDER BY created_at DESC");
    return result.rows;
  }

  /**
   * Gets all API listings for a specific owner
   *
   * @param owner - The address of the owner
   * @returns Array of API listings owned by the specified address
   */
  async getAPIListingsByOwner(owner: string): Promise<APIListing[]> {
    const result = await pool.query(
      "SELECT * FROM api_listings WHERE owner = $1 ORDER BY created_at DESC",
      [owner],
    );
    return result.rows;
  }

  /**
   * Updates an API listing
   *
   * @param id - The ID of the API listing to update
   * @param updates - The partial API listing data to update
   * @returns The updated API listing
   */
  async updateAPIListing(id: string, updates: Partial<APIListing>): Promise<APIListing> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    const values = Object.values(updates);

    const result = await pool.query(
      `UPDATE api_listings 
       SET ${setClause}, updated_at = NOW() 
       WHERE id = $1 
       RETURNING *`,
      [id, ...values],
    );

    if (result.rows.length === 0) {
      throw new Error("API listing not found");
    }
    return result.rows[0];
  }

  /**
   * Deletes an API listing
   *
   * @param id - The ID of the API listing to delete
   */
  async deleteAPIListing(id: string): Promise<void> {
    const result = await pool.query("DELETE FROM api_listings WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      throw new Error("API listing not found");
    }
  }

  /**
   * Gets usage statistics for an API
   *
   * @param apiId - The ID of the API listing
   * @returns The usage statistics containing total calls and revenue
   */
  async getAPIUsageStats(apiId: string): Promise<{ total_calls: number; total_revenue: string }> {
    const result = await pool.query("SELECT total_calls, revenue FROM api_listings WHERE id = $1", [
      apiId,
    ]);

    if (result.rows.length === 0) {
      throw new Error("API listing not found");
    }

    return {
      total_calls: result.rows[0].total_calls,
      total_revenue: result.rows[0].revenue,
    };
  }

  /**
   * Records API usage and updates stats
   *
   * @param usage - The API usage data to record
   * @returns The recorded API usage entry
   */
  async recordAPIUsage(usage: Omit<APIUsage, "id" | "timestamp">): Promise<APIUsage> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insert usage record
      const usageResult = await client.query(
        `INSERT INTO api_usage (api_id, user_address, success, error, cost)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [usage.api_id, usage.user_address, usage.success, usage.error, usage.cost],
      );

      // Update API listing stats
      await this.updateAPIStats(client, usage.api_id, usage.cost);

      await client.query("COMMIT");
      return usageResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Updates API usage statistics
   *
   * @param client - The database client from pg pool
   * @param apiId - The ID of the API listing
   * @param cost - The cost of the API call
   */
  private async updateAPIStats(
    client: import("pg").PoolClient,
    apiId: string,
    cost: string,
  ): Promise<void> {
    await client.query(
      `UPDATE api_listings 
       SET total_calls = total_calls + 1,
           revenue = CAST(CAST(revenue AS NUMERIC) + CAST($2 AS NUMERIC) AS TEXT)
       WHERE id = $1`,
      [apiId, cost],
    );
  }
}

// Export singleton instance
export const dbService = new DatabaseService();
